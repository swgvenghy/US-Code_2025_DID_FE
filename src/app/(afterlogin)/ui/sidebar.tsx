"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import SidebarButton from "./sidebar-button";

export type Platform = "naverblog" | "naverSmartStore" | "instagram";

interface Item {
  key: Platform;
  label: string;
}

type SideBarProps = {
  items?: Item[];
};

export default function SideBar({ items = [] }: SideBarProps) {
  const [selected, setSelected] = useState<Platform | null>(
    () => items[0]?.key ?? null
  );

  useEffect(() => {
    if (items.length === 0) {
      setSelected(null);
    } else if (!items.some((it) => it.key === selected)) {
      setSelected(items[0].key);
    }
  }, [items, selected]);

  const handleSelect = useCallback((key: Platform) => {
    setSelected(key);
  }, []);

  return (
    <aside
      className='flex h-full w-60 flex-col gap-14 bg-white text-black px-4 py-10'
      aria-label='사이드바 네비게이션'
    >
      <div className='pl-4'>
        <Image
          src='/images/logo_np.png'
          alt='로고'
          width={96}
          height={52}
          priority
        />
      </div>

      <nav className='flex flex-col gap-2' role='menu'>
        {items.map(({ key, label }) => (
          <SidebarButton
            key={key}
            platform={key}
            koreanName={label}
            isSelected={key === selected}
            onClick={() => handleSelect(key)}
            aria-checked={key === selected}
            role='menuitemradio'
          />
        ))}
      </nav>
    </aside>
  );
}
