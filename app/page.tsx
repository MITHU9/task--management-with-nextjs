import { Button } from "@/components/ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <div className=" w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-center">
        Welcome to Daily Task management!
      </h1>
      <div className="mt-4 flex space-x-4">
        <Button className="bg-black text-white hover:bg-black/90" asChild>
          <RegisterLink>Get Started</RegisterLink>
        </Button>
        <Button asChild variant={"outline"}>
          <LoginLink>Sign in</LoginLink>
        </Button>
      </div>
    </div>
  );
}
