"use server";

import { UserDataType, userSchema } from "@/lib/schema";
import { userRequired } from "../data/user/is-user-authenticated";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const createUser = async (data: UserDataType) => {
  const { user } = await userRequired();

  const validateData = userSchema.parse(data);

  const userData = await db.user.create({
    data: {
      id: user?.id as string,
      email: user?.email as string,
      name: validateData.name,
      about: validateData.about,
      country: validateData.country,
      industryType: validateData.industryType,
      role: validateData.role,
      image: validateData.image || "",
      onboardingCompleted: true,
      subscription: {
        create: {
          plan: "FREE",
          status: "ACTIVE",
          currentPeriodEnd: new Date(),
          cancelAtPeriodEnd: false,
        },
      },
    },

    select: {
      id: true,
      email: true,
      name: true,
      workspaces: true,
    },
  });

  //TODO: send user welcome email

  if (userData.workspaces.length === 0) {
    redirect("/create-workspace");
  }
  redirect("/workspace");
};
