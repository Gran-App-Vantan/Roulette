"use client";

import Image from "next/image";

interface User {
    id: number;
    name: string;
    icon: string;
}

export function LeftMenu({ isActive }: { isActive: boolean }) {
    const MAX_DISPLAY = 11;

    // 仮データ
    const users: User[] = Array.from({ length: 15 }).map((_, i) => ({
        id: i + 1,
        name: `ユーザー${i + 1}`,
        icon: "/img/yuma.png",
    }));

    const displayedUsers = users.slice(0, MAX_DISPLAY);
    const extraCount = users.length > MAX_DISPLAY ? users.length - MAX_DISPLAY : 0;

    return(
        <div>
            {isActive?(
                <div className="flex flex-col justify-start items-center w-[400px] h-screen py-6 gap-6 bg-black/70 border-5 border-gray-600 rounded-3xl text-white font-bold overflow-y-auto">
                    <p className="text-4xl font-bold">現在の参加者</p>

                    <ul className="flex flex-col justify-center items-start gap-5 text-xl">
                        {displayedUsers.map((user) => (
                        <li key={user.id} className="flex gap-2 items-center">
                            <Image
                            src={user.icon}
                            width={40}
                            height={40}
                            alt={`${user.name}のアイコン`}
                            className="rounded-full border-2 border-gray-600"
                            />
                            <p>{user.name}</p>
                        </li>
                        ))}
                    </ul>
                    {extraCount > 0 && <p className="text-lg">他 +{extraCount}</p>}
                </div>
            ):(
                <div className="flex flex-col justify-start pt-8 items-center w-[400px] h-90 gap-6 bg-black/70 border-5 border-gray-600 rounded-3xl text-2xl text-white font-bold">
                    <p className="text-2xl font-bold">こちらから参加できます</p>
                    <div className="flex flex-col justify-center items-center w-[220px] h-[220px] bg-white text-black">
                        qr
                    </div>
                </div>
            )}
        </div>
    )
}