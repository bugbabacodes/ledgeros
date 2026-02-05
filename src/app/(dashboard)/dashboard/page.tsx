import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import Link from "next/link";

// Mock data for demo
const mockStats = {
  netWorth: 245000,
  bankAccounts: 156000,
  creditCards: -12000,
  cash: 8500,
  investments: 92500,
  inboxCount: 12,
};

const mockTransactions = [
  { id: 1, description: "Amazon.com", amount: -2499, date: "2026-02-05", category: "Shopping" },
  { id: 2, description: "Salary - TechCorp", amount: 150000, date: "2026-02-01", category: "Income" },
  { id: 3, description: "Netflix", amount: -649, date: "2026-02-03", category: "Subscriptions" },
  { id: 4, description: "Swiggy", amount: -450, date: "2026-02-04", category: "Food" },
  { id: 5, description: "Uber", amount: -320, date: "2026-02-04", category: "Transport" },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function DashboardPage() {
  return (
    <Container>
      {/* Demo Banner */}
      <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-3">
        <p className="text-sm text-amber-800 text-center">
          👋 <strong>Demo Mode</strong> — This is sample data. Connect Supabase to use real data.
        </p>
      </div>

      <PageHeader
        title="Dashboard"
        description="Your financial overview at a glance"
      />

      {/* Net Worth Card */}
      <Card className="p-6 mb-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <p className="text-blue-100 text-sm font-medium">Total Net Worth</p>
        <p className="text-4xl font-bold mt-1">{formatCurrency(mockStats.netWorth)}</p>
        <p className="text-blue-200 text-sm mt-2">Across all accounts</p>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4">
          <p className="text-slate-500 text-sm">Bank Accounts</p>
          <p className="text-xl font-semibold text-slate-900">{formatCurrency(mockStats.bankAccounts)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-slate-500 text-sm">Credit Cards</p>
          <p className="text-xl font-semibold text-red-600">{formatCurrency(mockStats.creditCards)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-slate-500 text-sm">Cash</p>
          <p className="text-xl font-semibold text-slate-900">{formatCurrency(mockStats.cash)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-slate-500 text-sm">Investments</p>
          <p className="text-xl font-semibold text-green-600">{formatCurrency(mockStats.investments)}</p>
        </Card>
      </div>

      {/* Inbox Alert */}
      {mockStats.inboxCount > 0 && (
        <Link href="/inbox">
          <Card className="p-4 mb-8 bg-orange-50 border-orange-200 hover:bg-orange-100 cursor-pointer transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-orange-900">📥 Review Inbox</p>
                <p className="text-sm text-orange-700">{mockStats.inboxCount} transactions need categorization</p>
              </div>
              <span className="text-orange-600">→</span>
            </div>
          </Card>
        </Link>
      )}

      {/* Recent Transactions */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Recent Transactions</h2>
          <Link href="/transactions" className="text-sm text-blue-600 hover:underline">
            View all →
          </Link>
        </div>
        <Card>
          <div className="divide-y divide-slate-100">
            {mockTransactions.map((tx) => (
              <div key={tx.id} className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium text-slate-900">{tx.description}</p>
                  <p className="text-sm text-slate-500">{tx.date} • {tx.category}</p>
                </div>
                <p className={`font-semibold ${tx.amount < 0 ? "text-slate-900" : "text-green-600"}`}>
                  {formatCurrency(tx.amount)}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Container>
  );
}
