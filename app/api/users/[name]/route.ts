import { user } from "@/utils/model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const userName = (await params).name;
  const { password } = await request.json();
  const pass = password;
  try {
    const foundUser = await user.findOne({ name: userName });
    if (!foundUser) {
      return new Response(
        JSON.stringify({ message: `Username ${userName} not found` }),
        { status: 404 }
      );
    } else if (foundUser.password != pass) {
      return new Response(
        JSON.stringify({
          message: "wrong username or password entered, please try again",
        }),
        { status: 401 }
      );
    }
    const { name, _id, profilePicUrl, password } = foundUser;
    return new Response(
      JSON.stringify({ _id, name, profilePicUrl, password }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: `${error}` }), {
      status: 500,
    });
  }
}
