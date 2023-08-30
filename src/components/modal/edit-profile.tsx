import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Avatar,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import EmailIcon from "../icons/email";
import PersonIcon from "../icons/person";
export default function EditProfileModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const route = useRouter();
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
                Edit Profile
              </ModalHeader>
              <ModalBody className="items-center flex">
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
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Batal
                </Button>
                <Button color="primary" onPress={onClose}>
                  Simpan
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
