"use client";

import Image from "next/image";

export function LeftMenu({ isActive }: { isActive: boolean }) {
    return(
        <div>
            {isActive?(
                <div className="flex flex-col justify-top items-center w-80 h-79 p-2 gap-4 bg-black/70 border-5 border-gray-600 rounded-3xl text-2xl text-white font-bold">
                    <p>BET</p>
                    <div className="flex justify-center items-center gap-2">
                        <Image
                            src="/coin/coin1.svg"
                            width={60}
                            height={60}
                            alt="coin1"
                        />
                        <Image
                            src="/coin/coin5.svg"
                            width={60}
                            height={60}
                            alt="coin2"
                        />
                        <Image
                            src="/coin/coin10.svg"
                            width={60}
                            height={60}
                            alt="coin3"
                        />
                        <Image
                            src="/coin/coin25.svg"
                            width={60}
                            height={60}
                            alt="coin4"
                        />
                    </div>
                    <ul className="flex flex-col justify-center items-start gap-4 text-xl">
                        <li>
                            <p>0-11-13-14/100pt</p>
                        </li>
                        <li>
                            <p>13-14/500pt</p>
                        </li>
                        <li>
                            <p>19-36/2500pt</p>
                        </li>
                    </ul>
                </div>
            ):(
                <div className="flex flex-col justify-center items-center w-80 h-79 gap-8 bg-black/70 border-5 border-gray-600 rounded-3xl text-2xl text-white font-bold">
                    <p className="text-2xl font-bold">こちらから参加できます</p>
                    <div className="flex flex-col justify-center items-center w-[172px] h-[172px] bg-white text-black">
                        qr
                    </div>
                </div>
            )}
        </div>
    )
}