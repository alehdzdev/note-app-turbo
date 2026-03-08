"use client";

import Image from "next/image";
import plusIcon from "@/assets/plus_icon.png";

interface NewNoteButtonProps {
  onClick?: () => void;
}

export default function NewNoteButton({ onClick }: NewNoteButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-[46px] border border-[#957139] bg-transparent text-[#957139] font-bold text-base leading-none tracking-normal cursor-pointer w-[133px] h-[43px] px-4 transition-colors duration-150 hover:bg-[rgba(149,113,57,0.2)]"
      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
    >
      <Image src={plusIcon} alt="+" width={16} height={16} />
      New Note
    </button>
  );
}
