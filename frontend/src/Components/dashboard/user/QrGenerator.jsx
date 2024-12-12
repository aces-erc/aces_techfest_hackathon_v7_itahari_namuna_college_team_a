import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import Logo from '../../../images/mainLogo.png';

const QrGenerator = () => {
    const [text, setText] = useState('https://sagunbasnet.com.np');

    return (
        <div className="flex flex-col gap-8 h-[calc(100vh-10rem)] justify-center items-center">
            <div className="my-grid">
                <img src={Logo} alt="" />
            </div>
            <QRCode value={text} size={250} />
            <div className="flex flex-col justify-center items-center">
                <h1>Scan code</h1>
                <span className='text-2xl text-primary font-bold'>For user medical History</span>

            </div>
        </div>
    );
};

export default QrGenerator;
