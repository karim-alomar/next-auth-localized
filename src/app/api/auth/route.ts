import { auth } from "@/auth";
import { ACCEPT_LANGUAGE_KEY } from "@/global";
import { getDictionary } from "@/utils/getDictionary";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const session = await auth();
    const locale = req.headers.get(ACCEPT_LANGUAGE_KEY)!;
    const dictionary = await getDictionary(locale);
    if (!session) {
      throw new Error(dictionary.auth.alerts.user_not_found);
    }
    return NextResponse.json({
      data: session.user,
      message: {
        success: {
          title: dictionary.auth.alerts.success_login,
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
          error: { title: "Error in auth route" },
        },
      },
      { status: 500 }
    );
  }
};
