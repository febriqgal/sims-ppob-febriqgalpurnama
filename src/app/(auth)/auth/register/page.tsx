"use client";
import InvisibleIcon from "@/components/Atoms/icons/invisible";
import PasswordIcon from "@/components/Atoms/icons/password";
import PersonIcon from "@/components/Atoms/icons/person";
import VisibleIcon from "@/components/Atoms/icons/visible";
import { Button, Input, Spinner } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import IllustrationLogin from "../../../../../public/Illustrasi Login.png";
import Logo from "../../../../../public/Logo.png";
import { Registrasi } from "./type";

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(true);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [loading, setLoading] = useState(false);
  const [disable, setdisable] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Registrasi>();
  const onSubmit: SubmitHandler<Registrasi> = async (data) => {
    try {
      setLoading(true);
      const res = await fetch(
        "${appConfig.urlApiNutech}/registration",

        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const resData = await res.json();

      if (resData.status == 0) {
        setLoading(false);
        toast.success("Registrasi berhasil silahkan login");
        reset();
      }
      if (resData.status == 102 && resData.message == "Email sudah terdaftar") {
        setLoading(false);
        toast.error("Email sudah terdaftar");
      }
      if (
        resData.status == 102 &&
        resData.message == "Paramter email tidak sesuai format"
      ) {
        setLoading(false);
        toast.error("Paramter email tidak sesuai format");
      }
      if (
        resData.status == 102 &&
        resData.message == "Password length minimal 8 karakter"
      ) {
        setLoading(false);
        toast.error("Password length minimal 8 karakter");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Terjadi kesalahan tidak terduga, silahkan coba lagi.");
      reset();
      setdisable(true);
    }
  };

  return (
    <main>
      <Toaster position="bottom-left" reverseOrder={false} />
      <div className="flex justify-between items-center">
        <div className="w-1/2 py-20 min-h-screen flex flex-col items-center justify-center">
          <div className="w-[350px]">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="text-xl font-bold text-center">
                <div className="flex gap-2 mb-4 items-center justify-center ">
                  <Image src={Logo} alt="Logo" />
                  <h1>SIMS PPOB</h1>
                </div>
                <h1>Lengkapi Data Untuk</h1>
                <h1>Membuat Akun</h1>
              </div>
              <Input
                maxLength={20}
                labelPlacement="outside"
                startContent={<PersonIcon className="h-6 fill-primary" />}
                variant="bordered"
                placeholder="Masukkan nama depan"
                color="primary"
                label="Nama Depan"
                type="text"
                {...register("first_name", { required: true })}
              />
              <Input
                maxLength={20}
                labelPlacement="outside"
                startContent={<PersonIcon className="h-6 fill-primary" />}
                variant="bordered"
                placeholder="Masukkan nama belakang"
                color="primary"
                label="Nama Belakang"
                type="text"
                {...register("last_name", { required: true })}
              />
              <Input
                maxLength={40}
                labelPlacement="outside"
                placeholder="Masukkan email"
                type="email"
                label="Email"
                color="primary"
                variant="bordered"
                className="w-full"
                {...register("email", { required: true })}
              />
              <Input
                maxLength={20}
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
                {...register("password", { required: true })}
              />
              <div>
                <Input
                  maxLength={20}
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
                  placeholder="Konfirmasi password"
                  color="primary"
                  label="Konfirmasi Password"
                  type={isVisible ? "password" : "text"}
                  {...register("confirmPassword", {
                    validate: (val: string) => {
                      if (watch("password") != val) {
                        return "Password Tidak sama";
                      }
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <h1 className="text-xs text-primary">Password tidak sama</h1>
                )}
              </div>

              <Button
                disabled={disable}
                type="submit"
                color="primary"
                className="w-full"
              >
                {loading ? <Spinner size="sm" color="white" /> : "Register"}
              </Button>
            </form>
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
