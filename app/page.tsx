import { Typography } from "@mui/material";
import StatusContainer from "./Components/StatusContainer";
import ChatContainer from "./Components/ChatContainer";
import { FilterList } from "@mui/icons-material";

export default function Home() {
  return (
    <section className="my-2 mx-5">
      <StatusContainer />
      <div className="flex flex-row items-center justify-between pt-6 sm:w-full md:w-1/3 lg:w-1/4">
        <Typography variant="h5" className="font-extrabold">
          Chats
        </Typography>

        <FilterList />
      </div>
      <ChatContainer />
    </section>
  );
}
