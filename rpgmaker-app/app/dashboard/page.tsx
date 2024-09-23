import { signOut } from "../lib/actions";

export default function LoginPage() {
  return (
    <>
      Dashboard
      <form
        action={signOut}>
        <button className="flex font-medium text-blue-600 dark:text-blue-500 hover:underline">
          <div className="hidden md:block">Sign Out</div>
        </button>
      </form>
    </>
  );
}