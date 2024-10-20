"use client";

import CharacterAddForm from "@/app/ui/character/CharacterAddForm";

export default function AddCharacterPage() {
  return (
    <div className="container mx-auto bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Adicionar Personagem</h1>
      <CharacterAddForm />
    </div>
  );
}
