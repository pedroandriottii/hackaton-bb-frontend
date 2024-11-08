'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from "@/components/base/navbar_deslogado";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function Component() {
  const [formData, setFormData] = useState({
    fullName: '',
    cpf: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [success, setSuccess] = useState(false); // Novo estado de sucesso
  const router = useRouter();

  const formatCPF = (value) => {
    if (!value) return '';
    return value.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2').slice(0, 14);
  };
  
  const formatPhone = (value) => {
    if (!value) return '';
    return value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2').slice(0, 15);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cpf') {
      formattedValue = formatCPF(value);
    } else if (name === 'phone') {
      formattedValue = formatPhone(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return;
    }

    const userDto = {
      email: formData.email,
      name: formData.fullName,
      cpf: formData.cpf,
      phone: formData.phone,
      password: formData.password,
    };

    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDto)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro ao criar conta:', errorData);
      } else {
        const data = await response.json();
        const token = data.token;

        Cookies.set('accessToken', token, { expires: 1 });
        setSuccess(true); // Define sucesso como verdadeiro
      }
    } catch (error) {
      console.error('Erro ao criar conta:', error);
    }
  };

  const handleSuccessClick = () => {
    setSuccess(false);
    router.push('/login');
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
                  placeholder="Digite seu nome completo"
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
                  placeholder="Ex.: 001.002.003-04"
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
                  placeholder="Ex.: (35) 9999-1020"
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
                  placeholder="Ex.: email@gmail.com"
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
                  placeholder="Digite sua senha"
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
                  placeholder="Confirme sua senha"
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

      {success && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <Card className="max-w-sm w-full border-[#4338ca] border-2">
            <CardContent className="pt-6">
              <p className="text-center text-lg font-medium text-[#4338ca]">
                Conta criada com sucesso!
              </p>
            </CardContent>
            <CardFooter className="flex justify-center pb-6">
              <Button
                onClick={handleSuccessClick}
                className="w-24 bg-[#ffeb3b] hover:bg-[#ffeb3b]/90 text-black font-medium"
              >
                OK
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
