import { signOut } from "../lib/actions";
import Navbar from "../ui/Navbar"; // Certifique-se de que o caminho está correto

export default function DashboardPage() {
  return (
    <>
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <form action={signOut}>
          <button className="flex font-medium text-blue-600 dark:text-blue-500 hover:underline">
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </>
  );
}
