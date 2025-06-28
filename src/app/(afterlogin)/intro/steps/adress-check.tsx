"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useFormContext, useWatch } from "react-hook-form";
import Image from "next/image";
import Steper from "@/app/ui/steper";

const DaumPostcode = dynamic(() => import("react-daum-postcode"), {
  ssr: false,
});

type PostcodeData = {
  address: string;
  buildingName?: string;
  zonecode?: string;
};

type AddressCheckForm = {
  address: string;
};
type AddressCheckProps = {
  totalStep: number;
  currentStep: number;
  onNext: () => void;
};

export function AddressCheck({
  totalStep,
  currentStep,
  onNext,
}: AddressCheckProps) {
  const { register, control, setValue } = useFormContext<AddressCheckForm>();
  const address = useWatch({ control, name: "address", defaultValue: "" });
  const [openSearch, setOpenSearch] = useState(false);

  const handleComplete = (data: PostcodeData) => {
    const fullAddress = `${data.address}${
      data.buildingName ? ` (${data.buildingName})` : ""
    }`;
    setValue("address", fullAddress, { shouldValidate: true });
    setOpenSearch(false);
  };

  return (
    <div className='flex flex-col gap-6 items-center justify-between p-13 w-full h-full'>
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
            고객분들이 <br /> 확인할 수 있는 상세 주소를 적어주세요.
          </div>
        </div>

        <div className='flex items-center pt-20'>
          <div style={{ width: 150, height: 80 }} />
          <div onClick={() => setOpenSearch(true)}>
            <input
              id='address'
              type='text'
              readOnly
              {...register("address", { required: "주소를 선택해주세요." })}
              placeholder='주소를 검색해 주세요'
              className='w-[343px] h-[103px]  text-center py-6 px-5 bg-[#D7DCE2] text-xl placeholder:text-[#828282] text-black rounded-3xl'
            />
          </div>
        </div>
      </div>

      {openSearch && (
        <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'>
          <div className='bg-white p-4 rounded shadow-lg'>
            <DaumPostcode
              onComplete={handleComplete}
              style={{ width: 500, height: 600 }}
            />
            <button
              type='button'
              onClick={() => setOpenSearch(false)}
              className='mt-2  px-4 py-2 bg-[#ACACAC] text-white rounded'
            >
              닫기
            </button>
          </div>
        </div>
      )}

      <button
        type='button'
        disabled={address.length < 2}
        onClick={onNext}
        className={`mt-4 w-[343px] h-[56px] p-2 rounded-xl text-white ${
          address.length >= 2 ? "bg-[#217011]" : "bg-[#ACACAC]"
        }`}
      >
        다음
      </button>
    </div>
  );
}
