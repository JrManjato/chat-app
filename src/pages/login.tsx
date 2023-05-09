import React from 'react';
import {useForm} from 'react-hook-form';

type FormData = {
    name: string;
    email: string;
    password: string;
};

function Form() {
    const {register, handleSubmit, reset, formState: { errors }} = useForm<FormData>();

    function onSubmit(data) {
        console.log(data);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='login_form'>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" {...register('name', {required: true})} />
            {errors.name && errors.name.type === "required" && <span className='error_message'>Name is a required field</span>}

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" {...register('email', {required: true})}/>
            {errors.email && errors.email.type === "required" && <span className='error_message'>Email is a required field</span>}

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" {...register('password', {required: true})}/>
            {errors.password && errors.password.type === "required" && <span className='error_message'>Password is a required field</span>}

            <button type="submit">Submit</button>
        </form>
    );
}

export default Form;