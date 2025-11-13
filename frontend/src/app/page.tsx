"use client";

import Image from "next/image";
import Timedswitch from "@/components/layouts/TimedSwitch";
import { RightMenu } from "@/components/layouts/RightMenu";

export default function Home(){
  return(
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="flex justify-center items-center gap-50">
        <Timedswitch />
        <div className="flex justify-center items-center w-[750px] h-[750px] bg-[url('/wheel/wheel-back.svg')] bg-no-repeat bg-center">
          <Image
            src="/wheel/wheel-main.svg"
            width={429}
            height={429}
            alt="wheel-main"
          />
        </div>
      </div>
    </div>
  )
}