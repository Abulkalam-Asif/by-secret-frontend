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
import { useAlert } from "../../../contexts/AlertContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

const defaultRegisterData = {
  password: "",
  repeatPassword: "",
  phone: "",
  address: "",
  logo: { file: null, base64: "" },
};

const AdvRegisterStep3 = () => {
  const { showAlert } = useAlert();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

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

  const validateInput = () => {
    // check if the password contains at least 1 uppercase, 1 lowercase, 1 number, and 1 special character and must be at least 8 characters long
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!token) {
      return "Invalid token. Please reclick the link from your email";
    }
    if (!registerData.password) {
      return "Please enter password";
    }
    if (!passwordRegex.test(registerData.password)) {
      return "Password requirement: at least 1 uppercase, 1 lowercase, 1 number, 1 special character, and minimum 8 characters";
    }
    if (!registerData.repeatPassword) {
      return "Please repeat password";
    }
    if (registerData.password !== registerData.repeatPassword) {
      return "Passwords don't match";
    }
    if (!registerData.phone) {
      return "Please enter phone";
    }
    if (!registerData.address) {
      return "Please enter address";
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
      const response = await submitAdvertiserStep3({
        variables: {
          password: registerData.password,
          phone: registerData.phone,
          address: registerData.address,
          logo: registerData.logo.base64,
          token: token,
        },
      });

      if (response.data.submitAdvertiserStep3.success) {
        showAlert({
          type: "success",
          message: response.data.submitAdvertiserStep3.message,
        });
        navigate("/");
      } else {
        showAlert({
          type: "error",
          message: response.data.submitAdvertiserStep3.message,
        });
      }
    } catch (error) {
      showAlert({
        type: "error",
        message: "Error submitting step 3",
      });
    }
  };

  return (
    <>
      <h2 className="font-semibold text-theme-gray mb-4">
        Step 3 of 3: Complete Your Profile
      </h2>
      <form>
        <div className="space-y-6">
          <div className="relative">
            <InputBox
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
              value={registerData.password}
              placeholder="Password"
              onChange={handleChange}
              required={true}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              title={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
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
          <div className="relative">
            <InputBox
              name="repeatPassword"
              id="repeatPassword"
              type={showRepeatPassword ? "text" : "password"}
              value={registerData.repeatPassword}
              placeholder="Repeat Password"
              onChange={handleChange}
              required={true}
            />
            <button
              type="button"
              onClick={() => setShowRepeatPassword((prev) => !prev)}
              title={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
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
