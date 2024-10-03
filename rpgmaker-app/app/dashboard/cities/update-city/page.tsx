"use client";

import UpdateCityForm from "@/app/ui/city/UpdateCityForm";

export default function UpdateCity() {
  return (
    <div className="container mx-auto bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Atualizar Cidade</h1>
      <UpdateCityForm />
    </div>
  );
}
