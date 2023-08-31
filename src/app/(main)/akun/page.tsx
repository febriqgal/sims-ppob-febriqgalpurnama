"use client";
import EmailIcon from "@/components/icons/email";
import PersonIcon from "@/components/icons/person";
import EditProfileModal from "@/components/modal/edit-profile";
import LogoutModal from "@/components/modal/logout";
import { useGetProfileQuery } from "@/redux/feature/membership/profile/profileSlice";
import { Profile } from "@/types/profile";
import { Input, Spinner } from "@nextui-org/react";
import Image from "next/image";
import PhotoProfile from "../../../../public/Profile Photo.png";
export default function AkunPage() {
  const { isLoading, data } = useGetProfileQuery(null);
  const dataProfile: Profile = data?.data;
  console.log(dataProfile);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center  ">
      <form className="space-y-4 flex justify-center flex-col items-center w-[300px]">
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
      </form>
    </div>
  );
}
