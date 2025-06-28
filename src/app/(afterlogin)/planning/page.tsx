"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { SideMenu } from "./side-menu";
import { usePostPlan } from "@/app/store/querys/ai";
import { PlanBoard } from "./component/plan-board";
import { usePlanStore } from "@/app/store/store/plan.store";

export default function PlanningPage() {
  const [isFinished, setIsFinished] = useState(false);
  const [checkedList, setCheckedList] = useState<number[]>([]);

  const { trigger, data, error, isMutating } = usePostPlan();

  const payload = usePlanStore((s) => s.payload);
  const setPlans = usePlanStore((s) => s.setPlans);
  const setContentsTitle = usePlanStore((s) => s.setContentsTitle);
  const plansLen = usePlanStore((s) => s.plans.length);

  const toggleChecked = (idx: number) =>
    setCheckedList((list) =>
      list.includes(idx) ? list.filter((n) => n !== idx) : [...list, idx]
    );

  useEffect(() => {
    if (isFinished && payload) trigger(payload);
  }, [isFinished, payload, trigger]);

  useEffect(() => {
    if (data) {
      setContentsTitle(data.contentsTitle);
      setPlans(data.plans);
      setCheckedList([]);
    }
  }, [data, setContentsTitle, setPlans]);

  return (
    <div className='flex flex-col w-full h-full'>
      <header className='py-8 pl-9 w-full bg-[#222528] rounded-t-xl flex items-center'>
        <Link href='/' className='mr-8'>
          <Image
            src='/images/arrow_back.svg'
            alt='back'
            width={24}
            height={24}
          />
        </Link>
        <h1 className='font-semibold text-xl text-white'>블로그 한달계획</h1>
      </header>

      <main className='flex flex-row flex-1 overflow-hidden'>
        <SideMenu isFinished={isFinished} setFinished={setIsFinished} />

        <div className='flex flex-1 justify-center items-center'>
          {isMutating && (
            <div>
              <Image
                src='/images/loading.gif'
                width={143}
                height={233}
                alt='loading'
              />
              <div>로딩중입니다!</div>
            </div>
          )}

          {!isMutating && plansLen !== 0 && (
            <div className='h-full overflow-scroll'>
              <PlanBoard checkedList={checkedList} onToggle={toggleChecked} />
            </div>
          )}

          {!isMutating && error && (
            <span className='text-red-500'>오류가 발생했습니다.</span>
          )}

          {!isFinished && !isMutating && plansLen === 0 && (
            <Image
              src='/images/plan_character.png'
              width={142}
              height={233}
              alt='대기 캐릭터'
            />
          )}
        </div>
      </main>
    </div>
  );
}
