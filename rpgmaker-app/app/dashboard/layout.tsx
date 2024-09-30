import Navbar from '../ui/Navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        {children}
      </div>
    </>
  );
}
