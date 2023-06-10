import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ICreateChannel, IRestUser } from "@/common/types";
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
    const [users, setUsers] = useState<IRestUser[]>([]);
    const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
    const router = useRouter();

    useEffect(() => {
        userProvider.getUsers()
            .then((users) => {
                setUsers(users.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<ICreateChannel>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (channelInfo: ICreateChannel) => {
        channelProvider.createChannel(channelInfo)
            .then((newChannel) => router.push(`/channel/${newChannel.data.id}`))
            .catch((err) => console.log(err));
    };

    const handleCheckboxChange = (userId: number) => {
        setSelectedMembers((prevMembers: number[]) => {
            if (prevMembers.includes(userId)) {
                return prevMembers.filter((memberId) => memberId !== userId);
            } else {
                return [...prevMembers, userId];
            }
        });

        const arrayOfIDs = selectedMembers.includes(userId)
            ? selectedMembers.filter((memberId) => memberId !== userId)
            : [...selectedMembers, userId];

        setValue("members", arrayOfIDs);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="login_form" name="createChannelForm">
                <label htmlFor="name">Name:</label>
                <input type="text" id="channelName" name="channelName" {...register("name")} />
                {errors.name && <span className="error_message">{errors.name.message}</span>}

                <label htmlFor="email">Type:</label>
                <select name="type" {...register("type")}>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                </select>
                {errors.type && <span className="error_message">{errors.type.message}</span>}

                <label htmlFor="password">Members:</label>
                {users?.map((user) => (
                    <div key={user.id}>
                        <input
                            type="checkbox"
                            id={user.id.toString()}
                            value={user.id}
                            checked={selectedMembers.includes(user.id)}
                            onChange={() => handleCheckboxChange(user.id)}
                        />
                        <label htmlFor={user.id.toString()}>{user.name}</label>
                    </div>
                ))}
                {errors.members && <span className="error_message">{errors.members.message}</span>}

                <button className="createChannelButton" type="submit">
                    Create Channel
                </button>
            </form>
            <Button type="primary" onClick={async () => router.push("/chat")}>
                Go back to the chat
            </Button>
        </>
    );
};

export default CreateChannelPage;