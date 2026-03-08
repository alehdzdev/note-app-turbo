"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import closeButton from "@/assets/close_button.png";
import { getNote, updateNote } from "@/lib/api";

const CATEGORIES = ["Random Thoughts", "School", "Personal"] as const;

const CATEGORY_STYLES: Record<string, { bg: string; border: string; dot: string }> = {
  "Random Thoughts": { bg: "rgba(239, 156, 102, 0.5)", border: "#c97035", dot: "#EF9C66" },
  School: { bg: "rgba(252, 220, 148, 0.5)", border: "#d4b050", dot: "#FCDC94" },
  Personal: { bg: "rgba(120, 171, 168, 0.5)", border: "#4e9290", dot: "#78ABA8" },
};

function formatLastEdited(date: Date): string {
  const datePart = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const timePart = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).toLowerCase();
  return `${datePart} at ${timePart}`;
}

export default function EditNotePage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState("Random Thoughts");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [lastEdited, setLastEdited] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const stateRef = useRef({ title, body, category });
  useEffect(() => {
    stateRef.current = { title, body, category };
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.replace("/login");
      return;
    }

    getNote(token, Number(id))
      .then((note) => {
        setTitle(note.title);
        setBody(note.body);
        setCategory(note.category);
        setLastEdited(new Date(note.updated_at));
      })
      .catch(() => router.replace("/notes"))
      .finally(() => setLoading(false));
  }, [id, router]);

  // Autosave on unmount
  useEffect(() => {
    return () => {
      const { title, body, category } = stateRef.current;
      const token = localStorage.getItem("access_token");
      if (token) {
        updateNote(token, Number(id), { title, body, category });
      }
    };
  }, [id]);

  const style = CATEGORY_STYLES[category];
  const otherCategories = CATEGORIES.filter((c) => c !== category);

  if (loading) {
    return <div className="min-h-screen bg-[#f5e8d0]" />;
  }

  return (
    <div
      className="min-h-screen bg-[#f5e8d0]"
      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      onClick={() => dropdownOpen && setDropdownOpen(false)}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-4 relative">
        {/* Category dropdown */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDropdownOpen(!dropdownOpen);
            }}
            className="flex items-center gap-2 bg-[#f5e8d0] border border-[#957139] rounded-lg px-4 py-2 cursor-pointer min-w-40"
          >
            <span className="w-3 h-3 rounded-full shrink-0" style={{ background: style.dot }} />
            <span className="text-sm text-[#1a1a1a] flex-1 text-left">{category}</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="#957139" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {dropdownOpen && (
            <div
              className="absolute top-full left-0 mt-1 bg-[#f5e8d0] border border-[#957139] rounded-lg overflow-hidden z-10 w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {otherCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    setDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 hover:bg-[rgba(149,113,57,0.1)] cursor-pointer bg-transparent border-none text-left"
                >
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ background: CATEGORY_STYLES[cat].dot }} />
                  <span className="text-sm text-[#1a1a1a]">{cat}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Close button */}
        <button onClick={() => router.push("/notes")} className="bg-transparent border-none cursor-pointer p-0">
          <Image src={closeButton} alt="Close" width={32} height={32} />
        </button>
      </div>

      {/* Note card */}
      <div className="px-4 pb-4 sm:px-8 sm:pb-8">
        <div
          className="rounded-2xl p-4 sm:p-8 min-h-[calc(100vh-100px)]"
          style={{ background: style.bg, border: `1.5px solid ${style.border}` }}
        >
          {/* Last edited */}
          <div className="flex justify-end mb-8">
            <span className="text-sm text-[#5a4020]">Last Edited: {formatLastEdited(lastEdited)}</span>
          </div>

          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setLastEdited(new Date());
            }}
            placeholder="Note Title"
            maxLength={100}
            className="w-full bg-transparent border-none outline-none text-[#1a1a1a] mb-4 p-0 placeholder:text-[#1a1a1a]/50"
            style={{
              fontFamily: "var(--font-inria-serif), 'Inria Serif', Georgia, serif",
              fontSize: "28px",
              fontWeight: 700,
            }}
          />

          {/* Body */}
          <textarea
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              setLastEdited(new Date());
            }}
            placeholder="Pour your heart out..."
            className="w-full bg-transparent border-none outline-none text-[#1a1a1a] resize-none p-0 placeholder:text-[#1a1a1a]/50"
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontSize: "16px",
              minHeight: "400px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
