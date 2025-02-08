import { Typography } from "@mui/material";
import StatusContainer from "./Components/StatusContainer";
import { FilterList } from "@mui/icons-material";
import ChatContainer from "./Components/ChatContainer";
import ChatMessages from "./Components/ChatMessages";
import { useIsVisibleStore } from "@/utils/store";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import HomePage from "./Components/HomePage";

export default async function Page() {
  const myCookies = await cookies();
  const userName = myCookies.get("uName");

  if(!userName) {
    return redirect("/login");
  }
  return <HomePage />;
}
