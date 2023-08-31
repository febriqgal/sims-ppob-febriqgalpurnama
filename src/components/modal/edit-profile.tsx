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
  useDisclosure,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { SyntheticEvent, useState } from "react";
import { toast } from "react-hot-toast";
import PhotoProfile from "../../../public/Profile Photo.png";
import EmailIcon from "../icons/email";
import PersonIcon from "../icons/person";
export default function EditProfileModal() {
  const { data: session }: any = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const resProfile = useGetProfileQuery(null);
  const dataProfile: Profile = resProfile.data?.data;
  const handleUpdateProfile = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://take-home-test-api.nutech-integrasi.app/profile/update`,
        {
          method: "PUT",
          body: JSON.stringify({
            first_name: `${firstName}`,
            last_name: `${LastName}`,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${session?.user?.token}`,
          },
        }
      );

      const data = await res.json();
      console.log(data);
      if (data.status == 0) {
        toast.success("Berhasil Update Profile");
      }
      if (data.status == 102) {
        toast.error("Field harus diisi");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button onPress={onOpen} className="w-full" color="primary">
        Edit Profile
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {`Edit Profile ${dataProfile?.first_name}`}
              </ModalHeader>
              <ModalBody className="items-center flex">
                <form
                  onSubmit={handleUpdateProfile}
                  className="space-y-4 flex justify-center flex-col items-center w-[300px]"
                >
                  <Image
                    src={PhotoProfile}
                    alt="#"
                    width={100}
                    height={100}
                    color="primary"
                  />
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
                    onChange={(e: any) => {
                      setFirstName(e.target.value);
                    }}
                    defaultValue={dataProfile.first_name}
                    labelPlacement="outside"
                    startContent={<PersonIcon className="h-6 fill-primary" />}
                    placeholder="Masukkan Nama Depan"
                    color="primary"
                    variant="faded"
                    label="Nama Depan"
                  />
                  <Input
                    onChange={(e: any) => {
                      setLastName(e.target.value);
                    }}
                    defaultValue={dataProfile.last_name}
                    labelPlacement="outside"
                    startContent={<PersonIcon className="h-6 fill-primary" />}
                    placeholder="Masukkan Nama Belakang"
                    color="primary"
                    variant="faded"
                    label="Nama Belakang"
                  />
                  <Button className="w-full" type="submit" color="primary">
                    Simpan
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
