"use client";

import Image from "next/image";
import Timedswitch from "@/components/layouts/TimedSwitch";

export default function Home(){
  return(
    <div className="relative flex flex-col justify-center items-center w-full h-screen">
        <Timedswitch />
    </div>
  )
}