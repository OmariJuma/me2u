"use client";
import { Typography } from "@mui/material";
import StatusContainer from "./Components/StatusContainer";
import ChatContainer from "./Components/ChatContainer";
import { FilterList } from "@mui/icons-material";
import { useEffect, useState } from "react";

export default function Home() {
  const [isSmall, setIsSmall] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSmall(true);
      } else {
        setIsSmall(false);
      }
    };
    window.addEventListener("resize", handleResize);

    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <section className="my-2 mx-5">
      <StatusContainer />
      <div className="flex flex-row items-center justify-between pt-6 sm:w-full md:w-1/3 lg:w-1/4">
        <Typography variant="h5" className="font-extrabold">
          Chats
        </Typography>

        <FilterList />
      </div>
      <div className={`${!isSmall && "flex flex-row gap-3"}`}>
        <ChatContainer />
        {!isSmall && (
          <div className="md:w-2/3 lg:w-3/4">
            <div>
              Minim nulla commodo laborum enim velit eu. Deserunt officia
              ullamco consectetur laborum sit. Voluptate qui minim quis ut sit
              ut dolor qui laboris exercitation qui dolor. Fugiat ut velit
              mollit et. Aute excepteur officia consequat quis veniam elit est
              officia sint aliqua. Laborum nostrud voluptate ex tempor aliqua do
              ullamco. Voluptate qui deserunt magna deserunt elit aliquip dolor.
              Aute minim eu consequat voluptate laborum et sit esse ut duis
              eiusmod. Ipsum aliqua elit minim qui incididunt sit. Pariatur nisi
              occaecat commodo voluptate reprehenderit ea incididunt nulla
              irure. Voluptate Lorem labore aliqua irure do laborum fugiat
              excepteur ea ad. Minim anim id adipisicing nulla ullamco sit
              reprehenderit incididunt qui amet minim duis irure. Elit
              consectetur reprehenderit eu non qui sunt officia anim ea duis
              nisi voluptate mollit consectetur. Aliqua sint excepteur quis
              adipisicing et pariatur enim deserunt minim culpa sit proident ea
              consequat. Quis nisi voluptate enim in sit officia minim id. Eu
              magna magna elit deserunt ad voluptate occaecat in aliqua ea
              occaecat eiusmod dolor exercitation. Amet anim enim do duis
              laboris deserunt ex. Id deserunt ipsum cillum Lorem labore in
              dolor aliquip pariatur. Duis magna minim commodo esse mollit.
              Minim minim occaecat enim velit fugiat consectetur amet non magna
              cupidatat deserunt reprehenderit labore ex. Magna quis non aute
              incididunt non est eiusmod sint excepteur mollit. Anim commodo
              commodo incididunt nostrud culpa consectetur in excepteur fugiat
              amet.
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
