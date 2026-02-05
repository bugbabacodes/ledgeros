import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default function InboxPage() {
  return (
    <div>
      <PageHeader
        title="Review Inbox"
        description="Items that need your attention"
      />

      <Card className="text-center py-12">
        <CardContent>
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✅</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            All Caught Up!
          </h3>
          <p className="text-slate-500 max-w-md mx-auto">
            No items need your attention right now. New transactions will appear here when they need to be categorized.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
