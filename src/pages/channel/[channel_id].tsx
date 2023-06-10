import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {ICreateMessage, IMessage} from "@/common/types";
import {useForm} from "react-hook-form";
import {messageProvider} from "@/provider/message-provider";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {MessageItem} from "@/common/component";
import withAuth from "@/common/utils/WithAuth";

const ChannelMessagePage = () => {
    const [messages, setMessages] = useState<IMessage[] | undefined>();
    const router = useRouter();
    const {channel_id} = router.query;

    const validationSchema = Yup.object().shape({
        recipientId: Yup.string().default(channel_id?.toString()),
        content: Yup.string()
    });

    const {register, handleSubmit, reset, formState: {errors}} = useForm<ICreateMessage>({
        resolver: yupResolver(validationSchema)
    });


    useEffect(() => {
        messageProvider.getMessagesByChannel(channel_id?.toString())
            .then((messages) => {
                setMessages(messages.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])

    const onSubmit = async (newMessage: ICreateMessage) => {
        await messageProvider.sendMessage(newMessage);
    }

    console.log(messages)
    return (
        <div className="direct-message-container">
            <h1>Send message to channel with id: {channel_id}</h1>
            {/* Have to list messages here */}

            {messages?.reverse().map((message: IMessage) => (
                <MessageItem message={message}/>
            ))}

            <form onSubmit={handleSubmit(onSubmit)} className='sendMessageForm' name="sendMessageForm">
                <label htmlFor="message">Message: </label>
                <textarea
                    id="message"
                    name="message"
                    {...register('content')}
                />
                {errors.content && (
                    <span className='error_message'>{errors.content.message}</span>
                )}

                <button
                    className="sendMessageButton"
                    type="submit">Send Message</button>
            </form>
        </div>
    );
};

export default ChannelMessagePage;
