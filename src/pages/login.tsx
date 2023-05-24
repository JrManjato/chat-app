import React from 'react';
import {useRouter} from "next/router";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {authProvider} from "@/provider/auth-provider";

type FormData = {
    name: string;
    email: string;
    password: string;
};

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is a required field'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is a required field'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is a required field'),
});

function Form() {
    const router = useRouter();
    const {register, handleSubmit, reset, formState: {errors}} = useForm<FormData>({
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
            <form onSubmit={handleSubmit(onSubmit)} className='login_form'>

                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    {...register('name')}
                />
                {errors.name && (
                    <span className='error_message'>{errors.name.message}</span>
                )}

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    {...register('email')}
                />
                {errors.email && (
                    <span className='error_message'>{errors.email.message}</span>
                )}

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    {...register('password')}
                />
                {errors.password && (
                    <span className='error_message'>{errors.password.message}</span>
                )}

                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default Form;