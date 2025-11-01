import React, { useState } from 'react';
import Button from '../Button';
import CustomInput from '../CustomInput';

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
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <CustomInput
                id="name"
                label="Nome"
                type="text"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <CustomInput
                id="email"
                label="Email"
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <CustomInput
                id="password"
                label="Senha"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <CustomInput
                id="confirmPassword"
                label="Confirmar Senha"
                type="password"
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button type="submit">
                Cadastrar
            </Button>
        </form>
    );
}
