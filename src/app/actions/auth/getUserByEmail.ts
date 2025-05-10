import { prisma } from "@/auth";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
export const getUserByEmail = async (email: string, omitPassword = false) => {
  try {
    if (!email) {
      throw new Error("The entered email is invalid.");
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        accounts: true,
      },
      omit: {
        password: omitPassword,
      },
    });
    const payload = { id: user?.id, email: user?.email };
    const access_token = await jwt.sign(
      payload,
      process.env.JWT_SECRET as string
    );
    return {
      user: user,
      access_token: `Bearer ${access_token}`,
    };
  } catch (error) {
    if (error instanceof Error) {
      NextResponse.json(
        {
          messages: { error: error.message },
        },
        { status: 500 }
      );
      throw new Error(error.message);
    }
    throw new Error("Error in getUserByEmail");
  }
};
