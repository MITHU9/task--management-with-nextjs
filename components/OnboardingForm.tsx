"use client";

import { userSchema } from "@/lib/schema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface OnboardingFormProps {
  name: string;
  email: string;
  image: string;
}

type UserDataType = z.infer<typeof userSchema>;

const OnboardingForm = ({ name, email, image }: OnboardingFormProps) => {
  const [pending, setPending] = useState(false);

  const form = useForm<UserDataType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      about: "",
      name: name || "",
      email: email || "",
      image: image || "",
      country: "",
      industryType: "",
      password: "",
      role: "",
    },
  });

  const onSubmit = async (data: UserDataType) => {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to DailyTM </CardTitle>
          <CardDescription>
            Let&apos;s get started by setting up your profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}></form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
export default OnboardingForm;
