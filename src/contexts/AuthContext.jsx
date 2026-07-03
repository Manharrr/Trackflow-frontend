import { createContext, useContext, useReducer, useEffect, useRef } from 'react'
import axiosInstance from '../api/axios'

const AuthContext = createContext()

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
}

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload, isAuthenticated: true, isLoading: false }
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false, isLoading: false }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)
  const accessTokenRef = useRef(null)

  const setAccessToken = (token) => {
    accessTokenRef.current = token
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete axiosInstance.defaults.headers.common['Authorization']
    }
  }

  // App load — refresh cookie undenkil auto login
//   useEffect(() => {
//     const initAuth = async () => {
//       try {
//         const refreshRes = await axiosInstance.post('/auth/token/refresh/')
//         setAccessToken(refreshRes.data.access)
//         const meRes = await axiosInstance.get('/auth/me/')
//         dispatch({ type: 'LOGIN_SUCCESS', payload: meRes.data })
//       } catch {
//         setAccessToken(null)
//         dispatch({ type: 'LOGOUT' })
//       }
//     }
//     initAuth()
//   }, [])

useEffect(() => {
  const initAuth = async () => {
    try {
      const meRes =
        await axiosInstance.get(
          '/auth/me/'
        )

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: meRes.data,
      })
    } catch {
      dispatch({
        type: 'LOGOUT',
      })
    }
  }

  initAuth()
}, [])

  // 401 interceptor — auto refresh
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          try {
            const refreshRes = await axiosInstance.post('/auth/token/refresh/')
            setAccessToken(refreshRes.data.access)
            originalRequest.headers['Authorization'] = `Bearer ${refreshRes.data.access}`
            return axiosInstance(originalRequest)
          } catch {
            setAccessToken(null)
            dispatch({ type: 'LOGOUT' })
            window.location.href = '/login'
          }
        }
        return Promise.reject(error)
      }
    )
    return () => axiosInstance.interceptors.response.eject(interceptor)
  }, [])

//   const login = async (email, password) => {
//     const res = await axiosInstance.post('/auth/login/', { email, password })
//     setAccessToken(res.data.access)
//     dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.user })
//     return res.data
//   }

const login = async (
  email,
  password
) => {
  const res =
    await axiosInstance.post(
      '/auth/login/',
      {
        email,
        password,
      }
    )

  // MFA Required
  if (
    res.data.mfa_required
  ) {
    return res.data
  }

  // Normal Login
  setAccessToken(
    res.data.access
  )

  dispatch({
    type: 'LOGIN_SUCCESS',
    payload:
      res.data.user,
  })

  return res.data
}

  const register = async (email, username, password, confirm_password) => {
    const res = await axiosInstance.post('/auth/register/', {
      email, username, password, confirm_password,
    })
    setAccessToken(res.data.access)
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.user })
    return res.data
  }

  const logout = async () => {
    try {
      await axiosInstance.post('/auth/logout/')
    } finally {
      setAccessToken(null)
      dispatch({ type: 'LOGOUT' })
    }
  }

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}