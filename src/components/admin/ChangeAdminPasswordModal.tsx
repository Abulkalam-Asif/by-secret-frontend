import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useMutation } from "@apollo/client";
import { CHANGE_ADMIN_PASSWORD } from "../../graphql/adminAuth";
import { useAlert } from "../../contexts/AlertContext";
import { calculatePasswordStrength } from "../../utils/passwordStrength/calculatePasswordStrength";
import { getStrengthColor } from "../../utils/passwordStrength/getStrengthColor";
import { getStrengthLabel } from "../../utils/passwordStrength/getStrengthLabel";
import { PASSWORD_REGEX } from "../../constants";
import InputBox from "../general/InputBox";
import Button from "../general/Button";

type ChangeAdminPasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
  adminEmail: string;
};

const ChangeAdminPasswordModal = ({
  isOpen,
  onClose,
  adminEmail,
}: ChangeAdminPasswordModalProps) => {
  const { showAlert } = useAlert();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [changePasswordMutation, { loading }] = useMutation(
    CHANGE_ADMIN_PASSWORD
  );

  // Calculate current password strength
  const passwordStrength = calculatePasswordStrength(newPassword);
  const strengthColor = getStrengthColor(passwordStrength);
  const strengthLabel = getStrengthLabel(passwordStrength);

  const validatePassword = () => {
    if (newPassword.trim() === "") {
      return "Password is required";
    }
    if (!PASSWORD_REGEX.test(newPassword)) {
      return "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }
    if (newPassword !== confirmPassword) {
      return "Passwords do not match";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validatePassword();
    if (validationError) {
      showAlert({
        message: validationError,
        type: "error",
      });
      return;
    }

    try {
      const response = await changePasswordMutation({
        variables: {
          email: adminEmail,
          newPassword,
        },
      });

      if (response.data.changeAdminPassword.success) {
        showAlert({
          message: response.data.changeAdminPassword.message,
          type: "success",
        });
        setNewPassword("");
        setConfirmPassword("");
        onClose();
      } else {
        showAlert({
          message: response.data.changeAdminPassword.message,
          type: "error",
        });
      }
    } catch (error) {
      showAlert({
        message: "An error occurred while changing the password",
        type: "error",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-lg">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-theme-gray mb-4">
          Change Admin Password
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Set a new password for {adminEmail}
        </p>

        <form>
          <div className="space-y-4">
            <div className="relative">
              <InputBox
                name="newPassword"
                id="newPassword"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                placeholder="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                required={true}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                title={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {newPassword && (
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
                name="confirmPassword"
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required={true}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                title={showConfirmPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-4">
            <Button
              text="Cancel"
              onClick={onClose}
              disabled={loading}
              type="button"
            />
            <Button
              text={loading ? "Updating..." : "Update Password"}
              disabled={loading}
              type="submit"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeAdminPasswordModal;
