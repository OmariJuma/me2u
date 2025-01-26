import Image from "next/image";
import { Typography } from "@mui/material";

interface statusProps{
  name: string,
  link: string
}
const Status: React.FC<statusProps>=({name, link})=> {
  return (
    <div className="flex content-center justify-center flex-col">
      <Image
        width={60}
        height={60}
        src={link}
        alt={name}
        className="rounded-full"
      />
      <Typography variant="body1" className="text-center">
        {name}
      </Typography>
    </div>
  );
}

export default Status;
