"use client";
import { IUser } from "@/types";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import ClientContainer from "../components/ClientContainer";
import Heading from "../components/Heading";
import ListingItem from "../components/listing/ListingItem";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Listing } from "@prisma/client";

type Props = { properties?: Listing[] | null; currentUser: IUser };

export default function PropertiesClient({ properties, currentUser }: Props) {
  const [isDeleting, setIsDeleting] = useState<string>();
  const router = useRouter();
  const handleDelete = useCallback(
    (id: string) => {
      setIsDeleting(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted!");
          router.refresh();
        })
        .catch((err) => {
          toast.error("Something went wrong while deleting");
        })
        .finally(() => {
          setIsDeleting(undefined);
        });
    },
    [router]
  );
  return (
    <ClientContainer>
      <div className="relative pb-10 md:pb-0 pt-[7rem]">
        <Heading title="My Properties" subtitle="List of your properties" />

        <div className="mt-10 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-10">
          {properties?.map((property) => (
            <ListingItem
              key={property.id}
              actionId={property.id}
              onAction={handleDelete}
              actionLabel="Delete property"
              disabled={isDeleting === property.id}
              listing={property}
              currentUser={currentUser}
            />
          ))}
        </div>
      </div>
    </ClientContainer>
  );
}
