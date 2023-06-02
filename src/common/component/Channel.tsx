import React, {useEffect, useState} from "react";
import {Button, Modal} from "antd";
import {IChannel, ICreateChannel, IRestUser} from "@/common/types";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import {userProvider} from "@/provider/user-provider";
import {channelProvider} from "@/provider/channel-provider";
import {ChannelItem} from "@/common/component/ChannelItem";

type Option = {
    value: number;
    label: string;
};

const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    type: Yup.string().oneOf(['public', 'private']).required(),
    members: Yup.array().of(Yup.number()).required()
});

export const Channel = () => {
    const animatedComponents = makeAnimated();
    const [members, setMembers] = useState<IRestUser[]>();
    const [channelList, setChannelList] = useState<IChannel[]>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {register, handleSubmit, formState: {errors}, setValue} = useForm<ICreateChannel>({
        resolver: yupResolver(validationSchema)
    });

    useEffect(() => {
        userProvider.getUsers()
            .then((users) => {
                setMembers(users.data);
            })
            .catch((error) => {
                console.error(error);
            });
        channelProvider.getChannels()
            .then((channels) => {
                setChannelList(channels.data);
            }).catch((error) => {
            console.error(error);
        });
    }, [])

    const formattedOptions = members?.map((user: IRestUser) => ({
        value: user.id,
        label: user.name
    }));

    const onSubmit = async (channelInfo) => {
        await channelProvider.createChannel(channelInfo);
        setIsModalOpen(false);
    }

    console.log(channelList);
    return (
        <div className='channel-container'>
            <h1>Channel list</h1>
            <Modal
                title="Basic Modal"
                open={isModalOpen}
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
                    <select {...register('type')}>
                        <option value="public">Public</option>
                        <option value="private">Privé</option>
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
                        options={formattedOptions}/>
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
            <div className="channel-list">
                Channel list
                {channelList?.map((channel:IChannel) => (
                    <ChannelItem id={channel.id} channel={channel} />
                ))}
            </div>
        </div>
    )
}