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
      <div className="px-2 bg-p text-white font-bold select-none cursor-cell">
        <span style={{ textShadow: "0 0 16px #fff" }}>{title}</span>
      </div>
      {children}
    </div>
  );
}
