import { useState } from "react";
import InputBox from "../components/general/InputBox";
import Button from "../components/general/Button";
import { LOGIN_ADMIN } from "../graphql/adminAuth";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@apollo/client";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../constants";
import { useAlert } from "../contexts/AlertContext";

export default function Login() {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const [loginAdminMutation, { loading: loadingLoginAdmin }] =
    useMutation(LOGIN_ADMIN);

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
      const response = await loginAdminMutation({
        variables: {
          email: loginData.email,
          password: loginData.password,
        },
      });
      const { data } = response;

      showAlert({
        type: data.loginAdmin.success ? "success" : "error",
        message: data.loginAdmin.message,
      });
      if (data.loginAdmin.success) {
        // Cookie is automatically stored by the browser
        localStorage.setItem("isLoggedIn", "true");
        navigate("/admin");
      }
    } catch (err) {
      showAlert({
        type: "error",
        message: "An error occurred while logging in",
      });
    }
  };

  return (
    <>
      <section className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[450px] w-full mx-auto p-8 md:p-12 rounded-xl bg-white shadow-lg">
          <div className="mb-8 text-theme-gray">
            <h1 className="text-xl mb-5 font-bold">Login</h1>
            <h2 className="text-xs font-semibold">Login to your account </h2>
          </div>

          <form>
            <div className="space-y-6">
              <InputBox
                name="email"
                id="email"
                type="email"
                value={loginData.email}
                placeholder="Email"
                onChange={handleChange}
                required={true}
                disabled={loadingLoginAdmin}
              />

              <InputBox
                name="password"
                id="password"
                type="password"
                value={loginData.password}
                placeholder="Password"
                onChange={handleChange}
                required={true}
                disabled={loadingLoginAdmin}
              />
            </div>

            <div className="flex items-center justify-between my-10">
              <div className="text-sm">
                <Link
                  to="/advertiser-register"
                  className="font-medium text-theme-blue hover:text-theme-gray">
                  Register as Advertiser
                </Link>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-theme-blue hover:text-theme-gray">
                  Forgot password?
                </a>
              </div>
            </div>

            <Button
              text={loadingLoginAdmin ? "Loggin in..." : "Login"}
              disabled={loadingLoginAdmin}
              onClick={handleSubmit}
            />
          </form>
        </div>
      </section>
    </>
  );
}
