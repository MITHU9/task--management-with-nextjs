import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className=" w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-center">
        Welcome to Daily Task management!
      </h1>
      <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">
        Get Started
      </Button>
    </div>
  );
}
