"use client";

import { useFormContext } from "react-hook-form";
import Steper from "@/app/ui/steper";
import Image from "next/image";

/* ---------------- 타입 ---------------- */
interface CallCheckForm {
  phoneNumber: string;
  kakaoId: string;
  snsId: string;
  smartStoreLink: string;
  contactEmail: string;
  storeName: string;
}

type CallCheckProps = {
  totalStep: number;
  currentStep: number;
  onNext: () => void;
};

/* ---------------- 필드 정의 ---------------- */
const FIELDS: Array<{
  name: keyof CallCheckForm;
  placeholder: string;
  iconSrc: string;
  iconAlt: string;
}> = [
  {
    name: "phoneNumber",
    placeholder: "전화번호",
    iconSrc: "/images/phone-icon.svg",
    iconAlt: "phone-icon",
  },
  {
    name: "kakaoId",
    placeholder: "카카오톡 ID",
    iconSrc: "/images/kakao-icon.svg",
    iconAlt: "kakao-icon",
  },
  {
    name: "snsId",
    placeholder: "SNS 아이디",
    iconSrc: "/images/insta-icon.svg",
    iconAlt: "sns-icon",
  },
  {
    name: "smartStoreLink",
    placeholder: "스마트 스토어 링크",
    iconSrc: "/images/link-icon.svg",
    iconAlt: "link-icon",
  },
  {
    name: "contactEmail",
    placeholder: "email 주소",
    iconSrc: "/images/mail-icon.svg",
    iconAlt: "mail-icon",
  },
  {
    name: "storeName",
    placeholder: "가게명",
    iconSrc: "/images/home-icon.svg",
    iconAlt: "home-icon",
  },
];

/* ---------------- 정규식 ---------------- */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
const phoneRegex = /^01[016789][0-9]{7,8}$/; // 한국 휴대폰 예시

/* ---------------- 컴포넌트 ---------------- */
export function CallCheck({ totalStep, currentStep, onNext }: CallCheckProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CallCheckForm>();

  return (
    <div className='flex flex-col gap-6 items-center p-14 h-full'>
      <Steper totalStep={totalStep} currentStep={currentStep} />

      <div className='flex items-end gap-8 mb-10'>
        <Image
          src='/images/intro-character.png'
          alt='인트로용 캐릭터'
          width={80}
          height={80}
        />
        <div className='flex-1 bg-white p-10 rounded-3xl text-xl text-[#343434]'>
          <div>고객님들이</div>
          <strong>연락할 수 있는 수단</strong>을 적어주세요
        </div>
      </div>

      {/* ---------- 입력 영역 ---------- */}
      <div className='grid grid-cols-2 gap-4 w-full'>
        {FIELDS.map(({ name, placeholder, iconSrc, iconAlt }) => (
          <div
            key={name}
            className='w-[343px] h-[103px] px-7 py-9 bg-[#D7DCE2] rounded-3xl flex items-center gap-4'
          >
            <Image width={33} height={33} src={iconSrc} alt={iconAlt} />
            <div className='h-full border-l border-[#ACACAC]' />
            <input
              id={name}
              type='text'
              placeholder={placeholder}
              {...register(name, {
                validate:
                  name === "contactEmail"
                    ? (v) => v === "" || emailRegex.test(v) || "Invalid email"
                    : name === "smartStoreLink"
                    ? (v) => v === "" || urlRegex.test(v) || "Invalid url"
                    : name === "phoneNumber"
                    ? (v) =>
                        v === "" || phoneRegex.test(v) || "형식: 010xxxxxxxx"
                    : undefined,
              })}
              className='flex-1 text-base font-medium placeholder:text-[#939393] text-black focus:outline-none'
            />
          </div>
        ))}
      </div>

      {/* ---------- 첫 번째 에러 메시지 ---------- */}
      {Object.values(errors).length > 0 && (
        <p className='text-red-500 text-sm mt-2'>
          {Object.values(errors)[0]?.message as string}
        </p>
      )}

      {/* ---------- 다음 버튼 (항상 활성화) ---------- */}
      <button
        type='button'
        onClick={onNext}
        className='mt-4 w-[343px] h-[56px] p-2 rounded-xl text-white bg-[#217011]'
      >
        다음
      </button>
    </div>
  );
}
