import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default function SubscriptionsPage() {
  return (
    <div>
      <PageHeader
        title="Subscriptions"
        description="Track your recurring payments"
      />

      <Card className="text-center py-12">
        <CardContent>
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔄</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No Subscriptions Detected
          </h3>
          <p className="text-slate-500 max-w-md mx-auto">
            Subscriptions will be automatically detected when you import transactions. Recurring payments are identified based on patterns.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
