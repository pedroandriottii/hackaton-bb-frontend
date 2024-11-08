'use client'
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useUser } from "@/context/Usercontext";

interface RewardItem {
  name: string;
  points: number;
  image: string;
  disabled?: boolean;
}

export default function RewardsPage() {
  const { user } = useUser();

  const rewards: RewardItem[] = [
    {
      name: "Copo BB",
      points: 100,
      image: "/copobb.png",
    },
    {
      name: "Mousepad BB",
      points: 200,
      image: "/mousepadbb.png",
    },
    {
      name: "Caneca BB Personalizada",
      points: 350,
      image: "/canecabb.png",
    },
    {
      name: "Garrafa Térmica BB",
      points: 500,
      image: "/garrafatermicabb.png",
    },
    {
      name: "Mouse BB",
      points: 1500,
      image: "/mouse.png",
      disabled: true,
    },
    {
      name: "Echo Dots",
      points: 5000,
      image: "/echodot.png",
      disabled: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#4263EB]">
      <div className="p-4">
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:text-white/80"
        >
          <ChevronLeft className="h-6 w-6" />
          Voltar
        </Button>

        <h1 className="text-yellow-300 text-2xl font-bold text-center mt-2 italic">
          Tabela de
        </h1>
        <h1 className="text-yellow-300 text-2xl font-bold text-center italic">
          recompensas
        </h1>

        <div className="grid grid-cols-2 gap-4 mt-6">
          {rewards.map((reward, index) => (
            <div
              key={index}
              className={`relative rounded-xl p-4 flex flex-col items-center ${
                user && user.points >= reward.points ? "bg-yellow-300" : "bg-gray-200"
              }`}
            >
              <div className="relative w-full aspect-square mb-2">
                <Image
                  src={reward.image}
                  alt={reward.name}
                  layout="responsive"
                  width={100}
                  height={100}
                  className="object-contain p-4"
                />
              </div>
              <h3 className="text-blue-600 font-medium text-sm">{reward.name}</h3>
              <p className="text-blue-600 text-sm">{reward.points}pts</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
