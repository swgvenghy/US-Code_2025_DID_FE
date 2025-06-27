import { cn } from "@/app/utils/style";
import { Platform } from "./sidebar";
import Image from "next/image";

type SideBarButtonProps = {
  isSelected: boolean;
  koreanName: string;
  platform: Platform;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function SidebarButton({
  isSelected,
  platform,
  koreanName,
  ...props
}: SideBarButtonProps) {
  const baseStyle =
    "rounded-lg p-4 font-pretendard font-bold text-base flex items-center gap-1";
  const selectedStyle = isSelected
    ? "text-white bg-[#434343]"
    : "bg-[#F2F4F6] text-[#A7A7A7]";

  const sidebarButtonStyle = cn(baseStyle, selectedStyle);
  return (
    <button className={sidebarButtonStyle} {...props}>
      <Image
        width={32}
        height={32}
        className='w-10 h-10'
        src={`/images/${platform}-icon.png`}
        alt={`${platform}아이콘 로고`}
      />
      <div>{koreanName}</div>
    </button>
  );
}
