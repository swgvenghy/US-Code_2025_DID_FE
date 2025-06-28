"use client";

import { useState } from "react";
import Button from "@/app/ui/button";
import TextAreaWithCounter from "@/app/ui/textarea";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const BLOG_TOPICS = ["작물소개", "일상공유", "상품홍보"] as const;
const CROPS = ["마늘", "사과", "흑마늘", "쌀", "자두"] as const;
type Topic = (typeof BLOG_TOPICS)[number];
type Crop = (typeof CROPS)[number];

type SideMenuProps = {
  isFinished: boolean;
  setIsFinished: (arg0: boolean) => void;
};
export function SideMenu({ isFinished, setIsFinished }: SideMenuProps) {
  const [selectedTopics, setSelectedTopics] = useState<Topic>("상품홍보");
  const [selectedCrops, setSelectedCrops] = useState<Crop[]>(["흑마늘"]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgFiles, setImgFiles] = useState<string[]>([]);

  const toggleTopic = (t: Topic) => setSelectedTopics(t);

  const toggleCrop = (c: Crop) =>
    setSelectedCrops((prev) =>
      prev.includes(c) ? prev.filter((v) => v !== c) : [...prev, c]
    );

  const handleSelectImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const readers = files.map(
      (file) =>
        new Promise<string>((res) => {
          const reader = new FileReader();
          reader.onloadend = () => res(reader.result as string);
          reader.readAsDataURL(file);
        })
    );
    const urls = await Promise.all(readers);
    setImgFiles(urls);
    e.target.value = "";
  };

  const handleCreatePost = () => {
    console.log("주제:", selectedTopics);
    console.log("농산물:", selectedCrops);
    console.log("제목:", title);
    console.log("본문:", content);
    console.log("이미지 개수:", imgFiles.length);
    setIsFinished(true);
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
          <div className='flex py-[10px] px-4 bg-[#E8EBEF] font-pretendard font-medium text-base gap-1.5 rounded-lg'>
            <Image src='/images/cloud.png' alt='cloud' height={24} width={24} />
            포스팅 스케줄에서 가져오기
          </div>
        </section>

        <section className='flex flex-col gap-6'>
          <div className='flex flex-col gap-1'>
            <h2 className='font-pretendard font-semibold text-xl flex items-center'>
              블로그 주제 선택{" "}
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
                selected={selectedTopics === t}
                onClick={() => toggleTopic(t)}
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
            {CROPS.map((c) => (
              <Button
                key={c}
                variant='secondary'
                size='small'
                selected={selectedCrops.includes(c)}
                onClick={() => toggleCrop(c)}
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
          <button className='bg-[#E8EBEF] border border-[#E2E2E2] text-black py-[10px] px-4 w-full rounded-lg'>
            + 포스팅 스케쥴에서 가져오기
          </button>
          <TextAreaWithCounter
            maxLength={500}
            rows={10}
            placeholder='블로그에 쓸 내용을 적어주세요'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </section>

        <section className='flex flex-col gap-6'>
          <div className='flex flex-col gap-1'>
            <h2 className='font-pretendard font-semibold text-xl flex items-center'>
              사진 첨부
            </h2>
            <p className='text-[#767676] text-sm font-medium'>
              사진을 첨부하 홍보 효과가 상승해요
            </p>
          </div>

          <label
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
          </Carousel>
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
    </div>
  );
}
