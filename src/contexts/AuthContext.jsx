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
  const refreshPromiseRef = useRef(null)
  const isInitializingRef = useRef(false)

  const setAccessToken = (token) => {
    accessTokenRef.current = token
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete axiosInstance.defaults.headers.common['Authorization']
    }
  }

  const refreshAccessToken = async (customRefreshToken = null) => {
    if (refreshPromiseRef.current) {
      return refreshPromiseRef.current
    }

    refreshPromiseRef.current = (async () => {
      try {
        const payload = customRefreshToken ? { refresh: customRefreshToken } : {}
        const refreshRes = await axiosInstance.post('/auth/token/refresh/', payload)
        setAccessToken(refreshRes.data.access)
        return refreshRes.data.access
      } catch (err) {
        setAccessToken(null)
        dispatch({ type: 'LOGOUT' })
        throw err
      } finally {
        refreshPromiseRef.current = null
      }
    })()

    return refreshPromiseRef.current
  }

  // Application Startup & Initialization Flow
  useEffect(() => {
    const initAuth = async () => {
      if (isInitializingRef.current) return
      isInitializingRef.current = true

      const urlParams = new URLSearchParams(window.location.search)
      const urlRefreshToken = urlParams.get('auth_transfer') || urlParams.get('refresh_token')

      if (urlRefreshToken) {
        sessionStorage.removeItem('logged_out')
      }

      const isLoggedOut = urlParams.get('logged_out') === 'true' || sessionStorage.getItem('logged_out') === 'true'

      if (isLoggedOut && !urlRefreshToken) {
        if (urlParams.get('logged_out')) {
          urlParams.delete('logged_out')
          const newSearch = urlParams.toString()
          const newPath = window.location.pathname + (newSearch ? `?${newSearch}` : '')
          window.history.replaceState({}, '', newPath)
        }
        sessionStorage.removeItem('logged_out')
        setAccessToken(null)
        dispatch({ type: 'LOGOUT' })
        isInitializingRef.current = false
        return
      }

      try {
        await refreshAccessToken(urlRefreshToken)

        if (urlRefreshToken) {
          urlParams.delete('auth_transfer')
          urlParams.delete('refresh_token')
          const newSearch = urlParams.toString()
          const newPath = window.location.pathname + (newSearch ? `?${newSearch}` : '')
          window.history.replaceState({}, '', newPath)
        }

        const meRes = await axiosInstance.get('/auth/me/')
        dispatch({ type: 'LOGIN_SUCCESS', payload: meRes.data })
      } catch {
        // Handled by refreshAccessToken logging out
      } finally {
        isInitializingRef.current = false
      }
    }

    initAuth()
  }, [])

  // Axios Response Interceptor (Auto-refresh on 401)
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !isInitializingRef.current &&
          originalRequest.url &&
          !originalRequest.url.includes('/auth/logout/') &&
          !originalRequest.url.includes('/auth/token/refresh/')
        ) {
          originalRequest._retry = true
          try {
            const newAccess = await refreshAccessToken()
            originalRequest.headers['Authorization'] = `Bearer ${newAccess}`
            return axiosInstance(originalRequest)
          } catch (err) {
            const port = window.location.port ? `:${window.location.port}` : ''
            window.location.href = `http://localhost${port}/?logged_out=true`
            return Promise.reject(err)
          }
        }
        return Promise.reject(error)
      }
    )
    return () => axiosInstance.interceptors.response.eject(interceptor)
  }, [])

  const login = async (phone, password, workspace_code = null) => {
    sessionStorage.removeItem('logged_out')

    const payload = { phone, password }
    if (workspace_code) payload.workspace_code = workspace_code

    const res = await axiosInstance.post('/auth/login/', payload)

    if (res.data.company_status === 'pending' || res.data.pending) {
      return { pending: true }
    }
    if (res.data.phone_verify) return res.data
    if (res.data.mfa_required) return res.data

    const workspaceUrl = res.data.tenant?.workspace_url
    const currentOrigin = window.location.origin

    if (workspaceUrl) {
      const targetOrigin = new URL(workspaceUrl).origin
      if (currentOrigin !== targetOrigin) {
        isInitializingRef.current = true
        const url = new URL(`${workspaceUrl}/dashboard`)
        if (res.data.refresh) {
          url.searchParams.set('auth_transfer', res.data.refresh)
        }
        return { redirectUrl: url.toString() }
      }
    }

    const role = res.data.user?.role || res.data.role
    let targetPath = '/dashboard'
    if (role === 'super_admin') {
      targetPath = '/super-admin'
    } else if (role === 'operations_manager') {
      targetPath = '/operations'
    } else if (role === 'employee') {
      targetPath = '/employee'
    }

    return { redirectUrl: `${currentOrigin}${targetPath}` }
  }

  const googleLogin = async (token, workspace_code = null) => {
    sessionStorage.removeItem('logged_out')

    const payload = { token }
    if (workspace_code) payload.workspace_code = workspace_code

    const res = await axiosInstance.post('/auth/google/', payload)

    if (res.data.phone_verify) return res.data
    if (res.data.company_status === 'pending' || res.data.pending) return { pending: true }
    if (res.data.mfa_required) return res.data

    const workspaceUrl = res.data.tenant?.workspace_url
    const currentOrigin = window.location.origin

    if (workspaceUrl) {
      const targetOrigin = new URL(workspaceUrl).origin
      if (currentOrigin !== targetOrigin) {
        isInitializingRef.current = true
        const url = new URL(`${workspaceUrl}/dashboard`)
        if (res.data.refresh) {
          url.searchParams.set('auth_transfer', res.data.refresh)
        }
        return { redirectUrl: url.toString() }
      }
    }

    const role = res.data.user?.role || res.data.role
    let targetPath = '/dashboard'
    if (role === 'super_admin') {
      targetPath = '/super-admin'
    } else if (role === 'operations_manager') {
      targetPath = '/operations'
    } else if (role === 'employee') {
      targetPath = '/employee'
    }

    return { redirectUrl: `${currentOrigin}${targetPath}` }
  }

  const register = async (email, username, password, confirm_password) => {
    const res = await axiosInstance.post('/auth/register/', {
      email, username, password, confirm_password,
    })
    setAccessToken(res.data.access)
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.user })
    return res.data
  }

  const completeMfaLogin = async (token, workspaceUrl = null, refreshToken = null) => {
    setAccessToken(token)
    const currentOrigin = window.location.origin

    if (workspaceUrl) {
      const targetOrigin = new URL(workspaceUrl).origin
      if (currentOrigin !== targetOrigin) {
        isInitializingRef.current = true
        const url = new URL(`${workspaceUrl}/dashboard`)
        if (refreshToken) {
          url.searchParams.set('auth_transfer', refreshToken)
        }
        return { redirectUrl: url.toString() }
      }
    }

    const meRes = await axiosInstance.get('/auth/me/')
    const role = meRes.data.role || meRes.data.user?.role
    let targetPath = '/dashboard'
    if (role === 'super_admin') {
      targetPath = '/super-admin'
    } else if (role === 'operations_manager') {
      targetPath = '/operations'
    } else if (role === 'employee') {
      targetPath = '/employee'
    }

    return { redirectUrl: `${currentOrigin}${targetPath}`, user: meRes.data }
  }

  const logout = async () => {
    try {
      sessionStorage.removeItem('logged_out')
      await axiosInstance.post('/auth/logout/')
    } finally {
      setAccessToken(null)
      dispatch({ type: 'LOGOUT' })
      const port = window.location.port ? `:${window.location.port}` : ''
      window.location.href = `http://localhost${port}/?logged_out=true`
    }
  }

  return (
    <AuthContext.Provider value={{ ...state, login, googleLogin, register, logout, completeMfaLogin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}