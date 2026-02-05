import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-slate-200">
        <Container className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-xl font-semibold text-slate-900">
              LedgerOS
            </span>
          </div>
          <Link href="/login">
            <Button variant="outline">Sign In</Button>
          </Link>
        </Container>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-slate-50">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              Your finances, reconciled.
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              A ledger-first personal finance system for complex finances. 
              Built on double-entry accounting with statement-based reconciliation.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/login">
                <Button size="lg">Get Started</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <Container>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Statement-Based Import
              </h3>
              <p className="text-slate-600">
                Upload CSV statements from your banks. No manual entry required.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Double-Entry Accounting
              </h3>
              <p className="text-slate-600">
                Every transaction creates balanced entries. Your books always balance.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Smart Review Inbox
              </h3>
              <p className="text-slate-600">
                Review and categorize transactions with one-click rules.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8">
        <Container>
          <p className="text-center text-slate-500">
            &copy; 2026 LedgerOS. All rights reserved.
          </p>
        </Container>
      </footer>
    </div>
  );
}
