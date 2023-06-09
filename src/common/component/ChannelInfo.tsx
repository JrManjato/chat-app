import React, {useState} from "react";
import {Option, IRestUser} from "@/common/types";
import Select from "react-select";
import {Modal} from "antd";
import {useForm} from "react-hook-form";
import makeAnimated from 'react-select/animated';
import {channelProvider} from "@/provider/channel-provider";


export const ChannelInfo = (props) => {
    const {currentDiscussion, members} = props;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const animatedComponents = makeAnimated();


    return (
        <div className='channel-info-container'>
            <h1>{currentDiscussion?.name}</h1>
            <button
                type="button"
                name="add-members"
                id="add-members-button"
                onClick={()=> setIsModalOpen(true)}
            >
                Add Members
            </button>
        </div>
    )
}