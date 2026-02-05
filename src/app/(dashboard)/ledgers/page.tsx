import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LedgersPage() {
  return (
    <div>
      <PageHeader
        title="Ledgers"
        description="Manage your financial accounts"
      >
        <Link href="/ledgers/new">
          <Button>Add Ledger</Button>
        </Link>
      </PageHeader>

      <Card className="text-center py-12">
        <CardContent>
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💳</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No Ledgers Yet
          </h3>
          <p className="text-slate-500 max-w-md mx-auto mb-6">
            Create your first ledger to start tracking your finances.
          </p>
          <Link href="/ledgers/new">
            <Button>Create Ledger</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
