"use client";

import { Plus, Minus } from "lucide-react";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

interface PlanItemProps {
  weekIdx: number;
  idx: number;
  title: string;
  summary: string;
  isOpen: boolean;
  isChecked: boolean;
  toggleCheck: () => void;
}

export function PlanItem({
  weekIdx,
  idx,
  title,
  summary,
  isOpen,
  isChecked,
  toggleCheck,
}: PlanItemProps) {
  const val = `week${weekIdx}-${idx}`;

  return (
    <AccordionItem value={val} className='overflow-hidden rounded-lg w-[677px]'>
      <div className='flex w-full'>
        <div className='flex items-center px-3'>
          <Checkbox
            checked={isChecked}
            onCheckedChange={toggleCheck}
            className='size-5 border-transparent data-[state=checked]:bg-[#488144] data-[state=unchecked]:bg-[#CACACA]'
          />
        </div>
        <div className='w-16 flex items-center justify-center bg-[#999999] text-white font-semibold text-xl rounded-l-2xl overflow-hidden'>
          {String(idx + 1).padStart(2, "0")}
        </div>
        <AccordionTrigger className='p-0 [&>svg]:hidden no-underline'>
          <div className='flex-1 flex items-center px-4 py-4 bg-white w-[500px] rounded-r-2xl'>
            <span className='font-medium text-base truncate'>{title}</span>
            {isOpen ? (
              <Minus className='ml-2 shrink-0 h-4 w-4' />
            ) : (
              <Plus className='ml-2 shrink-0 h-4 w-4' />
            )}
          </div>
        </AccordionTrigger>
      </div>
      <AccordionContent className='px-8 md:px-36 py-9 mt-2 rounded-2xl bg-gray-50 text-center text-[#767676] text-base text-pretty'>
        {summary}
      </AccordionContent>
    </AccordionItem>
  );
}
