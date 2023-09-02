"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "../../../public/Logo.png";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import MenuIcon from "./icons/menu";

export default function NavbarComponent() {
  const route = useRouter();
  const pathname = usePathname();
  const navigation = [
    { title: "Top Up", href: "/topup" },
    { title: "Transaction", href: "/transaction" },
    { title: "Akun", href: "/akun" },
  ];
  return (
    <nav className="flex container m-auto w-full justify-between items-center py-4 px-5 sm:px-20">
      <Link href={"/"} className="flex gap-2 items-center">
        <Image src={Logo} alt="logo" />
        <h1 className="font-bold text-lg text-primary">SIMS PPOB</h1>
      </Link>
      <div className="sm:flex hidden gap-2">
        {navigation.map((e, i) => {
          return (
            <Button
              onPress={() => {
                route.push(e.href);
              }}
              key={i}
              variant={pathname != e.href ? "light" : "solid"}
              color="primary"
            >
              {e.title}
            </Button>
          );
        })}
      </div>
      <Dropdown>
        <DropdownTrigger>
          <button className="border rounded-md p-2">
            <MenuIcon className="h-6 fill-primary" />
          </button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          {navigation.map((e, i) => {
            return (
              <DropdownItem
                onPress={() => {
                  route.push(e.href);
                }}
                key={e.title}
              >
                {e.title}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    </nav>
  );
}
