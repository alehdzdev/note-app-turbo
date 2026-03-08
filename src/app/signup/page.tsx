import Image from "next/image";
import SignupForm from "@/components/SignupForm";
import signupCat from "@/assets/signup_cat.png";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#f5e8d0] flex items-center justify-center">
      <div className="flex flex-col items-center w-full max-w-[420px] px-6 gap-6">
        <Image
          src={signupCat}
          alt="Sleeping cat"
          width={180}
          height={120}
          priority
          className="object-contain"
        />

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#6b4c12] m-0 text-center">
          Yay, New Friend!
        </h1>

        <SignupForm />
      </div>
    </div>
  );
}
