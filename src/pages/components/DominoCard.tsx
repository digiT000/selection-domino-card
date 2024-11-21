interface DominoCardItemProps {
  number_1: number;
  number_2: number;
}

function DominoCard({ number_1, number_2 }: DominoCardItemProps) {
  return (
    <div className="flex flex-col gap-4 p-2 border border-zinc-500 rounded-md">
      <p className="text-center">{number_1}</p>
      <div className="h-[1] w-fll border-t border-t-black"></div>
      <p className="text-center text-gray-900">{number_2}</p>
    </div>
  );
}

export default DominoCard;
