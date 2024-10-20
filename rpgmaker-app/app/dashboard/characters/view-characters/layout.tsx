export default function ViewCharactersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="container mx-auto p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
        {children}
      </div>
    </>
  );
}
