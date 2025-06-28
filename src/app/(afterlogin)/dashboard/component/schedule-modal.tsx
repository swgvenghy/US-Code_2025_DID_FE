"use client";

import { useGetPlan } from "@/app/store/querys/ai";
import { useWriteBlogStore } from "@/app/store/store/write-blog.store";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

interface ScheduleModalProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

export function ScheduleModal({ open, onOpenChange }: ScheduleModalProps) {
  const [clickedIndex, setClickedIndex] = useState<number | undefined>();
  const { data: plans, error, isLoading } = useGetPlan();

  const { reset, setTopic, setItems, setTitle, setContent } =
    useWriteBlogStore();

  if (error) return <div>새로고침해 주세요</div>;
  if (isLoading || !plans) return <div>로딩중…</div>;

  const handleSelect = (i: number) => {
    setClickedIndex(i);
  };

  const handleLoad = () => {
    if (clickedIndex === undefined) return;

    const plan = plans[clickedIndex];

    reset();

    setTopic(plan.contentsType);
    setItems([plan.item]);
    setTitle(plan.title);
    setContent(plan.summary);

    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) setClickedIndex(undefined);
      }}
    >
      <DialogContent className='w-[474px] p-10'>
        <DialogHeader>
          <DialogTitle className='text-[28px] font-bold'>
            저장된 계획
          </DialogTitle>
        </DialogHeader>

        <div className='mt-6 flex flex-col gap-1'>
          {plans.length > 0 ? (
            <div className='w-full rounded-lg p-5 text-center font-semibold text-base text-[#2B6DDF] border border-[#DCE1E6]'>
              {plans[0].contentsTitle}
            </div>
          ) : (
            <div className='w-full rounded-lg p-5 text-center text-sm text-[#767676] border border-[#DCE1E6]'>
              불러올 계획이 없습니다
            </div>
          )}

          {plans.map((v, i) => (
            <div
              key={`${v.title}-${i}`}
              onClick={() => handleSelect(i)}
              className={`w-full rounded-lg text-center p-3 text-base font-medium cursor-pointer ${
                clickedIndex === i
                  ? "bg-white border border-[#217011]"
                  : "bg-[#F2F4F6] text-[#111111]"
              }`}
            >
              {v.title}
            </div>
          ))}
        </div>

        <DialogFooter className='mt-8 flex gap-4'>
          <DialogClose asChild>
            <button className='rounded-xl py-3 px-9 w-[121px] text-[#767676] bg-[#F2F4F6]'>
              취소
            </button>
          </DialogClose>
          <button
            onClick={handleLoad}
            disabled={clickedIndex === undefined}
            className={`font-bold rounded-xl px-2 py-2 w-[256px] ${
              clickedIndex !== undefined
                ? "bg-[#217011] text-white"
                : "bg-[#D1D5DB] text-[#9CA3AF] cursor-not-allowed"
            }`}
          >
            불러오기
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
