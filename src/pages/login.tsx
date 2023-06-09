import React from 'react';
import {useRouter} from "next/router";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {authProvider} from "@/provider/auth-provider";
import {ILoginUser} from "@/common/types";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is a required field'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is a required field'),
});

function LoginForm() {
    const router = useRouter();
    const {register, handleSubmit, reset, formState: {errors}} = useForm<ILoginUser>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = async (userInfo) => {
        try {
            const {authenticate} = await authProvider.signIn(userInfo);

            authenticate && await router.push("/chat") && reset();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <h1>Chat-App</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="login_form">

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    {...register('email')}
                />
                {errors.email && (
                    <span className="error_message">{errors.email.message}</span>
                )}

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    {...register('password')}
                />
                {errors.password && (
                    <span className="error_message">{errors.password.message}</span>
                )}

                <button
                    type="submit"
                    className="loginButton"
                >Login</button>
            </form>
            <button
                type="button"
                name="signup"
                id="signup-button"
                onClick={async () => {
                    await router.push("/signup");
                }}
            >
                No account? SignUp
            </button>
        </>
    );
}

export default LoginForm;