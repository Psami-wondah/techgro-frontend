import { TailSpin } from "react-loader-spinner";

export const ButtonSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      {" "}
      <TailSpin width={20} height={20} color={"white"} />
    </div>
  );
};

export const Loader = () => {
  return (
    <div className=" flex justify-center w-full h-screen items-center">
      <TailSpin color="#81E291" width={80} height={80} />
    </div>
  );
};
