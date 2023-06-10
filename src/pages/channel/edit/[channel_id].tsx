import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Select from "react-select";
import {ICreateChannel, IRestUser, Option} from "@/common/types";
import {useForm} from "react-hook-form";
import {channelProvider} from "@/provider/channel-provider";
import {userProvider} from "@/provider/user-provider";
import makeAnimated from "react-select/animated";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    members: Yup.array().of(Yup.number()).required()
});

const EditChannelPage = () => {
    const router = useRouter();
    const {channel_id} = router.query;

    const [users, setUsers] = useState<IRestUser[]>([]);
    const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

    useEffect(() => {
        userProvider.getUsers()
            .then((users) => {
                setUsers(users.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])


    const { register, handleSubmit, formState: { errors }, setValue } = useForm<ICreateChannel>({
        resolver: yupResolver(validationSchema)
    });


    interface IAddMembers {
        members: number[];
    }

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

    const onSubmit = async (channelInfo: IAddMembers) => {
        console.log(channelInfo.members)
        channelProvider.addMembers(channel_id.toString(), channelInfo.members).then((newChannel) => router.push(`/channel/${channel_id}`)).catch((err) => console.log(err));;
    }

    return (
        <div>
            <h1>Add Members in Channel {channel_id}</h1>
            {/* Your JSX/HTML content goes here */}
            <form onSubmit={handleSubmit(onSubmit)} className='editChannelForm' name="editChannelForm">

                <label htmlFor="password">Members:</label>
                {users?.map((user) => (
                    <div key={user.id}>
                        <input
                            type="checkbox"
                            id={user.id.toString()}
                            value={user.id}
                            checked={selectedMembers?.includes(user.id)}
                            onChange={() => handleCheckboxChange(user.id)}
                        />
                        <label htmlFor={user.id.toString()}>{user.name}</label>
                    </div>
                ))}
                {errors.members && <span className="error_message">{errors.members.message}</span>}

                <button
                    className="editChannelButton"
                    type="submit">Edit Channel</button>
            </form>
        </div>
    );
};

export default EditChannelPage;
