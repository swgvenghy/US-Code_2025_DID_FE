"use client";

import * as React from "react";
import { Accordion } from "@/components/ui/accordion";
import { usePlanStore } from "@/app/store/store/plan.store";
import { PlanItem } from "./plan-item";
import { PlanSaveFlowModal } from "./plan-save-flow-modal";
import {
  postPlanSaveFetch,
  type PlansResItemType,
  type PostPlanSavePayload,
} from "@/app/store/querys/ai";

interface PlanBoardProps {
  checkedList: number[];
  onToggle: (index: number) => void;
}

export function PlanBoard({ checkedList, onToggle }: PlanBoardProps) {
  const contentsTitle = usePlanStore((s) => s.contentsTitle);

  const plans = usePlanStore((s) => s.plans);
  const basePayload = usePlanStore((s) => s.payload);
  const reset = usePlanStore((s) => s.reset);
  const weekChunks = React.useMemo(() => {
    const chunks: { plan: PlansResItemType; index: number }[][] = [
      [],
      [],
      [],
      [],
    ];
    plans.forEach((plan, idx) => chunks[idx % 4].push({ plan, index: idx }));
    return chunks;
  }, [plans]);

  const [openByWeek, setOpenByWeek] = React.useState<
    Record<number, string | undefined>
  >({});
  const [saveOpen, setSaveOpen] = React.useState(false);

  const done = React.useMemo(() => {
    const m: Record<number, boolean> = {};
    checkedList.forEach((i) => (m[i] = true));
    return m;
  }, [checkedList]);

  const planTitles = React.useMemo(
    () =>
      checkedList.map((i) => plans[i]?.title).filter((v): v is string => !!v),
    [checkedList, plans]
  );

  const handleSavePlans = async () => {
    if (!basePayload) {
      alert("먼저 ‘한 달 계획 만들기’를 진행해 주세요.");
      return;
    }
    if (!contentsTitle) {
      alert("콘셉트 제목이 없습니다.");
      return;
    }
    if (checkedList.length === 0) {
      alert("저장할 글을 선택해 주세요.");
      return;
    }

    const selectedPlans = checkedList.map((i) => plans[i]);

    const arg: PostPlanSavePayload = {
      ...basePayload,
      contentsTitle,
      plans: selectedPlans,
    };

    try {
      await postPlanSaveFetch({ arg });
      setSaveOpen(true);
    } catch (err) {
      console.error(err);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleComplete = async (_: {
    frequency: string;
    hour: number;
    minute: number;
  }) => {
    await handleSavePlans();
    setSaveOpen(false);
  };

  return (
    <div className='p-6 rounded-xl h-full'>
      {contentsTitle && (
        <h2 className='mb-6 font-bold text-lg text-[#222528]'>
          {contentsTitle}
        </h2>
      )}

      <div className='flex flex-col flex-1 gap-10 overflow-y-auto'>
        {weekChunks.map((week, wIdx) => (
          <section key={wIdx} className='space-y-4'>
            <h3 className='font-semibold text-[#767676] text-base'>
              {wIdx + 1}주차
            </h3>

            {week.length === 0 ? (
              <div className='text-[#aaaaaa] text-sm ml-2'>
                등록된 계획이 없습니다.
              </div>
            ) : (
              <Accordion
                type='single'
                collapsible
                value={openByWeek[wIdx]}
                onValueChange={(v) =>
                  setOpenByWeek((o) => ({ ...o, [wIdx]: v }))
                }
                className='space-y-3'
              >
                {week.map(({ plan, index }, idxInWeek) => (
                  <PlanItem
                    key={`week${wIdx}-${idxInWeek}`}
                    weekIdx={wIdx}
                    idx={idxInWeek}
                    title={plan.title}
                    summary={plan.summary}
                    isOpen={openByWeek[wIdx] === `week${wIdx}-${idxInWeek}`}
                    isChecked={done[index] ?? false}
                    toggleCheck={() => onToggle(index)}
                  />
                ))}
              </Accordion>
            )}
          </section>
        ))}
      </div>

      <div className='mt-6 flex w-full items-end gap-4 p-8'>
        <button
          onClick={() => {
            reset();
            location.reload();
          }}
          className='w-[177px] h-14 border border-[#478147] rounded-xl text-[#478147] font-medium'
        >
          다시 만들기
        </button>

        <button
          className='flex-1 h-14 bg-[#488143] rounded-xl text-white font-medium disabled:opacity-50'
          disabled={checkedList.length === 0}
          onClick={handleSavePlans}
        >
          계획 저장
        </button>

        <PlanSaveFlowModal
          open={saveOpen}
          onOpenChange={setSaveOpen}
          planTitles={planTitles}
          onComplete={handleComplete}
        />
      </div>
    </div>
  );
}
