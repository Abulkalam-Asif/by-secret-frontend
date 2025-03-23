import { useState } from "react";
import InputBox from "../components/general/InputBox";
import Button from "../components/general/Button";
import { LOGIN_ADMIN } from "../graphql/adminAuth";
import { useNavigate } from "react-router";
import { useMutation } from "@apollo/client";

export default function Login() {
  const navigate = useNavigate();
  const [loginAdminMutation, { loading }] = useMutation(LOGIN_ADMIN);
  const [error, setError] = useState("");

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");
    try {
      const response = await loginAdminMutation({
        variables: {
          username: loginData.username,
          password: loginData.password,
        },
      });
      console.log(response);
      const data = response.data;
      if (data.loginAdmin.success) {
        navigate("/admin");
      }
      alert(data.loginAdmin.message);
    } catch (err) {
      setError("An error occurred during login");
      console.error(err);
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

          {error && (
            <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-md">
              {error}
            </div>
          )}

          <form>
            <div className="space-y-6">
              <InputBox
                name="username"
                id="username"
                type="text"
                value={loginData.username}
                placeholder="Username"
                onChange={handleChange}
                required={true}
                disabled={loading}
                className=""
              />

              <InputBox
                name="password"
                id="password"
                type="password"
                value={loginData.password}
                placeholder="Password"
                onChange={handleChange}
                required={true}
                disabled={loading}
                className=""
              />
            </div>

            <div className="flex items-center justify-between my-10">
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-theme-blue hover:text-theme-gray">
                  Register as Advertiser
                </a>
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
              text={loading ? "Signing in..." : "Login"}
              disabled={loading}
              onClick={handleSubmit}
            />
          </form>
        </div>
      </section>
    </>
  );
}
