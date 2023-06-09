import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {authProvider} from "@/provider/auth-provider";
import {IUpdateUser, IUser} from "@/common/types";
import {userProvider} from "@/provider/user-provider";

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .notRequired(),
    oldPassword: Yup.string()
        .notRequired(),
    password: Yup.string()
        .notRequired(),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    bio: Yup.string()
});


function ProfilePage() {
    const [connectedUser, setConnectedUser] = useState<IUser | undefined>();
    const router = useRouter();

    const {register, handleSubmit, reset, formState: {errors}} = useForm<IUpdateUser>({
        resolver: yupResolver(validationSchema)
    });


    useEffect(() => {
        userProvider.getUser()
            .then((user) => {
                setConnectedUser(user.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])

    const onSubmit = async (userInfo: IUpdateUser) => {
        try {
            await userProvider.updateUser(userInfo);
        } catch (error) {
            console.error(error);
        }
    };

    const {name, email, bio} = connectedUser ?? {};

    return (
        <div className="profile-container">
            <div className="current-user-information">
                <h1>User Profile</h1>
                <p>Name: {name}</p>
                <p>Email: {email}</p>
                <p>Bio: {bio}</p>
            </div>
            <div className="edit-current-user">
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

                    <label htmlFor="oldPassword">Current Password:</label>
                    <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        {...register('oldPassword')}
                    />
                    {errors.oldPassword && (
                        <span className='error_message'>{errors.oldPassword.message}</span>
                    )}

                    <label htmlFor="password">New Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="newPassword"
                        {...register('password')}
                    />
                    {errors.password && (
                        <span className='error_message'>{errors.password.message}</span>
                    )}

                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        {...register('confirmPassword')}
                    />
                    {errors.confirmPassword && (
                        <span className='error_message'>{errors.confirmPassword.message}</span>
                    )}

                    <label htmlFor="bio">Bio:</label>
                    <textarea
                        id="bio"
                        name="bio"
                        {...register('bio')}
                    />

                    <button
                        type="submit"
                        className="updateProfileButton"
                    >Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ProfilePage;