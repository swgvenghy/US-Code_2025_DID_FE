"use client";

import { useState } from "react";
import Image from "next/image";
import { SideMenu } from "./side-menu";
import { useWriteBlogStore } from "@/app/store/store/write-blog.store";
import { useWriteBlog } from "@/app/hooks/useWriteBlog";
import MarkdownViewer from "./blog-view";

export default function DashBoardBlogPage() {
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { selectedTopic, selectedItem, title, content } = useWriteBlogStore();
  const { writeBlog, isLoading, error } = useWriteBlog();

  return (
    <div className='flex-row h-full flex'>
      <SideMenu
        isFinished={isFinished}
        setIsFinished={setIsFinished}
        onSave={async () => {
          try {
            const res = await writeBlog({
              contentsType: selectedTopic,
              item: selectedItem[0],
              blogTitlePrompt: title,
              blogContensPrompt: content,
            });
            setResult(res.data);
            setIsFinished(true);
          } catch {
            <div>새로고침해주세요</div>;
          }
        }}
      />

      <div className='w-full overflow-y-auto px-5'>
        <div className='flex items-center justify-center h-full overflow-y-auto'>
          {isFinished && isLoading && (
            <Image
              src='/images/loading.gif'
              width={143}
              height={233}
              alt='loading indicator'
            />
          )}
          {isFinished && !isLoading && !result && (
            <Image
              src='/images/blog_pending.png'
              width={143}
              height={233}
              alt='pending icon'
            />
          )}
          {error && <div>새로고침해주세요</div>}
          {isFinished && !isLoading && result && (
            <div>
              <MarkdownViewer content={result} />
              <div className='flex flex-row mt-3 items-end justify-end gap-4'>
                <button
                  onClick={async () => {
                    try {
                      const res = await writeBlog({
                        contentsType: selectedTopic,
                        item: selectedItem[0],
                        blogTitlePrompt: title,
                        blogContensPrompt: content,
                      });
                      setResult(res.data);
                      setIsFinished(true);
                    } catch {
                      <div>새로고침해주세요</div>;
                    }
                  }}
                  className='bg-[#DDE0E2] text-black py-4 px-9 font-bold rounded-xl'
                >
                  재생성
                </button>
                <button
                  onClick={async () => {
                    if (!result) return;
                    try {
                      await navigator.clipboard.writeText(result);
                      alert("클립보드에 복사되었습니다!");
                    } catch (err) {
                      console.error(err);
                      alert("복사에 실패했습니다. 다시 시도해 주세요.");
                    }
                  }}
                  className='bg-[#448154] text-white py-4 px-9 font-bold rounded-xl'
                >
                  복사
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
