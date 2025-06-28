"use client";

import Image from "next/image";
import Link from "next/link";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
// } from "@/components/ui/carousel";
import Button from "@/app/ui/button";
import TextAreaWithCounter from "@/app/ui/textarea";
import {
  BLOG_TOPICS,
  ITEMS,
  useWriteBlogStore,
} from "@/app/store/store/write-blog.store";
import { ScheduleModal } from "../component/schedule-modal";
import { useState } from "react";

type SideMenuProps = {
  isFinished: boolean;
  setIsFinished: (arg0: boolean) => void;
  onSave: () => Promise<void>;
};

export function SideMenu({ isFinished, setIsFinished, onSave }: SideMenuProps) {
  const {
    selectedTopic,
    selectedItem,
    title,
    content,
    // imgFiles,
    setTopic,
    toggleItem,
    setTitle,
    setContent,
    // setImgFiles,
    reset,
  } = useWriteBlogStore();

  const [open, setOpen] = useState(false);

  // const handleSelectImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = Array.from(e.target.files ?? []);
  //   if (!files.length) return;

  //   const urls = await Promise.all(
  //     files.map(
  //       (file) =>
  //         new Promise<string>((res) => {
  //           const reader = new FileReader();
  //           reader.onloadend = () => res(reader.result as string);
  //           reader.readAsDataURL(file);
  //         })
  //     )
  //   );
  //   setImgFiles(urls);
  //   e.target.value = "";
  // };

  const handleCreatePost = async () => {
    setIsFinished(true);
    try {
      await onSave();
      reset();
    } catch {
      throw new Error("post error");
    }
    reset();
  };

  return (
    <div className='flex flex-col w-[365px] h-full bg-[#F2F4F6] rounded-bl-xl rounded-tl-xl'>
      <div className='flex flex-col flex-1 overflow-y-auto p-8 gap-10'>
        <section className='flex flex-row gap-2'>
          <Link
            href='/planning'
            className='w-[44px] h-[44px] flex justify-center items-center bg-[#448152] rounded-lg'
          >
            <Image
              src='/images/calendar.png'
              alt='calendar icon'
              width={24}
              height={24}
            />
          </Link>
          <div
            onClick={() => setOpen(!open)}
            className='flex py-[10px] px-4 bg-[#E8EBEF] font-pretendard font-medium text-base gap-1.5 rounded-lg'
          >
            <Image src='/images/cloud.png' alt='cloud' height={24} width={24} />
            포스팅 스케줄에서 가져오기
          </div>
        </section>

        <section className='flex flex-col gap-6'>
          <div className='flex flex-col gap-1'>
            <h2 className='font-pretendard font-semibold text-xl flex items-center'>
              블로그 주제 선택
              <span className='text-[#767676] text-base'>*</span>
            </h2>
            <p className='text-[#767676] text-sm font-medium'>
              다중 선택이 가능해요
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
              소개할 농산물을 선택해주세요
            </p>
          </div>
          <div className='grid grid-cols-3 gap-2'>
            {ITEMS.map((c) => (
              <Button
                key={c}
                variant='secondary'
                size='small'
                selected={selectedItem.includes(c)}
                onClick={() => toggleItem(c)}
              >
                {c}
              </Button>
            ))}
          </div>
        </section>

        <section className='flex flex-col gap-6'>
          <h2 className='font-pretendard font-semibold text-xl'>블로그 제목</h2>
          <TextAreaWithCounter
            maxLength={50}
            rows={5}
            placeholder='의성마늘 드디어 수확합니다.'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </section>

        <section className='flex flex-col gap-6'>
          <h2 className='font-pretendard font-semibold text-xl flex items-center'>
            게시물 내용 <span className='text-[#767676] text-base'>*</span>
          </h2>
          <TextAreaWithCounter
            maxLength={500}
            rows={10}
            placeholder='블로그에 쓸 내용을 적어주세요'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </section>

        <section className='flex flex-col gap-6'>
          {/* <div className='flex flex-col gap-1'>
            <h2 className='font-pretendard font-semibold text-xl flex items-center'>
              사진 첨부
            </h2>
            <p className='text-[#767676] text-sm font-medium'>
              사진을 첨부하 홍보 효과가 상승해요
            </p>
          </div> */}

          {/* <label
            htmlFor='imageList'
            className='flex items-center py-2 font-medium gap-0.5 justify-center bg-none rounded-sm border border-[#CBD6CE] text-[#448152]'
            onClick={() => setImgFiles([])}
          >
            <Image
              src='/images/photo-icon.svg'
              width={24}
              height={24}
              alt='photo icon'
            />
            사진 추가
          </label>
          <input
            type='file'
            id='imageList'
            accept='image/*'
            multiple
            className='hidden'
            onChange={handleSelectImages}
          />

          <Carousel>
            <CarouselContent>
              {imgFiles.map((src, idx) => (
                <CarouselItem
                  key={idx}
                  className='flex justify-center basis-1/2'
                >
                  <div className='relative w-36 h-36 overflow-hidden rounded-lg'>
                    <Image
                      src={src}
                      alt={`img-${idx}`}
                      fill
                      className='object-cover'
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel> */}
        </section>
      </div>

      <div className='sticky bottom-0 p-8'>
        <Button
          variant='primary'
          size='large'
          selected={isFinished}
          onClick={handleCreatePost}
        >
          블로그 글 만들기
        </Button>
      </div>
      <ScheduleModal open={open} onOpenChange={setOpen} />
    </div>
  );
}
