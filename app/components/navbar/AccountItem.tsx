"use client";

type Props = {
  onClick: () => void;
  label: string;
};

export default function AccountItem({ onClick, label }: Props) {
  return (
    <div
      className="px-4 py-3 hover:bg-yellow-200/10 select-none"
      onClick={onClick}
    >
      {label}
    </div>
  );
}
