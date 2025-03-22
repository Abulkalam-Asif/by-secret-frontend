import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../graphql/user";
import { useState } from "react";
import InputBox from "../../components/general/InputBox";
import Button from "../../components/general/Button";
import Select from "../../components/general/Select";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { calculatePasswordStrength } from "../../utils/passwordStrength/calculatePasswordStrength";
import { getStrengthColor } from "../../utils/passwordStrength/getStrengthColor";
import { getStrengthLabel } from "../../utils/passwordStrength/getStrengthLabel";

const deafaaultUserData = {
  fullName: "",
  email: "",
  password: "",
  isActive: true,
};

const AdminUser = () => {
  const [createUserMuattion, { loading }] = useMutation(CREATE_USER);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [userData, setUserData] = useState(deafaaultUserData);

  // Calculate current password strength
  const passwordStrength = calculatePasswordStrength(userData.password);
  const strengthColor = getStrengthColor(passwordStrength);
  const strengthLabel = getStrengthLabel(passwordStrength);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const validateInput = () => {
    if (userData.fullName.trim() === "") {
      setError("Full name is required");
      return false;
    }
    if (userData.email.trim() === "") {
      setError("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      setError("Invalid email address");
      return false;
    }
    if (userData.password.trim() === "") {
      setError("Password is required");
      return false;
    }
    if (passwordStrength < 3) {
      setError(
        "Password is weak. Include uppercase & lowercase letters, numbers, and special characters."
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validateInput()) return;
    setError("");
    try {
      const response = await createUserMuattion({
        variables: {
          fullName: userData.fullName,
          email: userData.email,
          password: userData.password,
          isActive: userData.isActive,
        },
      });
      if (response.data.createUser.success) {
        setUserData(deafaaultUserData);
      }
      alert(response.data.createUser.message);
    } catch (err) {
      setError("An error occurred while creating user");
      console.error(err);
    }
  };

  return (
    <>
      <section className="bg-gray-50">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8 text-theme-gray">
            <h1 className="text-2xl font-bold text-theme-gray">Create User</h1>
            <p className="text-sm text-gray-500 mt-2">
              Create a new user account
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-md">
              {error}
            </div>
          )}

          <form>
            <div className="space-y-6">
              <InputBox
                name="fullName"
                idHtmlFor="fullName"
                type="text"
                value={userData.fullName}
                placeholder="Full Name"
                onChange={handleChange}
                required={true}
                disabled={loading}
                className=""
              />
              <InputBox
                name="email"
                idHtmlFor="email"
                type="email"
                value={userData.email}
                placeholder="Email"
                onChange={handleChange}
                required={true}
                disabled={loading}
                className=""
              />

              <div className="relative">
                <InputBox
                  name="password"
                  idHtmlFor="password"
                  type={showPassword ? "text" : "password"}
                  value={userData.password}
                  placeholder="Password"
                  onChange={handleChange}
                  required={true}
                  disabled={loading}
                  className=""
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  title={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {userData.password && (
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

              <Select
                name="isActive"
                idHtmlFor="isActive"
                value={userData.isActive ? "true" : "false"}
                options={[
                  { value: "true", label: "Active" },
                  { value: "false", label: "Inactive" },
                ]}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    isActive: e.target.value === "true",
                  }))
                }
                required={true}
                disabled={loading}
              />
            </div>

            <div className="mt-8">
              <Button
                text={loading ? "Creating user..." : "Create User"}
                disabled={loading}
                onClick={handleSubmit}
              />
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AdminUser;
