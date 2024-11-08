'use client'
import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface AgencyLogado {
    distance: string;
    endereco: string;
    horarioFuncionamento: string;
    abertoAgora: boolean;
}

const calculateDistanceLogado = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
};

const AgencyLocatorLogado: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<'me' | 'cep'>('me');
    const [cep, setCep] = useState('');
    const [agencies, setAgencies] = useState<AgencyLogado[]>([]);
    const [distances, setDistances] = useState<string[]>([]);
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

    const getStaticMapUrlLogado = (lat, lng) => {
        return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=200x200&maptype=roadmap&markers=color:red%7Clabel:%7C${lat},${lng}&key=AIzaSyDy601rC6-0SOQJJ_KqVVNqjFKjWQTK9vI`;
    };

    const handleLocateLogado = async (cepValue?: string) => {
        try {
            let response;
            if (selectedOption === 'me') {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                    response = await fetch(`http://localhost:3000/agency/nearest?lat=${latitude}&lng=${longitude}`);

                    if (response) {
                        const data: AgencyLogado[] = await response.json();
                        setAgencies(data);
                        const calculatedDistances = data.map(agency =>
                            calculateDistanceLogado(latitude, longitude, agency.localizacao.lat, agency.localizacao.lng)
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
                const data: AgencyLogado[] = await response.json();
                setAgencies(data);
            }
        } catch (error) {
            console.error("Erro ao buscar agências:", error);
        }
    };

    useEffect(() => {
        if (selectedOption === 'me') {
            handleLocateLogado();
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
                handleLocateLogado(newCep);
            }
        }, 500));
    };

    return (
        <div className="bg-bb-blue min-h-screen">
            <div className="p-6 text-center">
                <button
                    onClick={() => window.history.back()}
                    className="text-white text-sm font-semibold mb-4 block"
                >
                    Voltar
                </button>
                <h1 className="text-bb-yellow text-4xl font-bold">Pontos de coleta</h1>
                <h1 className="text-bb-yellow text-4xl font-bold">próximos</h1>
            </div>

            {/* Seção de seleção na área azul */}
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
                                    src={getStaticMapUrlLogado(agency.localizacao.lat, agency.localizacao.lng)}
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
                                    <span className="inline-flex items-center text-blue-600 font-semibold">
                                        <FaMapMarkerAlt className="text-red-500 text-lg mr-1" /> {/* Ícone de localização */}
                                        {distances[index]} km de distância
                                    </span> </span>
                                <span className="font-bold text-blue-600">{agency.endereco}</span>
                                {/* Botão "Ver no mapa" alinhado com o status */}
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

export default AgencyLocatorLogado;
