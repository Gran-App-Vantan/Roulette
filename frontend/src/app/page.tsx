"use client";

import Image from "next/image";
import Timedswitch from "@/components/layouts/TimedSwitch";
import { RightMenu } from "@/components/layouts/RightMenu";

export default function Home(){
  return(
    <div className="flex flex-col justify-center items-top">
      <div className="flex justify-between items-center px-15">
        <Timedswitch />
        <div className="flex justify-center items-center w-[550px] h-[550px] bg-[url('/wheel/wheel-back.svg')] bg-no-repeat bg-center">
          <Image
            src="/wheel/wheel-main.svg"
            width={329}
            height={329}
            alt="wheel-main"
            className="animate-spin"
          />
        </div>
        <RightMenu />
      </div>
    </div>
  )
}