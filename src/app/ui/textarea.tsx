// ui/textarea.tsx
import { useState, TextareaHTMLAttributes } from "react";
import { cn } from "@/app/utils/style";

interface TextAreaWithCounterProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "maxLength"> {
  maxLength: number;
  className?: string;
}

export default function TextAreaWithCounter({
  maxLength,
  placeholder = "",
  className = "",
  value,
  onChange,
  ...rest
}: TextAreaWithCounterProps) {
  const isControlled = value !== undefined && onChange !== undefined;

  const [inner, setInner] = useState("");

  const currentValue = isControlled ? (value as string) : inner;
  const handleChange = isControlled
    ? (onChange as React.ChangeEventHandler<HTMLTextAreaElement>)
    : (e: React.ChangeEvent<HTMLTextAreaElement>) => setInner(e.target.value);

  return (
    <div
      className={cn(
        "relative rounded-xl border border-gray-200 bg-white p-4",
        className
      )}
    >
      <textarea
        {...rest}
        maxLength={maxLength}
        value={currentValue}
        onChange={handleChange}
        placeholder={placeholder}
        className='h-full w-full resize-none bg-transparent outline-none placeholder:text-gray-400'
      />
      <span className='absolute bottom-3 right-4 text-sm text-gray-400'>
        {currentValue.length}/{maxLength}
      </span>
    </div>
  );
}
