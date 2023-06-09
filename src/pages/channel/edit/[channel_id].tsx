import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Select from "react-select";
import {IRestUser, Option} from "@/common/types";
import {useForm} from "react-hook-form";
import {channelProvider} from "@/provider/channel-provider";
import {userProvider} from "@/provider/user-provider";
import makeAnimated from "react-select/animated";

const EditChannelPage = () => {
    const router = useRouter();
    const {channel_id} = router.query;

    const [members, setMembers] = useState<IRestUser[]>();

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

    const {handleSubmit, formState: {errors}, setValue} = useForm<IAddMembers>();

    const formattedOptions = members?.map((user: IRestUser) => ({
        value: user.id,
        label: user.name
    }));

    interface IAddMembers {
        members: number[];
    }

    const onSubmit = async (channelInfo: IAddMembers) => {
        await channelProvider.addMembers(channel_id.toString(), channelInfo.members);
    }

    return (
        <div>
            <h1>Add Members in Channel {channel_id}</h1>
            {/* Your JSX/HTML content goes here */}
            <form onSubmit={handleSubmit(onSubmit)} className='login_form'>

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

                <button
                    className="editChannelButton"
                    type="submit">Edit Channel</button>
            </form>
        </div>
    );
};

export default EditChannelPage;
