import type { Metadata } from "next";
import Link from "next/link";

import { RegisterForm } from "@/components/register-form";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account",
};

export default function RegisterPage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-white">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-black">
            Create an account
          </h1>
        </div>
        <RegisterForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/login"
            className="hover:text-brand underline underline-offset-4"
          >
            Already have an account? Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
