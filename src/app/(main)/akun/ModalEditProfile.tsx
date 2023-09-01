"use client";
import { useGetProfileQuery } from "@/redux/feature/membership/profile/profileSlice";
import { Profile } from "@/types/profile";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import PhotoProfile from "../../../../public/Profile Photo.png";
import EmailIcon from "../../../components/Atoms/icons/email";

import EditIcon from "@/components/Atoms/icons/edit";
import PersonIcon from "../../../components/Atoms/icons/person";
import { appConfig } from "@/constant/appConfig";
interface EditProfile {
  first_name: string;
  last_name: string;
}
export default function EditProfileModal() {
  const { register, handleSubmit } = useForm<EditProfile>();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({});
  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const { data: session }: any = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const resProfile = useGetProfileQuery(null);
  const dataProfile: Profile = resProfile.data?.data;
  const [loading, setLoading] = useState(false);

  const [disable, setdisable] = useState(false);

  const onSubmit: SubmitHandler<EditProfile> = async (data) => {
    try {
      setLoading(true);
      const res = await fetch(`${appConfig.urlApiNutech}/profile/update`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${session?.user?.token}`,
        },
      });

      const resData = await res.json();

      if (resData.status == 0) {
        setLoading(false);
        toast.success("Berhasil Update Profile");
        setdisable(true);
      }
      if (resData.status == 102) {
        setLoading(false);
        toast.error("Field harus diisi");
      }
      if (resData.status == 108) {
        setLoading(false);
        toast.error("Token tidak tidak valid atau kadaluwarsa");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Terjadi kesalahan tidak terduga, silahkan coba lagi.");
      setdisable(true);
    }
  };

  return (
    <>
      <Button onPress={onOpen} className="w-full" color="primary">
        Edit Profile
      </Button>
      <Modal
        isDismissable={false}
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {`Edit Profile ${dataProfile?.first_name}`}
              </ModalHeader>
              <ModalBody className="items-center flex">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 flex justify-center flex-col items-center w-[300px]"
                >
                  <div className="relative" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Image
                      src={PhotoProfile}
                      alt="#"
                      width={100}
                      height={100}
                      color="primary"
                    />
                    <EditIcon className="absolute h-6 bottom-0 right-0 fill-primary" />
                  </div>

                  <h1 className="font-bold">
                    {dataProfile.first_name + " " + dataProfile.last_name}
                  </h1>
                  <Input
                    disabled
                    defaultValue={dataProfile.email}
                    labelPlacement="outside"
                    startContent={<EmailIcon className="h-6 fill-primary" />}
                    placeholder="Masukkan email"
                    color="primary"
                    variant="faded"
                    label="Email"
                  />
                  <Input
                    defaultValue={dataProfile.first_name}
                    {...register("first_name")}
                    maxLength={20}
                    labelPlacement="outside"
                    startContent={<PersonIcon className="h-6 fill-primary" />}
                    placeholder="Masukkan Nama Depan"
                    color="primary"
                    variant="faded"
                    label="Nama Depan"
                  />
                  <Input
                    defaultValue={dataProfile.last_name}
                    {...register("last_name")}
                    maxLength={20}
                    labelPlacement="outside"
                    startContent={<PersonIcon className="h-6 fill-primary" />}
                    placeholder="Masukkan Nama Belakang"
                    color="primary"
                    variant="faded"
                    label="Nama Belakang"
                  />
                  <Button
                    disabled={disable}
                    className="w-full"
                    type="submit"
                    color="primary"
                  >
                    {loading ? <Spinner size="sm" color="white" /> : "Kirim"}
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
