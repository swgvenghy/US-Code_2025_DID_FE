"use client";

import Steper from "@/app/ui/steper";
import Image from "next/image";
import { useFormContext, useWatch } from "react-hook-form";

interface NameCheckForm {
  nickName: string;
}

type NameCheckProps = {
  name: string;
  totalStep: number;
  currentStep: number;
  onNext: () => void;
};

export function NameCheck({
  name,
  totalStep,
  currentStep,
  onNext,
}: NameCheckProps) {
  const { register, control } = useFormContext<NameCheckForm>();
  const nickName = useWatch({
    control,
    name: "nickName",
    defaultValue: "",
  });

  return (
    <div className='flex flex-col gap-6 items-center justify-between p-13 h-full w-full'>
      <div className='flex flex-col gap-3 items-center'>
        <Steper totalStep={totalStep} currentStep={currentStep} />

        <div className='flex items-end gap-8'>
          <Image
            src='/images/intro-character.png'
            alt='인트로용 캐릭터'
            width={80}
            height={80}
          />
          <div className='flex-1 bg-white p-10 rounded-3xl text-xl text-[#343434]'>
            <strong>반가워요 {name} 농부님,</strong>
            <br />
            저는 농부님의 마케팅을 도와드릴{" "}
            <span className='text-[#217011]'>글릭</span>이에요!
          </div>
        </div>

        <div className='flex items-end gap-8'>
          <div style={{ width: 80, height: 80 }}></div>
          <div className='flex-1 bg-white p-10 text-xl text-[#343434] rounded-3xl'>
            <label htmlFor='nickName'>
              고객님들이 {name}님을 뭐라고 불러주었으면 <br />
              좋겠나요?
            </label>
          </div>
        </div>

        <div className=' flex items-center pt-17'>
          <div style={{ width: 150, height: 80 }}></div>
          <input
            id='nickName'
            type='text'
            {...register("nickName", { required: "필수 입력 항목입니다." })}
            placeholder={name}
            className='w-[343px] h-[103px] text-center py-6 px-5 bg-[#D7DCE2] text-xl
                  placeholder:text-[#828282] text-black rounded-3xl'
          />
        </div>
      </div>

      <button
        type='button'
        disabled={nickName.length < 2}
        onClick={onNext}
        className={`mt-4 w-[343px] h-[56px] p-2 rounded-xl text-white
          ${nickName.length >= 2 ? "bg-[#217011]" : "bg-[#ACACAC]"}`}
      >
        다음
      </button>
    </div>
  );
}
