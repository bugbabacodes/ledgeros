import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TransactionDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <div className="mb-6">
        <Link
          href="/transactions"
          className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Transactions
        </Link>
      </div>

      <PageHeader
        title="Transaction Details"
        description="View transaction information"
      />

      <Card>
        <CardContent className="pt-6">
          <p className="text-slate-500">
            Transaction ID: {params.id}
          </p>
          <p className="text-slate-500 mt-2">
            Full transaction details coming in Phase 4.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
