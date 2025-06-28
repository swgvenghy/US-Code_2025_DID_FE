"use client";

import * as React from "react";
import { Accordion } from "@/components/ui/accordion";
import { chunkBy4 } from "./chunkBy4";
import { PlanItem } from "./plan-item";
import { usePlanStore } from "@/app/store/store/plan.store";
import { PlanSaveFlowModal } from "./plan-save-flow-modal";

interface PlanBoardProps {
  checkedList: number[];
  onToggle: (index: number) => void;
}

export function PlanBoard({ checkedList, onToggle }: PlanBoardProps) {
  const data = usePlanStore((s) => s.plans);
  const weekChunks = React.useMemo(() => chunkBy4(data), [data]);

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
      checkedList
        .map((i) => data[i]?.title)
        .filter((v): v is string => typeof v === "string"),
    [checkedList, data]
  );

  const handleComplete = async ({
    frequency,
    hour,
    minute,
  }: {
    frequency: string;
    hour: number;
    minute: number;
  }) => {
    // await saveAlarm({ frequency, hour, minute, plans: checkedList });
    console.log(frequency, hour, minute);
    setSaveOpen(false);
  };

  return (
    <div className='p-6 rounded-xl h-full'>
      <div className='flex flex-col flex-1 gap-10 overflow-y-auto'>
        {weekChunks.map((week, wIdx) => (
          <section key={wIdx} className='space-y-4'>
            <h2 className='font-semibold text-[#767676] text-base'>
              {wIdx + 1}주차
            </h2>
            <Accordion
              type='single'
              collapsible
              value={openByWeek[wIdx]}
              onValueChange={(v) => setOpenByWeek((o) => ({ ...o, [wIdx]: v }))}
              className='space-y-3'
            >
              {week.map(({ item, index }, idx) => (
                <PlanItem
                  key={`week${wIdx}-${idx}`}
                  weekIdx={wIdx}
                  idx={idx}
                  title={item.title}
                  summary={item.summary}
                  isOpen={openByWeek[wIdx] === `week${wIdx}-${idx}`}
                  isChecked={done[index] ?? false}
                  toggleCheck={() => onToggle(index)}
                />
              ))}
            </Accordion>
          </section>
        ))}
      </div>

      <div className='mt-6 flex w-full items-end gap-4 p-8'>
        <button
          onClick={() => location.reload()}
          className='w-[177px] h-14 border border-[#478147] rounded-xl text-[#478147] font-medium'
        >
          다시 만들기
        </button>

        <button
          className='flex-1 h-14 bg-[#488143] rounded-xl text-white font-medium disabled:opacity-50'
          disabled={checkedList.length === 0}
          onClick={() => setSaveOpen(true)}
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
