"use client";

import { UserDataType, userSchema } from "@/lib/schema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { countryList } from "@/utils/countryList";
import { industryTypesList, roleList } from "@/utils";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { createUser } from "@/app/actions/user";

interface OnboardingFormProps {
  name: string;
  email: string;
  image: string;
}

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
      role: "",
    },
  });

  const onSubmit = async (data: UserDataType) => {
    try {
      //console.log("button clicked");

      setPending(true);
      await createUser(data);
      toast.success("Profile created successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 ">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to DailyTM </CardTitle>
          <CardDescription>
            Let&apos;s get started by setting up your profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        {countryList.map((country) => (
                          <SelectItem key={country.code} value={country.name}>
                            <div className="flex flex-row items-center">
                              <img
                                src={country.flag}
                                alt={country.name}
                                className="w-4 h-3"
                              />
                              <p className="pl-2">{country.name}</p>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="industryType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select an industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white">
                          {industryTypesList.map((industry) => (
                            <SelectItem key={industry} value={industry}>
                              <p className="pl-2">{industry}</p>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role at Organization</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white">
                          {roleList.map((role) => (
                            <SelectItem key={role} value={role}>
                              <p className="pl-2">{role}</p>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about yourself"
                        {...field}
                        className="resize-none"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="mt-4 bg-gray-900 hover:bg-gray-700 text-white cursor-pointer w-full"
                disabled={pending}
              >
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
export default OnboardingForm;
