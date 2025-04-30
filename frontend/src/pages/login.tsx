import type { Metadata } from "next";
import Link from "next/link";

import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-white">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-black">
            Welcome back
          </h1>
        </div>
        <LoginForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
