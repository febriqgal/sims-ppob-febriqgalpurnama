"use client";
import EmailIcon from "@/components/icons/email";
import PersonIcon from "@/components/icons/person";
import EditProfileModal from "@/components/modal/edit-profile";
import LogoutModal from "@/components/modal/logout";
import { Avatar, Input } from "@nextui-org/react";
export default function AkunPage() {
  return (
    <div className="flex flex-col justify-center items-center  ">
      <form className="space-y-4 flex justify-center flex-col items-center w-[300px]">
        <Avatar color="primary" className="w-[100px] h-[100px] " />
        <h1 className="font-bold">Febriqgal Purnama</h1>{" "}
        <Input
          defaultValue={"febriqgalp@gmail.com"}
          disabled
          labelPlacement="outside"
          startContent={<EmailIcon className="h-6 fill-primary" />}
          placeholder="Masukkan email"
          color="primary"
          variant="faded"
          label="Email"
        />
        <Input
          defaultValue={"Febriqgal"}
          disabled
          labelPlacement="outside"
          startContent={<PersonIcon className="h-6 fill-primary" />}
          placeholder="Masukkan Nama Depan"
          color="primary"
          variant="faded"
          label="Nama Depan"
        />
        <Input
          defaultValue={"Purnama"}
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
