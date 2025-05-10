import { getUserByEmail } from "@/app/actions/auth/getUserByEmail";
import { ACCEPT_LANGUAGE_KEY } from "@/global";
import { getDictionary } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();
    const { user } = await getUserByEmail(email, true);
    const locale = req.headers.get(ACCEPT_LANGUAGE_KEY)!;
    const dictionary = await getDictionary(locale);
    if (!user) {
      throw new Error(dictionary.auth.alerts.user_not_found);
    }
    return NextResponse.json({
      message: {
        success: {
          title:
            dictionary.auth.alerts.the_account_has_been_verified_successfully,
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
            title: "Unexpected error during validate email.",
          },
        },
      },
      { status: 500 }
    );
  }
};
