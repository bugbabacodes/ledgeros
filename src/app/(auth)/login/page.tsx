"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDemo = () => {
    // Demo mode - skip auth, go straight to dashboard
    router.push("/dashboard");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Demo mode - just redirect
    setTimeout(() => {
      router.push("/dashboard");
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900">Welcome to LedgerOS</h2>
        <p className="mt-2 text-slate-600">
          Sign in to your account or try the demo
        </p>
      </div>

      {/* Demo Mode Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800 text-center">
          🚀 <strong>Demo Mode:</strong> Supabase not configured yet.
          <br />Click below to explore the app.
        </p>
      </div>

      <Button 
        onClick={handleDemo} 
        className="w-full bg-blue-600 hover:bg-blue-700"
        size="lg"
      >
        Enter Demo Mode →
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-slate-500">or sign in when ready</span>
        </div>
      </div>

      <form className="space-y-4 opacity-50">
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled
            className="mt-1"
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          onClick={handleLogin}
          disabled
        >
          Sign In (Requires Supabase)
        </Button>
      </form>

      <p className="text-center text-xs text-slate-500">
        To enable full auth, add Supabase env vars to Vercel
      </p>
    </div>
  );
}
