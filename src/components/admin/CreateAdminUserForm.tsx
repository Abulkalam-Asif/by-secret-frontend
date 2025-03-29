import { useMutation } from "@apollo/client";
import { useState } from "react";
import InputBox from "../general/InputBox";
import Button from "../general/Button";
import Select from "../general/Select";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { calculatePasswordStrength } from "../../utils/passwordStrength/calculatePasswordStrength";
import { getStrengthColor } from "../../utils/passwordStrength/getStrengthColor";
import { getStrengthLabel } from "../../utils/passwordStrength/getStrengthLabel";
import { useAlert } from "../../contexts/AlertContext";
import { CREATE_ADMIN, GET_ALL_ADMINS } from "../../graphql/adminAuth";
import client from "../../apolloClient";

const defaultAdminUserData = {
  fullName: "",
  username: "",
  password: "",
  isActive: true,
};

const CreateAdminUserForm = () => {
  const { showAlert } = useAlert();

  const [createAdminMutation, { loading: creatingAdmin }] =
    useMutation(CREATE_ADMIN);
  const [showPassword, setShowPassword] = useState(false);

  const [adminUserData, setAdminUserData] = useState(defaultAdminUserData);

  // Calculate current password strength
  const passwordStrength = calculatePasswordStrength(adminUserData.password);
  const strengthColor = getStrengthColor(passwordStrength);
  const strengthLabel = getStrengthLabel(passwordStrength);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminUserData((prev) => ({ ...prev, [name]: value }));
  };

  const validateInput = () => {
    // check if the password contains at least 1 uppercase, 1 lowercase, 1 number, and 1 special character and must be at least 8 characters long
    const passwordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,}$"
    );

    if (adminUserData.fullName.trim() === "") {
      return "Full name is required";
    }
    if (adminUserData.username.trim() === "") {
      return "Username is required";
    }
    if (adminUserData.password.trim() === "") {
      return "Password is required";
    }
    if (!passwordRegex.test(adminUserData.password)) {
      return "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character";
    }
    return "";
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const validationResponse = validateInput();
    if (validationResponse) {
      showAlert({
        message: validationResponse,
        type: "error",
      });
      return;
    }

    try {
      const response = await createAdminMutation({
        variables: {
          fullName: adminUserData.fullName,
          username: adminUserData.username,
          password: adminUserData.password,
          isActive: adminUserData.isActive,
        },
      });
      if (response.data.createAdmin.success) {
        setAdminUserData(defaultAdminUserData);
        // Refetch the admin users data to include the newly created admin
        await client.refetchQueries({ include: [GET_ALL_ADMINS] });
      }
      showAlert({
        message: response.data.createAdmin.message,
        type: response.data.createAdmin.success ? "success" : "error",
      });
    } catch (err) {
      showAlert({
        message: "An error occurred while creating admin user",
        type: "error",
      });
    }
  };

  return (
    <>
      <div className="max-w-[450px] w-full mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8 text-theme-gray">
          <h1 className="text-2xl font-bold text-theme-gray">
            Create Admin User
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Fill in the form below to create a new admin user.
          </p>
        </div>

        <form>
          <div className="space-y-6">
            <InputBox
              name="fullName"
              id="fullName"
              type="text"
              value={adminUserData.fullName}
              placeholder="Full Name"
              onChange={handleChange}
              required={true}
              disabled={creatingAdmin}
              className=""
            />
            <InputBox
              name="username"
              id="username"
              type="text"
              value={adminUserData.username}
              placeholder="Username"
              onChange={handleChange}
              required={true}
              disabled={creatingAdmin}
              className=""
            />

            <div className="relative">
              <InputBox
                name="password"
                id="password"
                type={showPassword ? "text" : "password"}
                value={adminUserData.password}
                placeholder="Password"
                onChange={handleChange}
                required={true}
                disabled={creatingAdmin}
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

            {adminUserData.password && (
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
              id="isActive"
              value={adminUserData.isActive ? "true" : "false"}
              options={[
                { value: "true", label: "Active" },
                { value: "false", label: "Inactive" },
              ]}
              onChange={(e) =>
                setAdminUserData((prev) => ({
                  ...prev,
                  isActive: e.target.value === "true",
                }))
              }
              required={true}
              disabled={creatingAdmin}
            />
          </div>

          <div className="mt-8">
            <Button
              text={creatingAdmin ? "Creating Admin..." : "Create Admin"}
              disabled={creatingAdmin}
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateAdminUserForm;
