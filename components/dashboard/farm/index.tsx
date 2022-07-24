import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import farmAtom from "../../../atom/farm.atom";
import useCreateFarm, { useGetFarms } from "../../../hooks/farm.hook";
import { Auth } from "../../../services/storage";
import Info from "../../info";
import { InputField } from "../../input";
import { ButtonSpinner, Loader } from "../../loader";

const Farm = () => {
  const { refetch, isFetching } = useGetFarms();
  const { mutate, isLoading } = useCreateFarm();
  const [err, setErr] = useState("");
  const [data, setData] = useState({
    name: "",
    key: "",
  });

  const submitFarm = () => {
    const { name, key } = data;
    if (name.trim() === "" || name === null) {
      return setErr("please enter a name");
    }
    if (key.trim() === "" || key === null) {
      return setErr("please enter a key");
    }
    setErr("");
    mutate(data, {
      onSuccess: () => {
        refetch();
      },
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value.trim(),
    });
  };

  const farms = useRecoilValue(farmAtom);
  useEffect(() => {
    refetch();
  }, [farmAtom]); // eslint-disable-line
  return (
    <div className="pt-16">
      <div>
        <p className="  font-[600] text-3xl tracking-wider">Add Farm</p>
        <div className="pt-5">
          {err && <Info type="warning" name="Error" message={err} />}
          <form>
            <InputField
              placeholder="Name"
              type="text"
              name="name"
              id="name"
              onChange={(e) => handleChange(e)}
            />
            <InputField
              placeholder="Key"
              type="text"
              name="key"
              id="key"
              onChange={(e) => handleChange(e)}
            />
            <div className="text-center">
              <button
                type="button"
                onClick={() => submitFarm()}
                className="bg-techgro-green py-[10px] w-[70%] font-[700] text-white rounded-[9px] mt-5 hover:opacity-50 transition ease-out duration-150"
              >
                {isLoading ? <ButtonSpinner /> : "Add this Farm"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div>
        {isFetching ? (
          <Loader />
        ) : (
          farms.map((farm, index) => <div key={index}>{farm.name}</div>)
        )}
      </div>
    </div>
  );
};

export default Farm;
