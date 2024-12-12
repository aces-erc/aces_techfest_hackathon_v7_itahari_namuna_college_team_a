import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import Logo from '../../../images/mainLogo.png';

const QrGenerator = () => {
    const [text, setText] = useState('http://localhost:5173/user/show_user_information/6f47d1a9d2/stats?data=eyJ1c2VyIjoiMTIzNDUifQ==&ref=xyz123&token=abc987xyz&type=hlthchk&ts=1678901234'
);

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
