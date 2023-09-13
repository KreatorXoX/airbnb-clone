"use client";
import ClientContainer from "../components/ClientContainer";
import Heading from "../components/Heading";

import { IUser } from "@/types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BiSolidUserCircle } from "react-icons/bi";
import { useRentalModal } from "../hooks/useRent";
import Button from "../components/Button";
import { signOut } from "next-auth/react";
import {
  PiUserCircleLight,
  PiPower,
  PiGear,
  PiHouse,
  PiBook,
} from "react-icons/pi";

type Props = { currentUser: IUser };

export default function ProfileClient({ currentUser }: Props) {
  const router = useRouter();
  const openRental = useRentalModal().onOpen;
  return (
    <ClientContainer>
      <div className="relative pb-10 md:pb-0 pt-[7rem]">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-10">
          <div className="relative rounded-full">
            {currentUser?.image ? (
              <Image
                className="object-cover rounded-full"
                width={50}
                height={50}
                src={`${currentUser.image}`}
                alt={`${currentUser.name}`}
              />
            ) : (
              <BiSolidUserCircle className="text-gray-500" size={50} />
            )}
          </div>
          <Heading
            title={`Welcome back, ${currentUser.name}`}
            subtitle="You can adjust your settings from here"
          />
        </div>
        <div className=" max-w-2xl mx-auto flex flex-col justify-center mt-10 gap-10">
          <div
            onClick={() => {
              openRental();
            }}
            className="hover:cursor-pointer flex items-center justify-between px-5 py-10 border rounded-xl shadow-md"
          >
            <div className="flex-col justify-center gap-1">
              <h2 className="font-medium text-xl">Airbnb your place</h2>
              <h5 className="font-light text-neutral-600">
                It&rsquo;s simple to get set up and start earning
              </h5>
            </div>

            <Image
              src="/images/airbnbYourHome.jpeg"
              width={100}
              height={100}
              alt="houseLogo"
              className=" aspect-square"
            />
          </div>
          <div className="flex flex-col gap-6 md:gap-14">
            <button className="flex gap-3 items-center">
              <PiUserCircleLight size={28} />
              <h3 className="font-light">Personal info</h3>
            </button>
            <button className="flex gap-3 items-center">
              <PiGear size={28} />
              <h3 className="font-light">Account</h3>
            </button>
            <button
              onClick={() => router.push("/reservations")}
              className="flex gap-3 items-center"
            >
              <PiBook size={28} />
              <h3 className="font-light">My Reservations</h3>
            </button>
            <button
              onClick={() => router.push("/my-properties")}
              className="flex gap-3 items-center"
            >
              <PiHouse size={28} />
              <h3 className="font-light">My Properties</h3>
            </button>
          </div>
          <hr />
          <div className="pb-10">
            <Button
              outline
              label="Logout"
              onClick={() =>
                signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}` })
              }
              icon={PiPower}
            />
          </div>
        </div>
      </div>
    </ClientContainer>
  );
}
