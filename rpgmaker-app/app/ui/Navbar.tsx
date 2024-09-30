import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-white text-xl font-bold">
          <Link href="/dashboard">
            <span className="text-white hover:text-indigo-200">rpgmaker</span>
          </Link>
        </h1>
        <ul className="flex space-x-4">
          <li>
            <Link href="/dashboard/cities">
              <span className="text-white hover:text-indigo-200">Cidades</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/characters">
              <span className="text-white hover:text-indigo-200">Personagens</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/powers">
              <span className="text-white hover:text-indigo-200">Poderes</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/groups">
              <span className="text-white hover:text-indigo-200">Grupos</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/opponents">
              <span className="text-white hover:text-indigo-200">Oponentes</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}