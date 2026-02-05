import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default function TransactionsPage() {
  return (
    <div>
      <PageHeader
        title="Transactions"
        description="View all your transactions"
      />

      <Card className="text-center py-12">
        <CardContent>
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📄</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No Transactions Yet
          </h3>
          <p className="text-slate-500 max-w-md mx-auto">
            Transactions will appear here once you upload statements to your ledgers.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
