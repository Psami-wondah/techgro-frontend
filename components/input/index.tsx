import Image from "next/image";
import { ChangeEventHandler, useState } from "react";
import eye from "../../public/svgs/eye.svg";
import eyeOff from "../../public/svgs/eye-off.svg";

interface InputFieldProps {
  type: string;

  name: string;
  placeholder: string;
  value?: string | number | readonly string[] | undefined;
  id: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  readonly?: boolean;
  min?: string;
}

export const InputField = ({
  type,
  name,
  placeholder,
  value,
  id,
  onChange,
  readonly,
  min,
  ...props
}: InputFieldProps) => {
  const [typeState, setTypeState] = useState(type);
  const handleType = () => {
    if (typeState == "password") {
      setTypeState("text");
    } else {
      setTypeState("password");
    }
  };
  return (
    <div className="mb-4 relative">
      {/* <label className="block mb-1" htmlFor={name}>
        {label}
      </label> */}
      <input
        required
        onChange={onChange}
        id={id ? id : name}
        type={typeState}
        name={name}
        value={value}
        placeholder={placeholder}
        readOnly={readonly}
        min={min}
        {...props}
        className="py-2  border-b border-[#EAEAEA] focus:border-b-techgro-green focus:outline-none disabled:bg-gray-100 mt-1 block w-full placeholder:text-base"
      />
      {type == "password" && (
        <div
          className="absolute right-0 top-[30%] cursor-pointer"
          onClick={() => {
            handleType();
          }}
        >
          <Image
            className="w-6 "
            src={typeState == "password" ? eye : eyeOff}
            alt=""
          />
        </div>
      )}
    </div>
  );
};
