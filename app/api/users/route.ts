import { imageLinks } from "@/utils/imageLinks";
import { user } from "@/utils/model";

export async function POST(request: Request) {
  const { name, password } = await request.json();

  const newUser = new user({
    name,
    password,
    profilePicUrl: imageLinks[Math.floor(Math.random() * imageLinks.length)],
  });
  try {
    await newUser.save();

    return new Response(
      JSON.stringify({ message: "User created successfully" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error }), { status: 500 });
  }
}

export async function GET() {
  const users = await user.find();
  if (!users || users.length === 0) {
    return new Response(JSON.stringify({ message: "No users found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify(users), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
