import { TailSpin } from "react-loader-spinner";

export const ButtonSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      {" "}
      <TailSpin width={20} height={20} color={"white"} />
    </div>
  );
};
