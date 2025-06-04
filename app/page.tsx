import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 ">
        <h1>this is landing page </h1>
        <Link href="/home">
          <Button
            variant="default"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 ease-in-out px-6 py-3 text-base font-semibold rounded-2xl flex items-center gap-2"
          >
            Home
          </Button>
        </Link>
      </div>
    </>
  );
}
