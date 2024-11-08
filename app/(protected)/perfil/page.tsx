'use client'

import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type UserData = {
  id: string
  email: string
  name: string
  cpf: string
  phone: string
  points: number
  cep: string | null
  role: string
  totalWeight: string;
}

export default function Component() {
  const [userData, setUserData] = useState<UserData | null>(null)

  // Função para obter o valor do token a partir dos cookies
  function getAccessTokenFromCookie() {
    const match = document.cookie.match(/(^|;\s*)accessToken=([^;]*)/)
    return match ? decodeURIComponent(match[2]) : null
  }

  useEffect(() => {
    const token = getAccessTokenFromCookie()
    
    if (token) {
      fetch("http://localhost:3000/users/me", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar dados do usuário")
        }
        return response.json()
      })
      .then((data) => {
        setUserData(data)
      })
      .catch((error) => {
        console.error("Erro:", error)
      })
    } else {
      console.error("Token de autenticação não encontrado nos cookies")
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#4338ca] p-4">
      <div className="max-w-md mx-auto">
      <div className="flex items-center gap-1 mb-6">
  <Link href="/dashboard">
    <Button variant="ghost" size="icon" className="text-white hover:text-white/80" onClick={() => window.history.back()}>
      <ArrowLeft className="h-6 w-6" />
      <span className="sr-only">Voltar</span>
    </Button>
  </Link>
  <div className="flex-1 text-center ml-[-10px]">
    <h1 className="text-3xl font-bold italic text-[#ffeb3b]">Meu perfil</h1>
  </div>
</div>

        <div className="bg-white shadow-lg rounded-lg p-6"> 
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-[#4338ca]">Meus dados</h2>
          </div>

          {userData ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500" style={{color: '#465EFF'}}>Nome completo</label>
                <p className="text-gray-900">{userData.name}</p>
              </div>

              <div>
                <label className="text-sm text-gray-500" style={{color: '#465EFF'}}>CPF</label>
                <p className="text-gray-900">{userData.cpf}</p>
              </div>

              <div>
                <label className="text-sm text-gray-500" style={{color: '#465EFF'}}>Endereço de e-mail</label>
                <p className="text-gray-900">{userData.email}</p>
              </div>

              <div>
                <label className="text-sm text-gray-500" style={{color: '#465EFF'}}>Telefone</label>
                <p className="text-gray-900">{userData.phone}</p>
              </div>

              <div className="border-t border-gray-200 my-4"></div>

              <div>
                <h2 className="text-xl font-semibold text-[#4338ca] mb-4">Histórico</h2>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-gray-700 mb-6">
                    Você já evitou <span className="font-semibold">{userData.totalWeight} g de resíduos eletrônico</span> que foram descartardas de forma indevida em pontos de descarte BB.
                  </p>
                  <p className="text-gray-700 mb-6">
                    Obrigado por contribuir para a preservação do meio-ambiente, {userData.name}!
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p>Carregando...</p>
          )}
        </div>
      </div>
    </div>
  )
}
