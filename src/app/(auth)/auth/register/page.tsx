"use client";
import EmailIcon from "@/components/icons/email";
import PasswordIcon from "@/components/icons/password";
import PersonIcon from "@/components/icons/person";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import IllustrationLogin from "../../../../../public/Illustrasi Login.png";
import Logo from "../../../../../public/Logo.png";
import GoogleIcon from "../../../../../public/google.svg";

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const handleLogin = (e: SyntheticEvent) => {
    e.preventDefault();
    toast.error("Password yang dimasukkan salah");
  };
  const route = useRouter();
  return (
    <main>
      <Toaster position="bottom-left" reverseOrder={false} />
      <div className="flex justify-between items-center">
        <div className="w-1/2 py-20 min-h-screen flex flex-col items-center justify-center">
          <div className="w-[350px]">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="text-xl font-bold text-center">
                <div className="flex gap-2 mb-4 items-center justify-center ">
                  <Image src={Logo} alt="Logo" />

                  <h1>SIMS PPOB</h1>
                </div>
                <h1>Lengkapi Data Untuk</h1>
                <h1>Membuat Akun</h1>
              </div>
              <Input
                labelPlacement="outside"
                startContent={<PersonIcon className="h-6 fill-primary" />}
                variant="bordered"
                placeholder="Masukkan nama depan"
                color="primary"
                label="Nama Depan"
                type="text"
              />
              <Input
                labelPlacement="outside"
                startContent={<PersonIcon className="h-6 fill-primary" />}
                variant="bordered"
                placeholder="Masukkan nama belakang"
                color="primary"
                label="Nama Belakang"
                type="text"
              />
              <Input
                labelPlacement="outside"
                startContent={<EmailIcon className="h-6 fill-primary" />}
                variant="bordered"
                placeholder="Masukkan email"
                color="primary"
                label="Email"
                type="email"
              />
              <Input
                labelPlacement="outside"
                startContent={<PasswordIcon className="h-6 fill-primary" />}
                variant="bordered"
                placeholder="Masukkan password"
                color="primary"
                label="Password"
                type="password"
              />
              <Input
                labelPlacement="outside"
                startContent={<PasswordIcon className="h-6 fill-primary" />}
                variant="bordered"
                placeholder="Konfirmasi password"
                color="primary"
                label="Password"
                type="password"
              />

              <Button color="primary" className="w-full">
                Register
              </Button>
            </form>
            <Button
              onPress={() => {
                route.push("/");
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
          className="fixed top-0 right-0  w-1/2 h-screen object-cover"
          src={IllustrationLogin}
          alt="#"
        />
      </div>
    </main>
  );
}
