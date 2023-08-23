"use client";

type Props = {
  children: React.ReactNode;
};

export default function ClientContainer({ children }: Props) {
  return (
    <div className="max-w-[2520px] mx-auto xl:px-16 md:px-8 px-6">
      {children}
    </div>
  );
}
