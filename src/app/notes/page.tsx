"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getNotes, Note } from "@/lib/api";
import NoteCard from "@/components/NoteCard";
import NewNoteButton from "@/components/NewNoteButton";
import dashboardCoffee from "@/assets/dashboard_coffe.png";

const CATEGORIES = ["Random Thoughts", "School", "Personal"] as const;

const CATEGORY_DOTS: Record<string, string> = {
  "Random Thoughts": "#EF9C66",
  School: "#FCDC94",
  Personal: "#78ABA8",
};

export default function NotesPage() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.replace("/login");
      return;
    }

    getNotes(token)
      .then(setNotes)
      .catch(() => router.replace("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  const countFor = (cat: string) => notes.filter((n) => n.category === cat).length;

  const displayed = activeCategory ? notes.filter((n) => n.category === activeCategory) : notes;

  return (
    <div className="min-h-screen bg-[#f5e8d0] flex flex-col md:flex-row font-sans">
      {/* Sidebar — desktop only */}
      <aside className="hidden md:block w-[220px] shrink-0 pt-20 px-5 pb-7">
        <p className="font-bold text-[13px] text-[#1a1a1a] mb-4">All Categories</p>
        <ul className="list-none p-0 m-0 flex flex-col gap-3">
          {CATEGORIES.map((cat) => {
            const count = countFor(cat);
            const isActive = activeCategory === cat;
            return (
              <li key={cat}>
                <button
                  onClick={() => setActiveCategory(isActive ? null : cat)}
                  className={`flex items-center gap-2 bg-transparent border-none cursor-pointer p-0 w-full ${isActive ? "font-bold" : "font-normal"}`}
                >
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: CATEGORY_DOTS[cat] }} />
                  <span className="text-[13px] text-[#1a1a1a] flex-1 text-left">{cat}</span>
                  {count > 0 && <span className="text-xs text-[#7a5c24]">{count}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 pt-5 px-4 pb-7 md:px-7">
        {/* Mobile category filter */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-2 md:hidden">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(isActive ? null : cat)}
                className={`flex items-center gap-2 shrink-0 border rounded-full px-3 py-1.5 text-[13px] cursor-pointer bg-transparent ${isActive ? "font-bold border-[#7a5c24] text-[#6b4c12]" : "border-[#c4a87a] text-[#1a1a1a]"}`}
              >
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: CATEGORY_DOTS[cat] }} />
                {cat}
              </button>
            );
          })}
        </div>

        <div className="flex justify-end mb-6">
          <NewNoteButton onClick={() => router.push("/notes/new")} />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl bg-[rgba(180,150,100,0.15)] h-[180px]" />
            ))}
          </div>
        ) : displayed.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 md:mt-40 gap-6 text-center px-4">
            <Image
              src={dashboardCoffee}
              alt="Waiting for notes"
              width={297}
              height={296}
              className="object-contain w-[180px] md:w-[297px]"
            />
            <p className="font-normal text-xl md:text-2xl leading-none text-[#957139] m-0">
              I&apos;m just here waiting for your charming notes...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:flex lg:flex-wrap">
            {displayed.map((note) => (
              <NoteCard key={note.id} note={note} onClick={() => router.push(`/notes/${note.id}`)} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
