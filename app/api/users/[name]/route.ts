import { user } from "@/utils/model";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const userName = (await params).name;
  const { password } = await request.json();
  const pass = password;
  const cookieStore = await cookies();
  try {
    if (cookieStore.has("uName")) {
      return NextResponse.json(await user.findOne({ name: userName }), { status: 200 });
    }
    const foundUser = await user.findOne({ name: userName });
    if (!foundUser) {
      return new Response(
        JSON.stringify({ message: `Username ${userName} not found` }),
        { status: 404 }
      );
    } else if (foundUser.password != pass) {
      return NextResponse.json(
        {
          message: "wrong username or password entered, please try again",
        },
        { status: 401 }
      );
    }
    const { name, _id, profilePicUrl } = foundUser;
    const response = NextResponse.json(
      { _id, name, profilePicUrl },
      { status: 200 }
    );
    response.cookies.set("uName", name, {
      maxAge: 7 * 24 * 60 * 60,
      sameSite: "strict",
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: `${error}` },
      {
        status: 500,
      }
    );
  }
}
