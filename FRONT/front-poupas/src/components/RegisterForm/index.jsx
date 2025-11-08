import React, { useState } from 'react';
import Button from '../Button';
import CustomInput from '../CustomInput';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

export default function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        // Handle register logic here
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);
    };

    return (
        <form onSubmit={handleRegister} className="flex flex-col gap-6">
            <div className="relative">
                <CustomInput
                    id="name"
                    label="Nome"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    containerClassName="pl-10"
                />
                <FaUser className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            </div>
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
            <div className="relative">
                <CustomInput
                    id="confirmPassword"
                    label="Confirmar Senha"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    containerClassName="pl-10"
                />
                <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            </div>
            <Button type="submit" className="w-full">
                Cadastrar
            </Button>
        </form>
    );
}
