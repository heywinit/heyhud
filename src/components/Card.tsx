import React from "react";

export default function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border h-full w-full flex flex-col">
      <div className="px-2 bg-white text-black select-none cursor-cell">
        {title}
      </div>
      {children}
    </div>
  );
}
