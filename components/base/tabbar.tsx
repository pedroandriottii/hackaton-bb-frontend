'use client'
import { Camera, House, MapPinned } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TabBar = () => {
  const pathname = usePathname();

  const isActive = (route: string) => pathname === route;

  return (
    <div className="bg-white flex items-center justify-between px-10 py-4 border-t border-gray-300 fixed bottom-0 w-full">
      <Link href="/home" className="flex-1 flex justify-center">
        <House size={32} className={`${isActive("/home") ? "text-bb-blue" : "text-gray-500"}`} />
      </Link>
      <div className="border-l border-gray-300 h-8"></div> {/* Divisória */}
      <Link href="/descartar" className="flex-1 flex justify-center">
        <Camera size={32} className={`${isActive("/descartar") ? "text-bb-blue" : "text-gray-500"}`} />
      </Link>
      <div className="border-l border-gray-300 h-8"></div> {/* Divisória */}
      <Link href="/procurar" className="flex-1 flex justify-center">
        <MapPinned size={32} className={`${isActive("/procurar") ? "text-bb-blue" : "text-gray-500"}`} />
      </Link>
    </div>
  );
};

export default TabBar;