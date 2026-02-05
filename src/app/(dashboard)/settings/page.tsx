"use client";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();

  const handleSignOut = () => {
    // Demo mode - just redirect to home
    router.push("/");
  };

  return (
    <Container>
      <PageHeader
        title="Settings"
        description="Manage your account and preferences"
      />

      {/* Demo Mode Notice */}
      <Card className="p-4 mb-6 bg-amber-50 border-amber-200">
        <p className="text-sm text-amber-800">
          👋 <strong>Demo Mode</strong> — Settings are disabled until Supabase is connected.
        </p>
      </Card>

      <div className="space-y-6">
        {/* Profile Section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Profile</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Email</label>
              <p className="text-slate-900">demo@ledgeros.app</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Account Created</label>
              <p className="text-slate-900">Demo Account</p>
            </div>
          </div>
        </Card>

        {/* Preferences Section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Preferences</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-slate-900">Default Currency</p>
                <p className="text-sm text-slate-500">Currency for displaying amounts</p>
              </div>
              <p className="text-slate-900">INR (₹)</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-slate-900">Date Format</p>
                <p className="text-sm text-slate-500">How dates are displayed</p>
              </div>
              <p className="text-slate-900">DD/MM/YYYY</p>
            </div>
          </div>
        </Card>

        {/* Sign Out */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Session</h3>
          <Button 
            variant="outline" 
            onClick={handleSignOut}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            Exit Demo Mode
          </Button>
        </Card>
      </div>
    </Container>
  );
}
