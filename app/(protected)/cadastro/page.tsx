'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from "@/components/base/navbar";
import React from "react";
import bcrypt from 'bcryptjs'; // Substitua por 'bcryptjs' para que funcione no lado do cliente

export default function Component() {
  const [formData, setFormData] = useState({
    fullName: '',
    cpf: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }
    
    // Hash da senha antes de enviá-la para a API externa
    const hashedPassword = await bcrypt.hash(formData.password, 10);

    const userDto = {
      id: crypto.randomUUID(),
      email: formData.email,
      name: formData.fullName,
      cpf: formData.cpf,
      phone: formData.phone,
      password: hashedPassword,
    };

    try {
      console.log(userDto);
      const response = await fetch('https://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDto)
      });
      console.log(response);
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Erro: ${errorData.message}`);
      } else {
        alert('Conta criada com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      alert('Erro ao criar conta');
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
            <h2 className="text-3xl font-bold text-center italic">Criar conta</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-medium leading-none">
                  Nome completo:
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-white text-black h-12 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="cpf" className="text-sm font-medium leading-none">
                  CPF:
                </label>
                <input
                  id="cpf"
                  name="cpf"
                  type="text"
                  value={formData.cpf}
                  onChange={handleChange}
                  className="w-full bg-white text-black h-12 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium leading-none">
                  Telefone:
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white text-black h-12 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none">
                  E-mail:
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white text-black h-12 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium leading-none">
                  Senha:
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-white text-black h-12 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium leading-none">
                  Confirmar senha:
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-white text-black h-12 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#ffeb3b] hover:bg-[#ffeb3b]/90 text-black font-medium h-12 mt-6 rounded-md"
              >
                Criar conta
              </button>
            </form>

            <div className="text-center text-sm">
              <span>Já possui conta? </span>
              <Link href="/login" className="text-[#2196f3] hover:underline">
                Fazer login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
