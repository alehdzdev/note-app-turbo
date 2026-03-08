import { Note } from "@/lib/api";

const CATEGORY_STYLES: Record<string, { bg: string; border: string }> = {
  Personal: { bg: "rgba(120, 171, 168, 0.5)", border: "#4e9290" },
  School: { bg: "rgba(252, 220, 148, 0.5)", border: "#d4b050" },
  "Random Thoughts": { bg: "rgba(239, 156, 102, 0.5)", border: "#c97035" },
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "today";
  if (date.toDateString() === yesterday.toDateString()) return "yesterday";

  return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
}

interface NoteCardProps {
  note: Note;
  onClick?: () => void;
}

export default function NoteCard({ note, onClick }: NoteCardProps) {
  const style = CATEGORY_STYLES[note.category] ?? { bg: "#f0ece6", border: "#c4a87a" };

  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex flex-col w-full min-h-[200px] rounded-[11px] p-4 gap-3 lg:w-[303px]"
      style={{
        border: `3px solid ${style.border}`,
        background: style.bg,
      }}
    >
      <div className="flex items-center gap-[10px] font-sans text-[13px] text-[#5a4020]">
        <span className="font-bold">{formatDate(note.created_at)}</span>
        <span className="opacity-75">{note.category}</span>
      </div>

      <h2
        className="text-[22px] font-bold text-[#1a1a1a] m-0 leading-[1.2]"
        style={{ fontFamily: "var(--font-inria-serif), 'Inria Serif', Georgia, serif" }}
      >
        {note.title}
      </h2>

      {note.body && (
        <p className="font-sans text-sm text-[#3a2a10] m-0 leading-[1.5] line-clamp-4">
          {note.body}
        </p>
      )}
    </div>
  );
}
