import { useState } from "react";
import InputBox from "../../../components/general/InputBox";
import Button from "../../../components/general/Button";
import { useMutation } from "@apollo/client";
import { SUBMIT_ADVERTISER_STEP1 } from "../../../graphql/advertiser";

const defaultRegisterData = {
  companyName: "",
  fullContactName: "",
  email: "",
};

type AdvRegisterStep1Props = {
  moveToStep2: () => void;
};

const AdvRegisterStep1 = ({ moveToStep2 }: AdvRegisterStep1Props) => {
  const [submitAdvertiserStep1, { loading: submitAdvertiserStep1Loading }] =
    useMutation(SUBMIT_ADVERTISER_STEP1);

  const [registerData, setRegisterData] = useState(defaultRegisterData);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await submitAdvertiserStep1({
        variables: {
          companyName: registerData.companyName,
          fullContactName: registerData.fullContactName,
          email: registerData.email,
        },
      });
    } catch (error) {
      alert("Error submitting step 1");
    }

    moveToStep2();
  };

  return (
    <>
      <h2 className="font-semibold text-theme-gray mb-8">
        Step 1 of 3: Enter your company details
      </h2>
      <form>
        <div className="space-y-6">
          <InputBox
            name="companyName"
            id="companyName"
            type="text"
            value={registerData.companyName}
            placeholder="Company Name"
            onChange={handleChange}
            required={true}
            disabled={false}
          />
          <InputBox
            name="fullContactName"
            id="fullContactName"
            type="text"
            value={registerData.fullContactName}
            placeholder="Full Contact Name"
            onChange={handleChange}
            required={true}
            disabled={false}
          />
          <InputBox
            name="email"
            id="email"
            type="email"
            value={registerData.email}
            placeholder="Email"
            onChange={handleChange}
            required={true}
            disabled={false}
          />
        </div>
        <Button
          text={submitAdvertiserStep1Loading ? "Loading..." : "Next"}
          disabled={submitAdvertiserStep1Loading}
          onClick={handleSubmit}
          className="mt-10"
        />
      </form>
    </>
  );
};

export default AdvRegisterStep1;
