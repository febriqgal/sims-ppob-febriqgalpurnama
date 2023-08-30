"use client";
import EmailIcon from "@/components/icons/email";
import InvisibleIcon from "@/components/icons/invisible";
import PasswordIcon from "@/components/icons/password";
import VisibleIcon from "@/components/icons/visible";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import IllustrationLogin from "../../../../../public/Illustrasi Login.png";
import Logo from "../../../../../public/Logo.png";
import GoogleIcon from "../../../../../public/google.svg";
import { signIn } from "next-auth/react";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl: `${window.location.origin}/`,
    });
  };
  const route = useRouter();
  return (
    <main>
      <Toaster position="bottom-left" reverseOrder={false} />
      <div className="flex justify-between items-center">
        <div className="w-1/2 h-screen flex flex-col items-center justify-center">
          <div className="w-[350px]">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="text-xl font-bold text-center">
                <div className="flex gap-2 mb-4 items-center justify-center ">
                  <Image src={Logo} alt="Logo" />

                  <h1>SIMS PPOB</h1>
                </div>
                <h1>Masuk atau Buat Akun</h1>
                <h1>Untuk Memulai</h1>
              </div>
              <Input
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
                isClearable
                labelPlacement="outside"
                startContent={<EmailIcon className="h-6 fill-primary" />}
                variant="bordered"
                placeholder="Masukkan email"
                color="primary"
                label="Email"
                type="email"
              />
              <Input
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
                maxLength={8}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <InvisibleIcon className=" h-5 fill-primary text-default-400 pointer-events-none" />
                    ) : (
                      <VisibleIcon className="  h-5  fill-primary text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                labelPlacement="outside"
                startContent={<PasswordIcon className="h-6 fill-primary" />}
                variant="bordered"
                placeholder="Masukkan password"
                color="primary"
                label="Password"
                type={isVisible ? "password" : "text"}
              />
              <Button type="submit" color="primary" className="w-full">
                Masuk
              </Button>
            </form>
            <Button
              onPress={async () => {
                await signIn("google", { callbackUrl: "/" });
              }}
              startContent={<Image className="h-4" src={GoogleIcon} alt="#" />}
              variant="bordered"
              color="primary"
              className="w-full mt-1"
            >
              Masuk dengan Google
            </Button>
            <h1 className="mt-4 text-xs text-center">
              Belum punya akun? Registrasi
              <span className="ml-1">
                <Link className="text-primary" href={"/auth/register"}>
                  disini
                </Link>
              </span>
            </h1>
          </div>
        </div>
        <Image
          className="  w-1/2 h-screen object-cover"
          src={IllustrationLogin}
          alt="#"
        />
      </div>
    </main>
  );
}
