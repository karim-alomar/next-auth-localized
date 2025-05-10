import { getUserByEmail } from "@/app/actions/auth/getUserByEmail";
import { prisma } from "@/auth";
import { ACCEPT_LANGUAGE_KEY } from "@/global";
import { getDictionary } from "@/utils";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
export const POST = async (req: NextRequest) => {
  try {
    const { email, password, name } = await req.json();
    const locale = req.headers.get(ACCEPT_LANGUAGE_KEY)!;
    const dictionary = await getDictionary(locale);
    const user = await getUserByEmail(email);
    if (user.user) {
      throw new Error(dictionary.auth.alerts.user_already_exists);
    }
    const hashPassword = await bcrypt.hash(password, 8);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    return NextResponse.json({
      message: {
        success: {
          title: dictionary.auth.alerts.success_register,
          description: dictionary.auth.alerts.success_register_description,
        },
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: {
            error: { title: error.message },
          },
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        message: {
          error: {
            title: "Unexpected error during register.",
          },
        },
      },
      { status: 500 }
    );
  }
};
