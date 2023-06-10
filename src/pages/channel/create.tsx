import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import * as Yup from "yup";
import { ICreateChannel, IRestUser, Option } from "@/common/types";
import makeAnimated from "react-select/animated";
import { channelProvider } from "@/provider/channel-provider";
import { userProvider } from "@/provider/user-provider";
import { Button } from "antd";
import { useRouter } from "next/router";

const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    type: Yup.string().oneOf(['public', 'private']).required(),
    members: Yup.array().of(Yup.number()).required()
});

const CreateChannelPage = () => {
    const [members, setMembers] = useState<IRestUser[]>();
    const router = useRouter(); // Change import statement here

    useEffect(() => {
        userProvider.getUsers()
            .then((users) => {
                setMembers(users.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])

    const animatedComponents = makeAnimated();

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<ICreateChannel>({
        resolver: yupResolver(validationSchema)
    });

    const formattedOptions = members?.map((user: IRestUser) => ({
        value: user.id,
        label: user.name
    }));

    const onSubmit = async (channelInfo) => {
        await channelProvider.createChannel(channelInfo);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='login_form'>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="channelName"
                    name="channelName"
                    {...register('name')}
                />
                {errors.name && (
                    <span className='error_message'>{errors.name.message}</span>
                )}

                <label htmlFor="email">Type:</label>
                <select
                    name="type"
                    {...register('type')}>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                </select>
                {errors.type && (
                    <span className='error_message'>{errors.type.message}</span>
                )}

                <label htmlFor="password">Members:</label>
                <Select
                    onChange={(event) => {
                        const arrayOfIDs: number[] = [];
                        event.map((option: Option) => arrayOfIDs.push(option.value));
                        setValue('members', arrayOfIDs);
                    }}
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    isMulti
                    options={formattedOptions} />
                {errors.members && (
                    <span className='error_message'>{errors.members.message}</span>
                )}

                <button
                    className="createChannelButton"
                    type="submit"
                >Create Channel</button>
            </form>
            <Button
                type="primary"
                onClick={async () => router.push('/chat')} // redirect to chat
            >
                go back to the chat
            </Button>
        </>
    )
}

export default CreateChannelPage;