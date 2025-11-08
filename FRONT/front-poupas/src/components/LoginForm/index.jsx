import React, { useState } from 'react';
import Button from '../Button';
import CustomInput from '../CustomInput';
import { FaEnvelope, FaLock } from 'react-icons/fa';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="relative">
                <CustomInput
                    id="email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    containerClassName="pl-10"
                />
                <FaEnvelope className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            </div>
            <div className="relative">
                <CustomInput
                    id="password"
                    label="Senha"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    containerClassName="pl-10"
                />
                <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            </div>
            <Button type="submit" className="w-full">
                Entrar
            </Button>
        </form>
    );
}
