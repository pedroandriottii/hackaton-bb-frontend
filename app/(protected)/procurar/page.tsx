'use client'
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/base/navbar_logado';
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Agency {
    distance: string;
    endereco: string;
    horarioFuncionamento: string;
    abertoAgora: boolean;
}

const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2); // Retorna a distância em km com duas casas decimais
};

const AgencyLocator: React.FC = () => {
    const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    const [selectedOption, setSelectedOption] = useState<'me' | 'cep'>('me');
    const [cep, setCep] = useState('');
    const [agencies, setAgencies] = useState<Agency[]>([]);
    const [distances, setDistances] = useState<string[]>([]);
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
    const getStaticMapUrl = (lat, lng) => {
        return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=200x200&maptype=roadmap&markers=color:red%7Clabel:%7C${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`;
    };

    const handleLocate = async (cepValue?: string) => {
        try {
            let response;
            if (selectedOption === 'me') {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                    response = await fetch(`http://localhost:3000/agency/nearest?lat=${latitude}&lng=${longitude}`);

                    if (response) {
                        const data: Agency[] = await response.json();
                        setAgencies(data);
                        const calculatedDistances = data.map(agency =>
                            calculateDistance(latitude, longitude, agency.localizacao.lat, agency.localizacao.lng)
                        );
                        setDistances(calculatedDistances);
                    }
                },
                    (error) => {
                        console.error("Erro ao obter localização:", error);
                    });
            } else if (cepValue) {
                response = await fetch(`http://localhost:3000/agency/nearest-by-cep?cep=${cepValue}`);
            }

            if (response) {
                const data: Agency[] = await response.json();
                setAgencies(data);
            }
        } catch (error) {
            console.error("Erro ao buscar agências:", error);
        }
    };

    useEffect(() => {
        if (selectedOption === 'me') {
            handleLocate();
        }
    }, [selectedOption]);

    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCep = e.target.value;
        setCep(newCep);

        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        setTypingTimeout(setTimeout(() => {
            if (selectedOption === 'cep' && newCep) {
                handleLocate(newCep);
            }
        }, 500));
    };

    return (
        <div className="bg-bb-blue min-h-screen">
            <Link href="/dashboard">
                <Button variant="ghost" size="icon" className="text-white hover:text-white/80" onClick={() => window.history.back()}>
                    <ArrowLeft className="h-6 w-6" />
                    <span className="sr-only">Voltar</span>
                </Button>
            </Link>

            <div className="p-6 text-center">
                <h1 className="text-bb-yellow text-4xl font-bold">Pontos de coleta</h1>
                <h1 className="text-bb-yellow text-4xl font-bold">próximos</h1>
            </div>

            <div className="flex flex-col items-center mb-4">
                <div className="flex items-center space-x-2">
                    <button
                        className={`px-4 py-2 rounded-full border-2 font-bold text-lg ${selectedOption === 'me' ? 'bg-white text-blue-600' : 'border-bb-yellow text-bb-yellow'}`}
                        style={{ width: '45vw', minWidth: '150px' }}
                        onClick={() => setSelectedOption('me')}
                    >
                        a mim
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full border-2 font-bold text-lg ${selectedOption === 'cep' ? 'bg-white text-blue-600' : 'border-bb-yellow text-bb-yellow'}`}
                        style={{ width: '45vw', minWidth: '150px' }}
                        onClick={() => setSelectedOption('cep')}
                    >
                        a um CEP
                    </button>
                </div>

                {selectedOption === 'cep' && (
                    <div className="flex items-center space-x-2 mt-4">
                        <label className="text-bb-yellow text-1.5xl font-bold">CEP:</label>
                        <input
                            type="text"
                            placeholder="Digite o CEP"
                            value={cep}
                            onChange={handleCepChange}
                            className="p-2 rounded-md border border-gray-300 w-36"
                        />
                    </div>
                )}
            </div>

            <div className="flex flex-col items-center mx-6 md:mx-auto max-w-lg">
                {agencies.length > 0 ? (
                    agencies.map((agency, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 mb-6 rounded-md shadow-md flex items-center space-x-6 max-w-sm w-full mx-auto"
                        >
                            <div className="flex flex-col items-center flex-none w-15">
                                <img
                                    src={getStaticMapUrl(agency.localizacao.lat, agency.localizacao.lng)}
                                    alt="Map"
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                                <span
                                    className={`font-semibold mt-2 ${agency.abertoAgora ? "text-green-500" : "text-red-500"}`}
                                >
                                    {agency.abertoAgora ? "Aberto" : "Fechado"}
                                </span>
                            </div>

                            <div className="flex flex-col space-y-2">
                                <span className="text-blue-600 font-semibold">
                                    <i className="fas fa-map-marker-alt text-red-500"></i> {distances[index]} km de distância
                                </span>
                                <span className="font-bold text-blue-600">{agency.endereco}</span>
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${agency.localizacao.lat},${agency.localizacao.lng}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-yellow-400 text-bb-blue font-semibold rounded-full px-4 py-2 text-center text-sm mx-auto block max-w-fit mt-[-1.5rem]"
                                    style={{ width: "auto" }}
                                >
                                    Ver no mapa
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center w-full">Nenhuma agência encontrada.</p>
                )}
            </div>
        </div>
    );
};

export default AgencyLocator;

