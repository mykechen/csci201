import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-center text-4xl font-bold tracking-tight text-black">
          Welcome
        </h1>

        <div className="flex flex-col gap-4 w-64">
          <Link href="/login" className="w-full">
            <Button className="w-full" variant="default">
              Login
            </Button>
          </Link>

          <Link href="/register" className="w-full">
            <Button className="w-full bg-white text-black" variant="outline">
              Sign Up
            </Button>
          </Link>

          <Link href="/dashboard" className="w-full">
            <Button className="w-full text-black" variant="ghost">
              Continue as Guest
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
