"use client";

import { WorkspaceDataType, workspaceSchema } from "@/lib/schema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { createNewWorkspace } from "@/app/actions/workspace";

const CreateWorkspaceForm = () => {
  const [pending, setPending] = useState(false);

  const form = useForm<WorkspaceDataType>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: WorkspaceDataType) => {
    try {
      //console.log("button clicked");

      setPending(true);
      await createNewWorkspace(data);
      toast.success("Workspace created successfully!");
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
          <CardTitle>Create new Workspaces </CardTitle>
          <CardDescription>
            Set up your workspace to collaborate with your team.
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
                    <FormLabel>Workspace Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="
                      Enter your workspace name
                      "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A short description about your workspace"
                        {...field}
                        className="resize-none"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-4 flex-row">
                <Button
                  type="button"
                  variant={"outline"}
                  className="mt-4 cursor-pointer"
                  disabled={pending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="mt-4 bg-gray-900 hover:bg-gray-700 text-white cursor-pointer "
                  disabled={pending}
                >
                  Create Workspace
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
export default CreateWorkspaceForm;
