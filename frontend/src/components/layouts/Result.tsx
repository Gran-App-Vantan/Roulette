type UserRank = {
    names: string;
    points: number;
};

type ResultProps = {
    resultValue: number | null;
};

type ResultItemProps = {
    resultValue: number | null;
};

export function Result({ resultValue }: ResultProps) {
    const ranking: UserRank[] = [
        { names: "UserA", points: 1000000 },
        { names: "UserB", points: 10000 },
        { names: "UserC", points: 1000 },
    ];

    return (
        <div className="flex flex-col justify-center items-center gap-4 bg-black/80 w-full h-screen  z-50">
            <div className="flex flex-col justify-center items-center gap-1 w-[309px] h-[309px] bg-[url('/img/result.svg')] bg-no-repeat">
                <h1 className="text-3xl font-bold text-gold">当たり</h1>
                <p className="text-9xl font-bold">{resultValue}</p>
            </div>

            <ul className="flex flex-col justify-center items-center gap-8 bg-gray-500/40 w-[672px] h-82 border-5 border-black/40 rounded-3xl text-4xl font-black">
                {ranking.map((user, index) => (
                <li key={index} className="flex w-[540px] pb-4 border-b border-white border-dashed">
                    <p className={`w-16 ${index === 0 ? "text-gold" : ""}`}>{index + 1}位</p>
                    <p className="flex-1 text-center">{user.names}</p>
                    <p className="flex justify-end flex-1">{user.points.toLocaleString()}pt</p>
                </li>
                ))}
            </ul>
        </div>
    );
}
