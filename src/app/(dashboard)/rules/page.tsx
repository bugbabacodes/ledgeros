import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default function RulesPage() {
  return (
    <div>
      <PageHeader
        title="Rules"
        description="Auto-classification rules for transactions"
      />

      <Card className="text-center py-12">
        <CardContent>
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📋</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No Rules Yet
          </h3>
          <p className="text-slate-500 max-w-md mx-auto">
            Rules are created automatically when you categorize transactions. They help you auto-classify future transactions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
