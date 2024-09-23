import Link from 'next/link';

export default function Page() {
  return (
    <>
      Home
      <Link href="/login" className="flex font-medium text-blue-600 dark:text-blue-500 hover:underline">
        <span>Sign in</span>
      </Link>
    </>
  );
}