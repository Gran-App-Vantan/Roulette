export function RightMenu() {

  const hotNumbers = [3, 17, 21, 5];
  const coldNumbers = [2, 0, 28, 8];

  const getNumberColor = (num: number) => {
    if (num === 0) return "bg-green-600 text-white";
    if (num % 2 === 1) return "bg-red-600 text-white";
    return "bg-white text-black";
  };

  const NumberCircle = ({ num }: { num: number }) => (
    <div className="flex flex-col justify-start items-center w-12 h-20 border border-gray-600 rounded-full">
      <p
        className={`flex justify-center items-center w-11 h-11 rounded-full text-xl font-bold ${getNumberColor(
          num
        )}`}
      >
        {num}
      </p>
      <p className="text-xl font-bold">{num}</p>
    </div>
  );

  return (
    <div className="flex flex-col justify-center items-center w-80 h-79 bg-black/70 border-5 border-gray-600 rounded-3xl gap-8">

      <div className="flex flex-col justify-center items-center gap-4">
        <p className="text-xl font-bold">HOT NUMBERS</p>
        <div className="flex justify-center items-center gap-4">
          {hotNumbers.map((num, idx) => (
            <NumberCircle key={idx} num={num} />
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-4">
        <p className="text-xl font-bold">COLD NUMBERS</p>
        <div className="flex justify-center items-center gap-4">
          {coldNumbers.map((num, idx) => (
            <NumberCircle key={idx} num={num} />
          ))}
        </div>
      </div>
    </div>
  );
}
