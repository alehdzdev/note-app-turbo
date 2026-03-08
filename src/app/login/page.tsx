import Image from "next/image";
import LoginForm from "@/components/LoginForm";
import loginCactus from "@/assets/login_cactus.png";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f5e8d0] flex items-center justify-center">
      <div className="flex flex-col items-center w-full max-w-[420px] px-6 gap-6">
        <Image
          src={loginCactus}
          alt="Happy cactus"
          width={140}
          height={140}
          priority
          className="object-contain"
        />

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#6b4c12] m-0 text-center">
          Yay, You&apos;re Back!
        </h1>

        <LoginForm />
      </div>
    </div>
  );
}
