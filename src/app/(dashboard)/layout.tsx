import { Navbar } from "@/components/layout/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Demo mode - no auth check needed
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="py-8">{children}</main>
    </div>
  );
}
