'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from "@/components/base/navbar_deslogado";
import React from "react";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { cookies } from 'next/headers';

export default function Component() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      console.log(JSON.stringify({ email, password }));

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        Cookies.set('accessToken', token, { expires: 1 });

        console.log('Token salvo no cookie:', token);

        router.push('/home');
      } else {
        const errorData = await response.json();
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div className="bg-bb-fundo min-h-screen">
      <Navbar />
      <div className="min-h-screen bg-[#3c3c16] text-white px-4 py-8">
        <div className="max-w-sm mx-auto space-y-8">
          <div className="text-center space-y-1">
            <p>Bem vindo(a) ao</p>
            <h1 className="text-2xl font-bold italic">BB TechPoints!</h1>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center italic">Login</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none"
                >
                  Endereço de e-mail:
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-3 bg-white text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-none"
                >
                  Senha:
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 px-3 bg-white text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#ffeb3b] hover:bg-[#ffeb3b]/90 text-black font-medium h-12 rounded-md"
              >
                Fazer login
              </button>
            </form>

            <div className="text-center text-sm">
              <span>Não possui conta? </span>
              <Link href="/cadastro" className="text-[#2196f3] hover:underline">
                Criar conta
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
