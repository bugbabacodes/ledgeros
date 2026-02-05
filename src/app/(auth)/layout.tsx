import { Container } from "@/components/layout/container";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Demo mode - no auth check
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Simple Header */}
      <nav className="border-b border-slate-200 bg-white">
        <Container className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-xl font-semibold text-slate-900">LedgerOS</span>
          </Link>
        </Container>
      </nav>

      {/* Auth Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
