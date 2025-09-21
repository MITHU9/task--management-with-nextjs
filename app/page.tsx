import { Button } from "@/components/ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();

  return (
    <div className=" w-full h-screen flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <p>Your personal workspace</p>
            <p className="text-5xl md:text-6xl">
              for <span className="text-blue-600">better productivity</span>
            </p>
          </h1>
          <p className="mt-6 text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Manage your tasks, projects, and teams all in one place with our
            intuitive and powerful task management app.
          </p>
          <div className="flex justify-center items-center gap-4 mt-6">
            {isLoggedIn ? (
              <>
                <Button className="bg-black hover:bg-gray-800 text-white">
                  <Link href="/workspace">Go to Workspace</Link>
                </Button>
              </>
            ) : (
              <>
                <Button className="bg-black hover:bg-gray-800 text-white">
                  <RegisterLink>Get Started</RegisterLink>
                </Button>

                <Button variant="outline" className="ml-4">
                  <LoginLink>Login</LoginLink>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
