import React, {useState} from "react";
import {Option, IRestUser} from "@/common/types";
import Select from "react-select";
import {Modal} from "antd";
import {useForm} from "react-hook-form";
import makeAnimated from 'react-select/animated';


export const ChannelInfo = (props) => {
    const {currentChannel, members} = props;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const animatedComponents = makeAnimated();

    interface IAddMembers {
        members: number[];
    }

    const {handleSubmit, formState: {errors}, setValue} = useForm<IAddMembers>();

    const formattedOptions = members?.map((user: IRestUser) => ({
        value: user.id,
        label: user.name
    }));

    return (
        <div className='channel-info-container'>
            <h1>{currentChannel?.name}</h1>
            <Modal
                title="Basic Modal"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
            >
                <form onSubmit={handleSubmit(onSubmit)} className='login_form'>

                    Suggestions

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
        </div>
    )
}