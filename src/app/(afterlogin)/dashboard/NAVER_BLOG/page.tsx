"use client";

import { useState } from "react";
import { SideMenu } from "./side-menu";
import Image from "next/image";

export default function DashBoardBlogPage() {
  const [isFinished, setIsFinished] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className='flex-row h-full flex'>
      <SideMenu isFinished={isFinished} setIsFinished={setIsFinished} />
      <div className='w-full'>
        <div className='flex items-center justify-center h-full'>
          {!isFinished && (
            <Image
              src={"/images/blog_pending.png"}
              width={143}
              height={233}
              alt='pending icon'
            />
          )}
          {isFinished && isLoading && (
            <Image
              width={143}
              height={233}
              src='/images/loading.gif'
              alt={"loading indicator"}
            />
          )}
        </div>
      </div>
    </div>
  );
}
