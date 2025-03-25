import { useState } from "react";
import InputBox from "../../../components/general/InputBox";
import Button from "../../../components/general/Button";
import { useMutation } from "@apollo/client";
import { SUBMIT_ADVERTISER_STEP1 } from "../../../graphql/advertiser";
import { useAlert } from "../../../contexts/AlertContext";

const defaultRegisterData = {
  companyName: "",
  fullContactName: "",
  email: "",
};

type AdvRegisterStep1Props = {
  moveToStep2: () => void;
};

const AdvRegisterStep1 = ({ moveToStep2 }: AdvRegisterStep1Props) => {
  const { showAlert } = useAlert();

  const [submitAdvertiserStep1, { loading: submitAdvertiserStep1Loading }] =
    useMutation(SUBMIT_ADVERTISER_STEP1);

  const [registerData, setRegisterData] = useState(defaultRegisterData);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const validateInput = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!registerData.companyName) {
      return "Please enter company name";
    }
    if (!registerData.fullContactName) {
      return "Please enter full contact name";
    }
    if (!registerData.email) {
      return "Please enter email";
    }
    if (!emailRegex.test(registerData.email)) {
      return "Please enter a valid email";
    }
    return "";
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const validationResponse = validateInput();
    if (validationResponse) {
      showAlert({ type: "error", message: validationResponse });
      return;
    }

    try {
      const response = await submitAdvertiserStep1({
        variables: {
          companyName: registerData.companyName,
          fullContactName: registerData.fullContactName,
          email: registerData.email,
        },
      });
      if (response.data.submitAdvertiserStep1.success) {
        showAlert({
          type: "success",
          message: response.data.submitAdvertiserStep1.message,
        });
        moveToStep2();
      } else {
        showAlert({
          type: "error",
          message: response.data.submitAdvertiserStep1.message,
        });
      }
    } catch (error) {
      showAlert({
        type: "error",
        message: "Error submitting step 1",
      });
    }
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
