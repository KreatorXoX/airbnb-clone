"use client";

type Props = {
  onClick: () => void;
  label: string;
  bold?: boolean;
};

export default function AccountItem({ onClick, label, bold }: Props) {
  return (
    <div
      className={`${
        bold ? "font-medium" : ""
      } px-4 py-3 hover:bg-yellow-200/10 select-none`}
      onClick={onClick}
    >
      {label}
    </div>
  );
}
