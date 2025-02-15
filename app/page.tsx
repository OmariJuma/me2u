import StatusContainer from "./Components/StatusContainer";
import { FilterList } from "@mui/icons-material";
import ChatContainer from "./Components/ChatContainer";
import ChatMessages from "./Components/ChatMessages";
import { useIsVisibleStore, useUserStore } from "@/utils/store";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import HomePage from "./Components/HomePage";
import SearchIcon from "@mui/icons-material/Search";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";

export default async function Page() {
  const myCookies = await cookies();
  const userName = myCookies.get("uName");

  const currentUser = myCookies.get("id");
  if (!userName || !currentUser) {
    return redirect("/login");
  }
  return (
    <>
      
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            className="flex flex-row justify-between sm:w-full md:w-1/3 lg:w-1/4"
          >
            <Typography
              variant="h4"
              component={"a"}
              className="ml-2 text-md"
              href="#"
            >
              Me2u
            </Typography>

            <SearchIcon color="primary" fontSize="large" />
          </Toolbar>
        </Container>
      
      <HomePage userId={currentUser} userName={userName}/>
    </>
  );
}
