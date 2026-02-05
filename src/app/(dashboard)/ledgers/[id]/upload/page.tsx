import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function UploadPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <div className="mb-6">
        <Link
          href={`/ledgers/${params.id}`}
          className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Ledger
        </Link>
      </div>

      <PageHeader
        title="Upload Statement"
        description="Import transactions from a CSV file"
      />

      <Card className="text-center py-12">
        <CardContent>
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📤</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Upload Feature Coming Soon
          </h3>
          <p className="text-slate-500 max-w-md mx-auto">
            Statement upload and CSV parsing will be implemented in Phase 5.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
