"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { usePlanStore } from "@/app/store/store/plan.store";
import { alarmPatchProfile } from "@/app/store/querys/intro";
import { useRouter } from "next/navigation";

const freqOptions = [
  { label: "초보자/ 삼일에 한번", value: "3d", recommended: false },
  { label: "중수/ 이틀에 한번", value: "2d", recommended: true },
  { label: "고수/ 하루 한개", value: "1d", recommended: false },
] as const;

const freqMap = {
  "3d": "THIRD",
  "2d": "TWICE",
  "1d": "ONCE",
} as const;

interface PlanSaveFlowModalProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  planTitles: string[];
  onComplete?: (payload: {
    frequency: string;
    hour: number;
    minute: number;
  }) => Promise<void>;
}

export function PlanSaveFlowModal({
  open,
  onOpenChange,
  planTitles,
  onComplete,
}: PlanSaveFlowModalProps) {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [frequency, setFrequency] =
    useState<(typeof freqOptions)[number]["value"]>("3d");
  const [hour, setHour] = useState(7);
  const [minute, setMinute] = useState(0);
  const contentsTitle = usePlanStore((s) => s.contentsTitle);
  const confirmFreq = () => setPage(2);

  const confirmTime = async () => {
    try {
      await alarmPatchProfile({
        alarmFrequency: freqMap[frequency],
        alramTime: `${String(hour).padStart(2, "0")}:${String(minute).padStart(
          2,
          "0"
        )}:00`,
        introStatus: false,
      });

      if (onComplete) {
        await onComplete({ frequency, hour, minute });
      }

      onOpenChange(false);
      setPage(0);
      router.push("/dashboard/NAVER_BLOG");
    } catch (e) {
      console.error(e);
    }
  };

  const minuteArr = Array.from({ length: 60 }, (_, i) => i);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => (onOpenChange(o), o || setPage(0))}
    >
      <DialogContent className='w-[460px] p-8'>
        {page === 0 && (
          <>
            <DialogHeader>
              <DialogTitle className='text-2xl font-bold'>저장완료</DialogTitle>
              <DialogDescription className='mt-1 text-base'>
                블로그 한달 포스팅 계획을 저장했어요
              </DialogDescription>
            </DialogHeader>

            <div className='mt-6 space-y-2 max-h-60 overflow-y-auto'>
              <div className='w-full p-3 rounded-lg border border-[#DCE1E6] text-center text-[#2B6DDF] text-base'>
                {contentsTitle}
              </div>
              {planTitles.map((t) => (
                <div
                  key={t}
                  className='w-full rounded-lg bg-[#F2F4F6] text-center p-3 text-base text-[#111111] font-medium'
                >
                  {t}
                </div>
              ))}
            </div>

            <DialogFooter className='mt-8 flex gap-4'>
              <DialogClose asChild>
                <button className='rounded-xl py-3 px-9 w-[121px] text-[#767676] bg-[#F2F4F6]'>
                  홈으로
                </button>
              </DialogClose>

              <button
                className='font-bold rounded-xl px-2 py-2 w-[256px] bg-[#217011] text-white'
                onClick={() => setPage(1)}
              >
                알림받기
              </button>
            </DialogFooter>
          </>
        )}

        {page === 1 && (
          <>
            <DialogHeader>
              <DialogTitle className='text-2xl font-bold'>
                🔔 까먹지 않게 알림 드려요!
              </DialogTitle>
              <DialogDescription className='mt-1 text-base'>
                포스팅을 까먹지 않게 카카오톡 알림을 드릴게요
              </DialogDescription>
            </DialogHeader>

            <div className='mt-6 space-y-2'>
              {freqOptions.map((o) => (
                <button
                  key={o.value}
                  onClick={() => setFrequency(o.value)}
                  className={`w-full p-3 rounded-lg text-base font-semibold flex items-center justify-center relative
                    ${
                      frequency === o.value
                        ? "border border-[#217011] text-[#217011] bg-white"
                        : "bg-[#F2F4F6] text-[#111111]"
                    }`}
                >
                  <span>{o.label}</span>

                  {o.recommended && (
                    <span className='absolute right-3 px-3 py-1 text-base rounded-full bg-[#FFF1E9] border border-[#FF542D] text-[#FF542D]'>
                      글릭 추천
                    </span>
                  )}
                </button>
              ))}
            </div>

            <DialogFooter className='mt-8 flex gap-4'>
              <DialogClose asChild>
                <button className='rounded-xl py-3 px-9 w-[121px] text-[#767676] bg-[#F2F4F6]'>
                  취소
                </button>
              </DialogClose>
              <button
                className='font-bold rounded-xl px-2 py-2 w-[256px] bg-[#217011] text-white'
                onClick={confirmFreq}
              >
                시간 선택
              </button>
            </DialogFooter>
          </>
        )}

        {page === 2 && (
          <>
            <DialogHeader>
              <DialogTitle className='text-2xl font-bold'>
                ⏳ 알림받을 시간을 선택해주세요
              </DialogTitle>
              <DialogDescription className='mt-1 text-base'>
                오전 7시~9시 사이 업로드를 가장 추천해요!
              </DialogDescription>
            </DialogHeader>

            <div className='mt-6 flex justify-center gap-4'>
              <select
                value={hour}
                onChange={(e) => setHour(Number(e.target.value))}
                className='w-24 h-12 rounded-lg bg-[#F3F5F7] text-center text-lg font-medium'
              >
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={i}>
                    {String(i).padStart(2, "0")}
                  </option>
                ))}
              </select>

              <select
                value={minute}
                onChange={(e) => setMinute(Number(e.target.value))}
                className='w-24 h-12 rounded-lg bg-[#F3F5F7] text-center text-lg font-medium'
              >
                {minuteArr.map((m) => (
                  <option key={m} value={m}>
                    {String(m).padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>

            <DialogFooter className='mt-8 flex gap-4'>
              <DialogClose asChild>
                <button className='rounded-xl w-[121px] py-3 px-9 text-[#767676] bg-[#F2F4F6]'>
                  취소
                </button>
              </DialogClose>
              <button
                className='font-bold rounded-xl px-2 py-2 w-[256px] bg-[#217011] text-white'
                onClick={confirmTime}
              >
                알림 설정
              </button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
