import { useState } from "react";
import InputBox from "../../../components/general/InputBox";
import Button from "../../../components/general/Button";
import { calculatePasswordStrength } from "../../../utils/passwordStrength/calculatePasswordStrength";
import { getStrengthColor } from "../../../utils/passwordStrength/getStrengthColor";
import { getStrengthLabel } from "../../../utils/passwordStrength/getStrengthLabel";
import ImageInput from "../../../components/general/ImageInput";

const defaultRegisterData = {
  password: "",
  repeatPassword: "",
  phone: "",
  address: "",
  logo: null,
};

const AdvRegisterStep3 = () => {
  const [registerData, setRegisterData] = useState(defaultRegisterData);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const passwordStrength = calculatePasswordStrength(registerData.password);
  const strengthColor = getStrengthColor(passwordStrength);
  const strengthLabel = getStrengthLabel(passwordStrength);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
            value={registerData.logo}
            onChange={handleChange}
            idHtmlFor="logo"
          />
        </div>
        <Button
          // text={loading ? "Signing in..." : "Login"}
          text="Submit"
          // disabled={loading}
          onClick={handleSubmit}
          className="mt-10"
        />
      </form>
    </>
  );
};

export default AdvRegisterStep3;
