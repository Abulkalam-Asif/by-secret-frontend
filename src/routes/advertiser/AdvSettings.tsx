import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_ADVERTISER_SETTINGS,
  UPDATE_ADVERTISER_SETTINGS,
  CHANGE_ADVERTISER_PASSWORD,
} from "../../graphql/advertiserSettings";
import InputBox from "../../components/general/InputBox";
import ImageInput from "../../components/general/ImageInput";
import Button from "../../components/general/Button";
import { useAlert } from "../../contexts/AlertContext";
import Loader from "../../components/general/Loader";

const defaultSettings = {
  companyName: "",
  fullContactName: "",
  phone: "",
  address: "",
  logo: {
    file: null,
    base64: "",
    url: "",
  },
};

const defaultPasswordChange = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const AdvSettings = () => {
  const { showAlert } = useAlert();
  const { data, loading: loadingGetSettings } = useQuery(
    GET_ADVERTISER_SETTINGS
  );
  const [updateSettings, { loading: loadingUpdateSettings }] = useMutation(
    UPDATE_ADVERTISER_SETTINGS,
    {
      refetchQueries: [GET_ADVERTISER_SETTINGS],
    }
  );
  const [changePassword, { loading: loadingChangePassword }] = useMutation(
    CHANGE_ADVERTISER_PASSWORD
  );

  const [settings, setSettings] = useState(defaultSettings);
  const [passwordChange, setPasswordChange] = useState(defaultPasswordChange);

  useEffect(() => {
    if (data?.getAdvertiserSettings) {
      setSettings((prev) => ({
        ...prev,
        ...data.getAdvertiserSettings,
        logo: {
          file: null,
          base64: data.getAdvertiserSettings.logo || "",
          url: data.getAdvertiserSettings.logo || "",
        },
      }));
    }
  }, [data]);

  const settingsInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const passwordInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordChange((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveSettings = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const response = await updateSettings({
        variables: {
          ...settings,
          logo: settings.logo.base64,
        },
      });
      showAlert({
        message: response.data.updateAdvertiserSettings.message,
        type: response.data.updateAdvertiserSettings.success
          ? "success"
          : "error",
      });
    } catch (error) {
      showAlert({
        message: "An error occurred while saving settings.",
        type: "error",
      });
    }
  };

  const handleChangePassword = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (passwordChange.newPassword !== passwordChange.confirmPassword) {
      showAlert({
        message: "New passwords do not match",
        type: "error",
      });
      return;
    }

    try {
      const response = await changePassword({
        variables: {
          currentPassword: passwordChange.currentPassword,
          newPassword: passwordChange.newPassword,
        },
      });
      showAlert({
        message: response.data.changeAdvertiserPassword.message,
        type: response.data.changeAdvertiserPassword.success
          ? "success"
          : "error",
      });
      if (response.data.changeAdvertiserPassword.success) {
        setPasswordChange(defaultPasswordChange);
      }
    } catch (error) {
      showAlert({
        message: "An error occurred while changing password.",
        type: "error",
      });
    }
  };

  return (
    <>
      <section>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-theme-gray">
              Advertiser Settings
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Update your account settings here.
            </p>
          </div>

          <form>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <InputBox
                value={settings.companyName}
                onChange={settingsInputHandler}
                placeholder="Company Name"
                id="companyName"
                name="companyName"
                type="text"
                disabled={false}
              />
              <InputBox
                value={settings.fullContactName}
                onChange={settingsInputHandler}
                placeholder="Full Contact Name"
                id="fullContactName"
                name="fullContactName"
                type="text"
                disabled={false}
              />
              <div className="flex items-center justify-between gap-4">
                <ImageInput
                  label="Upload Logo"
                  value={settings.logo}
                  onChange={settingsInputHandler}
                  idHtmlFor="logo"
                  classNameOuter="w-full"
                />
                {(settings.logo.base64 || settings.logo.url) && (
                  <img
                    src={settings.logo.base64 || settings.logo.url}
                    alt="Logo Preview"
                    className="mt-2 h-20 w-20 object-contain rounded"
                  />
                )}
              </div>
              <InputBox
                value={settings.phone}
                onChange={settingsInputHandler}
                placeholder="Phone"
                id="phone"
                name="phone"
                type="text"
                disabled={false}
              />
              <InputBox
                value={settings.address}
                onChange={settingsInputHandler}
                placeholder="Address"
                id="address"
                name="address"
                type="text"
                disabled={false}
              />
            </div>

            <div className="mt-8">
              <Button
                text={loadingUpdateSettings ? "Saving..." : "Save Settings"}
                onClick={handleSaveSettings}
                disabled={loadingUpdateSettings}
              />
            </div>
          </form>

          <hr className="my-8 border-gray-200" />

          <div className="mb-8">
            <h2 className="text-xl font-bold text-theme-gray">
              Change Password
            </h2>
          </div>

          <form>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <InputBox
                value={passwordChange.currentPassword}
                onChange={passwordInputHandler}
                placeholder="Current Password"
                id="currentPassword"
                name="currentPassword"
                type="password"
                disabled={false}
              />
              <InputBox
                value={passwordChange.newPassword}
                onChange={passwordInputHandler}
                placeholder="New Password"
                id="newPassword"
                name="newPassword"
                type="password"
                disabled={false}
              />
              <InputBox
                value={passwordChange.confirmPassword}
                onChange={passwordInputHandler}
                placeholder="Confirm New Password"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                disabled={false}
              />
            </div>

            <div className="mt-8">
              <Button
                text={
                  loadingChangePassword
                    ? "Changing Password..."
                    : "Change Password"
                }
                onClick={handleChangePassword}
                disabled={loadingChangePassword}
              />
            </div>
          </form>
        </div>
      </section>
      {(loadingUpdateSettings || loadingChangePassword) && (
        <Loader text="Processing..." />
      )}
      {loadingGetSettings && <Loader text="Loading..." />}
    </>
  );
};

export default AdvSettings;
