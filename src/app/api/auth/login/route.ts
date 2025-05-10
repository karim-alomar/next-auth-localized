import { getUserByEmail } from "@/app/actions/auth/getUserByEmail";
import { ACCEPT_LANGUAGE_KEY } from "@/global";
import { getDictionary } from "@/utils";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();
    const locale = req.headers.get(ACCEPT_LANGUAGE_KEY)!;
    const dictionary = await getDictionary(locale);
    if (!email || !password) {
      throw new Error(dictionary.auth.alerts.email_and_password_are_required);
    }
    const { user, access_token } = await getUserByEmail(email);
    if (!user || !user.password) {
      throw new Error(dictionary.auth.alerts.invalid_credentials);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error(dictionary.auth.alerts.invalid_password);
    }
    return NextResponse.json({
      access_token,
      message: {
        success: {
          title: dictionary.auth.alerts.success_login,
          description: dictionary.auth.alerts.success_login_description,
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
            title: "Unexpected error during login.",
          },
        },
      },
      { status: 500 }
    );
  }
};
