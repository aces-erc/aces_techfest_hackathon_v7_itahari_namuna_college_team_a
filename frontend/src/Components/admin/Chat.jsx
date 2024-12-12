import React from 'react'
import ChatBotModel from '../global/ChatBotModel'

const Chat = () => {
    return (
        <div className='w-full'>
            <ChatBotModel isOpen={true} closeModal={() => { }} />
        </div>
    )
}

export default Chat