import { Category } from "@/utils/categories";
import React from "react";
import CategoryIcon from "../CategoryIcon";

type Props = {
  category: Category;
};

export default function ListingCategory({ category }: Props) {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <div className="flex items-center gap-2">
        <CategoryIcon
          iconUrl={category?.iconUrl}
          label={category.label}
          selected
        />
        <h5 className="text-base">{category.label}</h5>
      </div>
      <span className="text-neutral-500">{category.description}</span>
    </div>
  );
}
