import { WorkspaceDataType, workspaceSchema } from "@/lib/schema";
import { userRequired } from "../data/user/is-user-authenticated";
import { db } from "@/lib/db";
import { generateInviteCode } from "@/utils/get-invite-code";

export const createNewWorkspace = async (data: WorkspaceDataType) => {
  try {
    const { user } = await userRequired();

    const validatedData = workspaceSchema.parse(data);

    const res = await db.workspace.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        ownerId: user?.id as string,
        inviteCode: generateInviteCode(),
        members: {
          create: {
            userId: user?.id as string,
            accessLevel: "OWNER",
          },
        },
      },
    });

    // redirect(`/workspace/${res.id}`)
    return { data: res };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "An error occurred while creating the workspace",
    };
  }
};
