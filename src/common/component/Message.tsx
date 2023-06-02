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
import Tab from "@/common/component/Tab";


export const Message = (props) => {
    const {currentChannel} = props;
    return (
        <div className='message-container'>
            <h1>{currentChannel?.name}</h1>
        </div>
    )
}