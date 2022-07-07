import React from "react";

type InfoProps = {
  type: "error" | "info" | "success" | "warning";
  name: string;
  message: string;
};

export default function Info({ type, name, message }: InfoProps) {
  const error = "bg-red-500 text-red-200";
  const info = "bg-blue-500 text-white";
  const success = "bg-green-500 text-white";
  const warning = "bg-orange-500 text-white";
  const infoClass =
    type === "error"
      ? error
      : type === "info"
      ? info
      : type === "success"
      ? success
      : warning;

  return (
    <div
      className={`${infoClass} rounded-lg px-4 py-2 text-center mb-4 w-full`}
    >
      <h4 className="text-lg font-bold">{name}</h4>
      <p className="text-base">{message}</p>
    </div>
  );
}
