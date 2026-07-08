import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../contexts/AuthContext'

export default function GoogleLoginButton() {

    const navigate = useNavigate()

    const {
        googleLogin,
    } = useAuth()

    const handleSuccess = async (
        credentialResponse
    ) => {

        try {

            const data =
                await googleLogin(
                    credentialResponse.credential
                )

            if (
                data.phone_verify
            ) {

                navigate(
                    '/verify-phone',
                    {
                        state: {
                            email:
                                data.email,
                        },
                    }
                )

                return
            }

            if (
                data.pending
            ) {

                navigate(
                    '/pending-approval'
                )

                return
            }

            if (
                data.mfa_required
            ) {

                navigate(
                    '/mfa',
                    {
                        state: {
                            email:
                                data.email,
                        },
                    }
                )

                return
            }

            const role =
                data.user.role

            if (
                role ===
                'super_admin'
            ) {

                navigate(
                    '/super-admin'
                )

            }

            else if (
                role ===
                'company_admin'
            ) {

                navigate(
                    '/dashboard'
                )

            }

            else if (
                role ===
                'operations_manager'
            ) {

                navigate(
                    '/operations'
                )

            }

            else {

                navigate(
                    '/employee'
                )

            }

        }

        catch (
            err
        ) {

            console.log(err)

        }

    }

    return (

        <GoogleLogin

            onSuccess={
                handleSuccess
            }

            onError={() => {

                alert(
                    'Google Login Failed'
                )

            }}

        />

    )

}