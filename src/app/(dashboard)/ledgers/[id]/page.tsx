import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LedgerDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <PageHeader
        title="Ledger Details"
        description="View and manage this ledger"
      >
        <Link href={`/ledgers/${params.id}/upload`}>
          <Button>Upload Statement</Button>
        </Link>
      </PageHeader>

      <Card>
        <CardContent className="pt-6">
          <p className="text-slate-500">
            Ledger ID: {params.id}
          </p>
          <p className="text-slate-500 mt-2">
            Full ledger details coming in Phase 4.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
