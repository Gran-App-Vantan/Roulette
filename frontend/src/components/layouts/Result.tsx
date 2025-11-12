type UserRank = {
    name: string;
    points: number;
};

export function Result() {
    const ranking: UserRank[] = [
        { name: "UserA", points: 1000000 },
        { name: "UserB", points: 10000 },
        { name: "UserC", points: 1000 },
    ];

    return (
        <div className="flex flex-col justify-center items-center gap-4 bg-black/60 w-full h-screen">
            <div className="flex flex-col justify-center items-center gap-1 w-[309px] h-[309px] bg-[url('/img/result.svg')] bg-no-repeat">
                <h1 className="text-3xl font-bold text-gold">当たり</h1>
                <p className="text-9xl font-bold">11</p>
            </div>

            <ul className="flex flex-col justify-center items-center gap-8 bg-gray-500/40 w-[672px] h-82 border-5 border-black/40 rounded-3xl text-4xl font-black">
                {ranking.map((user, index) => (
                <li key={index} className="flex w-[540px] pb-4 border-b border-white border-dashed">
                    <p className={`w-16 ${index === 0 ? "text-gold" : ""}`}>{index + 1}位</p>
                    <p className="flex-1 text-center">{user.name}</p>
                    <p className="flex justify-end flex-1">{user.points.toLocaleString()}pt</p>
                </li>
                ))}
            </ul>
        </div>
    );
}
