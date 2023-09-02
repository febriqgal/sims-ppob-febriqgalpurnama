"use client";
import EmailIcon from "@/components/Atoms/icons/email";
import PersonIcon from "@/components/Atoms/icons/person";
import EditProfileModal from "@/app/(main)/akun/ModalEditProfile";
import LogoutModal from "@/app/(main)/akun/ModalLogout";
import { useGetProfileQuery } from "@/redux/feature/membership/profile/profileSlice";
import { Profile } from "@/types/profile";
import { Input } from "@nextui-org/react";
import Image from "next/image";
import PhotoProfile from "../../../../public/Profile Photo.png";
import AkunSkeleton from "./Skeleton";

export default function AkunSection() {
  const { isLoading, data } = useGetProfileQuery(null);
  const dataProfile: Profile = data?.data;

  if (isLoading) {
    return <AkunSkeleton />;
  }
  return (
    <div className="space-y-4 w-full flex justify-center flex-col items-center sm:w-[300px]">
      <Image
        alt="#"
        height={100}
        width={100}
        color="primary"
        src={PhotoProfile}
      />
      <h1 className="font-bold">
        {`${dataProfile?.first_name} ${dataProfile?.last_name}`}
      </h1>{" "}
      <Input
        defaultValue={dataProfile?.email}
        disabled
        labelPlacement="outside"
        startContent={<EmailIcon className="h-6 fill-primary" />}
        placeholder="Masukkan email"
        color="primary"
        variant="faded"
        label="Email"
      />
      <Input
        defaultValue={dataProfile?.first_name}
        disabled
        labelPlacement="outside"
        startContent={<PersonIcon className="h-6 fill-primary" />}
        placeholder="Masukkan Nama Depan"
        color="primary"
        variant="faded"
        label="Nama Depan"
      />
      <Input
        defaultValue={dataProfile?.last_name}
        disabled
        labelPlacement="outside"
        startContent={<PersonIcon className="h-6 fill-primary" />}
        placeholder="Masukkan Nama Belakang"
        color="primary"
        variant="faded"
        label="Nama Belakang"
      />
      <div className="w-full space-y-2">
        <EditProfileModal />
        <LogoutModal />
      </div>
    </div>
  );
}
