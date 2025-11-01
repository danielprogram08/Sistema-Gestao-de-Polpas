import React, { useState } from 'react';
import Button from '../Button';
import CustomInput from '../CustomInput';

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
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
            <Button type="submit">
                Entrar
            </Button>
        </form>
    );
}
