"use client";

import Image from "next/image";

export default function Home(){
  return(
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center w-[470px] h-[470px] bg-[url('/wheel/wheel-back.svg')]">
        <Image
          src="/wheel/wheel-main.svg"
          width={279}
          height={279}
          alt="wheel-main"
        />
      </div>
    </div>
  )
}