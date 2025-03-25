import { useState, useEffect } from "react";
import InputBox from "../../../components/general/InputBox";
import Button from "../../../components/general/Button";
import { calculatePasswordStrength } from "../../../utils/passwordStrength/calculatePasswordStrength";
import { getStrengthColor } from "../../../utils/passwordStrength/getStrengthColor";
import { getStrengthLabel } from "../../../utils/passwordStrength/getStrengthLabel";
import { useMutation } from "@apollo/client";
import { SUBMIT_ADVERTISER_STEP3 } from "../../../graphql/advertiser";
import { useNavigate, useLocation } from "react-router";
import ImageInput from "../../../components/general/ImageInput";

const defaultRegisterData = {
  password: "",
  repeatPassword: "",
  phone: "",
  address: "",
  logo: { file: null, base64: "" },
};

const AdvRegisterStep3 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState("");
  const [submitAdvertiserStep3, { loading: submitAdvertiserStep3Loading }] =
    useMutation(SUBMIT_ADVERTISER_STEP3);

  const [registerData, setRegisterData] = useState(defaultRegisterData);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlToken = searchParams.get("token");
    if (urlToken) {
      setToken(urlToken);
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const passwordStrength = calculatePasswordStrength(registerData.password);
  const strengthColor = getStrengthColor(passwordStrength);
  const strengthLabel = getStrengthLabel(passwordStrength);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!token) {
      alert("Missing verification token. Please use the link from your email.");
      return;
    }

    if (registerData.password !== registerData.repeatPassword) {
      alert("Passwords don't match");
      return;
    }

    if (!registerData.logo) {
      alert("Please upload a logo");
      return;
    }

    try {
      const result = await submitAdvertiserStep3({
        variables: {
          password: registerData.password,
          phone: registerData.phone,
          address: registerData.address,
          logo: registerData.logo.base64,
          token: token,
        },
      });

      if (result.data.submitAdvertiserStep3.success) {
        alert("Registration completed successfully!");
        navigate("/advertiser/login");
      } else {
        alert(
          result.data.submitAdvertiserStep3.message ||
            "Error completing registration"
        );
      }
    } catch (error) {
      alert("Error submitting step 3");
      console.error(error);
    }
  };

  return (
    <>
      <h2 className="font-semibold text-theme-gray mb-4">
        Step 3 of 3: Complete Your Profile
      </h2>
      <form>
        <div className="space-y-6">
          <InputBox
            name="password"
            id="password"
            type="password"
            value={registerData.password}
            placeholder="Password"
            onChange={handleChange}
            required={true}
          />
          {registerData.password && (
            <div className="mt-1">
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${strengthColor} h-2 rounded-full transition-all duration-300`}
                    style={{
                      width: `${(passwordStrength / 5) * 100}%`,
                    }}></div>
                </div>
                <span className="ml-2 text-xs text-gray-600 whitespace-nowrap">
                  {strengthLabel}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {passwordStrength < 3 &&
                  "For a strong password, include uppercase & lowercase letters, numbers, and special characters."}
              </p>
            </div>
          )}
          <InputBox
            name="repeatPassword"
            id="repeatPassword"
            type="password"
            value={registerData.repeatPassword}
            placeholder="Repeat Password"
            onChange={handleChange}
            required={true}
          />
          <InputBox
            name="phone"
            id="phone"
            type="text"
            value={registerData.phone}
            placeholder="Phone"
            onChange={handleChange}
            required={true}
          />
          <InputBox
            name="address"
            id="address"
            type="text"
            value={registerData.address}
            placeholder="Address"
            onChange={handleChange}
            required={true}
          />
          <ImageInput
            label="Upload Logo"
            idHtmlFor="logo"
            value={registerData.logo}
            onChange={handleChange}
          />
        </div>
        <Button
          text={submitAdvertiserStep3Loading ? "Submitting..." : "Submit"}
          disabled={submitAdvertiserStep3Loading}
          onClick={handleSubmit}
          className="mt-10"
        />
      </form>
    </>
  );
};

export default AdvRegisterStep3;
