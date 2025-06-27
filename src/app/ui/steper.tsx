import { cn } from "../utils/style";

type SteperProps = {
  totalStep: number;
  currentStep: number;
};

function Steper({ totalStep, currentStep }: SteperProps) {
  const stepArr: boolean[] = Array.from(
    { length: totalStep },
    (_, i) => i < currentStep
  );
  return (
    <div className='flex gap-0.5 mb-20 '>
      {stepArr.map((v, i) => {
        return <SteperItem current={v} key={i} />;
      })}
    </div>
  );
}

type SteperItemProps = {
  current: boolean;
};

function SteperItem({ current }: SteperItemProps) {
  console.log("item Step: ", current);
  return (
    <div
      className={cn(
        "w-16 rounded-full h-2",
        current ? "bg-[#9D9D9D]" : "bg-[#DDDFE1]"
      )}
    ></div>
  );
}

export default Steper;
