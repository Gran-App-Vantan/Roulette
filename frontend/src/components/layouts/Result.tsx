import Image from "next/image";

export  function Result() {
    return(
        <div className="flex flex-col justify-center items-center gap-4 bg-black/60 w-full h-screen">
            <div className="flex flex-col justify-center items-center gap-1  w-[309px] h-[309px] bg-[url('/img/result.svg')] bg-no-repeat">
                <h1 className="text-3xl font-bold text-gold">当たり</h1>
                <p className="text-9xl font-bold">11</p>
            </div>
            <ul className="flex flex-col justify-center items-center gap-8 bg-gray-500/40 w-[672px] h-82 border-5 border-gray-900 rounded-3xl text-4xl font-black">
                <li className="flex w-[540px] pb-4 border-b border-white border-dashed">
                    <p className="w-16 text-gold">1位</p>
                    <p className="flex-1 text-center">UserName</p>
                    <p className="flex justify-end flex-1">1,000,000pt</p>
                </li>
                <li className="flex w-[540px] pb-4 border-b border-white border-dashed">
                    <p className="w-16">2位</p>
                    <p className="flex-1 text-center">UserName</p>
                    <p className="flex justify-end flex-1">10,000pt</p>
                </li>
                <li className="flex w-[540px] pb-4 border-b border-white border-dashed">
                    <p className="w-16">3位</p>
                    <p className="flex-1 text-center">UserName</p>
                    <p className="flex justify-end flex-1">1,000pt</p>
                </li>
            </ul>

        </div>
    )
}