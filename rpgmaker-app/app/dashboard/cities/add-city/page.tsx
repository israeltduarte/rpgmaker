"use client";

import CityAddForm from "@/app/ui/city/CityAddForm";

export default function AddCityPage() {
  return (
    <div className="container mx-auto bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Adicionar de Cidades</h1>
      <CityAddForm />
    </div>
  );
}