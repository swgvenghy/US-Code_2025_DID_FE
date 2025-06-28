import { cn } from "../utils/style";

type ButtonProps = {
  variant: "primary" | "secondary" | "normal";
  size: "large" | "small";
  selected: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ variant, size, selected, children, ...props }: ButtonProps) {
  const baseStyle = "text-base font-pretendard rounded-xl w-full";

  const variantStyle = cn(
    variant === "primary" && !selected && "text-white font-bold bg-[#488143] ",
    variant === "primary" && selected && "bg-[#ACACAC]",
    variant === "secondary" && "text-[#767676] bg-[#E8EBEF] font-semibold",
    variant === "secondary" &&
      selected &&
      "border border-[#488143] bg-white text-[#488143]",
    variant === "normal" && "bg-[#F2F4F6] text-[#767676]"
  );

  const sizeStyle = cn(
    size === "large" && "w-[301px] h-[56px] text-center",
    size === "small" && "w-[95px] py-3 text-center"
  );

  const buttonStyles = cn(baseStyle, variantStyle, sizeStyle);

  return (
    <button className={buttonStyles} {...props}>
      {children}
    </button>
  );
}

export default Button;
