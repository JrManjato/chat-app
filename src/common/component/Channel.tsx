import React, {useState} from "react";
import {Button, Modal} from "antd";
import {IRestUser} from "@/common/types";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";

type FormData = {
    name: string;
    type: 'public' | 'private';
    members: IRestUser[];
};

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is a required field'),
    type: Yup.string()
        .required('Type is a required field'),
    members: Yup.array()
        .required('members is a required field'),
});

export const Channel = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {register, handleSubmit, reset, formState: {errors}} = useForm<FormData>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (userInfo) => {
        console.log(userInfo);
    }

    return(
        <div className='channel-container'>
            <h1>Channel list</h1>
            <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
            >
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

                    <label htmlFor="email">Type:</label>
                    <input
                        type="email"
                        id="type"
                        name="type"
                        {...register('type')}
                    />
                    {errors.type && (
                        <span className='error_message'>{errors.email.message}</span>
                    )}

                    <label htmlFor="password">Members:</label>
                    <input
                        type="password"
                        id="members"
                        name="members"
                        {...register('members')}
                    />
                    {errors.members && (
                        <span className='error_message'>{errors.members.message}</span>
                    )}

                    <button type="submit">Submit</button>
                </form>
            </Modal>
            <Button
                type="primary"
                onClick={() => setIsModalOpen(true)}
            >
                Add channel
            </Button>
        </div>
    )
}