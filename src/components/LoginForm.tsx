"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { access, refresh } = await login(email, password);
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      router.push("/notes");
    } catch (err: unknown) {
      if (err && typeof err === "object") {
        const messages = Object.values(err as Record<string, string[]>)
          .flat()
          .join(" ");
        setError(messages || "Invalid credentials.");
      } else {
        setError("Invalid credentials.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border-[1.5px] border-[#c4a87a] rounded-lg py-[14px] px-4 bg-transparent text-[#6b4c12] outline-none text-[15px]"
      />
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border-[1.5px] border-[#c4a87a] rounded-lg py-[14px] pl-4 pr-12 bg-transparent text-[#6b4c12] outline-none text-[15px] w-full"
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="absolute right-[14px] top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[#c4a87a] p-0 text-[18px]"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? "◡" : "⌒⌒"}
        </button>
      </div>

      {error && (
        <p className="text-[#c0392b] text-[13px] m-0">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="border-[1.5px] border-[#7a5c24] rounded-[28px] py-[14px] bg-transparent text-[#6b4c12] font-bold text-base cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 mt-2"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <a
        href="/signup"
        className="text-center text-[#8a6520] text-sm underline mt-1"
      >
        Oops! I&apos;ve never been here before
      </a>
    </form>
  );
}
