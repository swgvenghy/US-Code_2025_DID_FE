"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/app/ui/button";
import { usePlanStore, usePlanReqStore } from "@/app/store/store/plan.store";

const BLOG_TOPICS = ["작물소개", "일상공유", "상품홍보"] as const;
const CROPS = ["마늘", "사과", "흑마늘", "쌀", "자두"] as const;

type SideMenuProps = {
  setFinished: (v: boolean) => void;
  isFinished: boolean;
};

export function SideMenu({ isFinished, setFinished }: SideMenuProps) {
  const setPayload = usePlanStore((s) => s.setPayload);

  const {
    topic: selectedTopic,
    crop: selectedCrop,
    keywords,
    setTopic,
    setCrop,
    addKeyword,
    removeKeyword,
  } = usePlanReqStore();

  const [weeklyPostCnt, setWeeklyPostCnt] = useState(1);
  const [keywordInput, setKeywordInput] = useState("");

  const handleAddKeyword = () => {
    const k = keywordInput.trim();
    if (!k || keywords.includes(k)) return;
    addKeyword(k);
    setKeywordInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  const changeWeeklyCnt = (d: number) =>
    setWeeklyPostCnt((cnt) => Math.max(1, cnt + d));

  const handleCreate = () => {
    setPayload({
      contentsType: selectedTopic,
      count: weeklyPostCnt * 4,
      item: selectedCrop,
      type: "NAVER_BLOG",
      keywords,
    });
    setFinished(true);
  };

  return (
    <div className='flex flex-col w-[365px] h-full bg-[#F2F4F6] rounded-bl-xl'>
      <div className='flex flex-col flex-1 p-8 gap-10 overflow-y-auto'>
        <section className='flex flex-col gap-6'>
          <div className='flex flex-col gap-0.5'>
            <h2 className='font-pretendard font-semibold text-xl flex items-center'>
              블로그 주제 선택
              <span className='text-[#767676] text-base'>*</span>
            </h2>
            <p className='text-[#767676] text-sm font-medium'>
              단일 선택입니다
            </p>
          </div>
          <div className='grid grid-cols-3 gap-2'>
            {BLOG_TOPICS.map((t) => (
              <Button
                key={t}
                variant='secondary'
                size='small'
                selected={selectedTopic === t}
                onClick={() => setTopic(t)}
              >
                {t}
              </Button>
            ))}
          </div>
        </section>

        <section className='flex flex-col gap-6'>
          <div className='flex flex-col gap-1'>
            <h2 className='font-pretendard font-semibold text-xl flex items-center'>
              농산물 선택 <span className='text-[#767676] text-base'>*</span>
            </h2>
            <p className='text-[#767676] text-sm font-medium'>
              단일 선택입니다
            </p>
          </div>
          <div className='grid grid-cols-3 gap-2'>
            {CROPS.map((c) => (
              <Button
                key={c}
                variant='secondary'
                size='small'
                selected={selectedCrop === c}
                onClick={() => setCrop(c)}
              >
                {c}
              </Button>
            ))}
          </div>
        </section>

        <section className='flex flex-col gap-6'>
          <div className='flex flex-col gap-1'>
            <h2 className='font-pretendard font-semibold text-xl'>
              핵심 키워드
            </h2>
            <p className='text-[#767676] text-sm font-medium'>
              내용을 구성할 핵심 키워드를 적어주세요 <br /> 없어도 괜찮아요 :)
            </p>
          </div>
          <input
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className='p-3 bg-[#E6EAEE] rounded-lg text-center text-black placeholder:text-[#767676] font-semibold text-base'
            placeholder='키워드 입력 후 Enter'
          />
          {keywords.length > 0 && (
            <div className='flex flex-wrap gap-2'>
              {keywords.map((k) => (
                <button
                  key={k}
                  className='rounded-xl border border-[#D3D3D3] text-[#767676] font-semibold text-base px-3 py-2'
                  onClick={() => removeKeyword(k)}
                >
                  {k} ✕
                </button>
              ))}
            </div>
          )}
        </section>

        <section className='flex flex-col'>
          <div className='flex flex-col gap-1'>
            <h2 className='font-pretendard font-semibold text-xl'>
              한 주 발행 갯수
            </h2>
            <p className='text-[#767676] text-sm font-medium'>
              발행할 게시물 수를 설정해주세요
            </p>
          </div>
          <div className='flex p-3 items-center justify-between'>
            <Image
              src='/images/check_indeterminate_small.svg'
              width={24}
              height={24}
              alt='minus'
              onClick={() => changeWeeklyCnt(-1)}
            />
            <div>주 {weeklyPostCnt}개</div>
            <Image
              src='/images/add.svg'
              width={24}
              height={24}
              alt='plus'
              onClick={() => changeWeeklyCnt(1)}
            />
          </div>
        </section>
      </div>

      <div className='p-8'>
        <Button
          selected={isFinished}
          variant='primary'
          size='large'
          onClick={handleCreate}
        >
          한 달 계획 만들기
        </Button>
      </div>
    </div>
  );
}
