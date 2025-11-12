"use client";

import Image from "next/image";
import { LeftMenu } from "@/components/layouts/LeftMenu";
import { RightMenu } from "@/components/layouts/RightMenu";

export default function Home(){
  return(
    <div className="flex flex-col justify-center items-top">
      <div className="flex justify-between items-center px-15">
        <LeftMenu />
        <div className="flex justify-center items-center w-[550px] h-[550px] bg-[url('/wheel/wheel-back.svg')]">
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