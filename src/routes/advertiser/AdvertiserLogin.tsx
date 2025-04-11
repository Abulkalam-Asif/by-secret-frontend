import { useState } from "react";
import InputBox from "../../components/general/InputBox";
import Button from "../../components/general/Button";
import { LOGIN_ADVERTISER } from "../../graphql/advertiser";
import { useMutation } from "@apollo/client";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../constants";
import { useAlert } from "../../contexts/AlertContext";
import { useNavigate } from "react-router";

const AdvertiserLogin = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const [loginAdvertiserMutation, { loading: loadingLoginAdvertiser }] =
    useMutation(LOGIN_ADVERTISER);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const validateInput = () => {
    if (!loginData.email) {
      return "Please enter email";
    }
    if (!loginData.password) {
      return "Please enter password";
    }
    if (!EMAIL_REGEX.test(loginData.email)) {
      return "Invalid email or password";
    }
    if (!PASSWORD_REGEX.test(loginData.password)) {
      return "Invalid email or password";
    }
    return "";
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const validationResponse = validateInput();
    if (validationResponse) {
      showAlert({
        type: "error",
        message: validationResponse,
      });
      return;
    }

    try {
      const response = await loginAdvertiserMutation({
        variables: {
          email: loginData.email,
          password: loginData.password,
        },
      });
      const { data } = response;

      showAlert({
        type: data.loginAdvertiser.success ? "success" : "error",
        message: data.loginAdvertiser.message,
      });
      if (data.loginAdvertiser.success) {
        navigate("/advertiser");
      }
    } catch (err) {
      showAlert({
        type: "error",
        message: "An error occurred while logging in",
      });
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[450px] w-full mx-auto p-8 md:p-12 rounded-xl bg-white shadow-lg">
        <div className="mb-8 text-theme-gray">
          <h1 className="text-xl mb-5 font-bold">Advertiser Login</h1>
          <h2 className="text-xs font-semibold">Login to your account</h2>
        </div>

        <form>
          <div className="space-y-6 mb-10">
            <InputBox
              name="email"
              id="email"
              type="email"
              value={loginData.email}
              placeholder="Email"
              onChange={handleChange}
              required={true}
              disabled={loadingLoginAdvertiser}
            />

            <InputBox
              name="password"
              id="password"
              type="password"
              value={loginData.password}
              placeholder="Password"
              onChange={handleChange}
              required={true}
              disabled={loadingLoginAdvertiser}
            />
          </div>

          <Button
            text={loadingLoginAdvertiser ? "Logging in..." : "Login"}
            disabled={loadingLoginAdvertiser}
            onClick={handleSubmit}
          />
        </form>
      </div>
    </section>
  );
};

export default AdvertiserLogin;
