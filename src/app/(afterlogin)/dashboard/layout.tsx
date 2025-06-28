"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { usePopupStore } from "@/app/store/store/popup.store";
import { useWriteBlogStore } from "@/app/store/store/write-blog.store";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const router = useRouter();
  const popup = usePopupStore((s) => s.popup);
  const [open, setOpen] = useState(popup);
  const { reset } = useWriteBlogStore();
  useEffect(() => {
    reset();
  }, [reset]);
  return (
    <>
      {children}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='p-10 w-fit [&_[data-radix-dialog-close]]:hidden'>
          <DialogHeader className='items-start gap-6'>
            <Image
              src='/images/color-calendar.png'
              alt='calendar icon'
              width={72}
              height={72}
            />
            <div className='my-4'>
              <DialogTitle className='text-left text-pretty text-2xl font-bold'>
                잠깐! 블로그 업로드 계획,
                <br />
                글릭과 함께 세워볼까요?
              </DialogTitle>
              <DialogDescription className='mt-4 text-left text-base text-pretty'>
                앞으로 3개의 계획을 세워 <br /> 막막했던 블로그 작성을 쉽게
                완성할 수 있어요.
              </DialogDescription>
            </div>
          </DialogHeader>

          <DialogFooter className='flex-row gap-2'>
            <DialogClose asChild>
              <button className='bg-[#F2F4F6] text-[#767676] font-bold text-xl rounded-xl py-3 w-[121px]'>
                다음에
              </button>
            </DialogClose>

            <DialogClose asChild>
              <button
                onClick={() => router.push("/planning")}
                className=' bg-[#217011] text-white rounded-xl font-bold text-xl py-3 w-[265px]'
              >
                계획 세우기
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
