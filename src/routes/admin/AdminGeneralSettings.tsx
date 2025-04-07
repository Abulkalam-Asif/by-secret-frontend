import { useRef, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_ADMIN_GENERAL_SETTINGS,
  UPDATE_ADMIN_GENERAL_SETTINGS,
} from "../../graphql/adminGeneralSettings";
import InputBox from "../../components/general/InputBox";
import ImageInput from "../../components/general/ImageInput";
import JoditEditor from "jodit-react";
import Button from "../../components/general/Button";
import { useAlert } from "../../contexts/AlertContext";
import Loader from "../../components/general/Loader";
import { EMAIL_REGEX } from "../../constants";

const defaultSettings = {
  companyName: "",
  logo: {
    file: null,
    base64: "",
    url: "",
  },
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  country: "",
  zipCode: "",
  stripePublishableKey: "",
  stripePrivateKey: "",
  googleMapsApiKey: "",
  oneLoginPublishableKey: "",
  oneLoginPrivateKey: "",
  smtpHost: "",
  smtpPort: "",
  smtpUsername: "",
  smtpPassword: "",
  smtpFromEmail: "",
  smtpFromName: "",
};

const AdminGeneralSettings = () => {
  const { showAlert } = useAlert();
  const { data, loading: loadingGetAdminGeneralSettings } = useQuery(
    GET_ADMIN_GENERAL_SETTINGS
  );
  const [
    updateAdminGeneralSettings,
    { loading: loadingUpdateAdminGeneralSettings },
  ] = useMutation(UPDATE_ADMIN_GENERAL_SETTINGS, {
    refetchQueries: [GET_ADMIN_GENERAL_SETTINGS],
  });

  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    if (data?.getAdminGeneralSettings) {
      setSettings((prev) => ({
        ...prev,
        ...data.getAdminGeneralSettings,
        logo: {
          file: null,
          base64: data.getAdminGeneralSettings.logo || "",
          url: data.getAdminGeneralSettings.logo || "",
        },
      }));
      setTermsAndConditionsContent(
        data.getAdminGeneralSettings.termsAndConditions || ""
      );
      setPrivacyPolicyContent(data.getAdminGeneralSettings.privacyPolicy || "");
    }
  }, [data]);

  const settingsInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateEmail = () => {
    if (settings.email && !EMAIL_REGEX.test(settings.email)) {
      return "Invalid email format";
    }
    if (settings.smtpFromEmail && !EMAIL_REGEX.test(settings.smtpFromEmail)) {
      return "Invalid SMTP From Email format";
    }
    return "";
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    const emailError = validateEmail();
    if (emailError) {
      showAlert({
        message: emailError,
        type: "error",
      });
      return;
    }

    try {
      const response = await updateAdminGeneralSettings({
        variables: {
          ...{
            ...settings,
            logo: settings.logo.base64,
          },
          termsAndConditions: termsAndConditionsContent,
          privacyPolicy: privacyPolicyContent,
        },
      });
      showAlert({
        message: response.data.updateAdminGeneralSettings.message,
        type: response.data.updateAdminGeneralSettings.success
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

  // Terms and Conditions WYSIWYG editor
  const termsAndConditionsRef = useRef(null);
  const [termsAndConditionsContent, setTermsAndConditionsContent] =
    useState("");

  const privacyPolicyRef = useRef(null);
  const [privacyPolicyContent, setPrivacyPolicyContent] = useState("");

  return (
    <>
      <section>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-theme-gray">
              General Settings
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Update the general settings here.
            </p>
          </div>
          <form>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <InputBox
                value={settings.companyName}
                onChange={settingsInputHandler}
                placeholder="Company Name"
                id="companyName"
                name="companyName"
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
                value={settings.email}
                onChange={settingsInputHandler}
                placeholder="Email"
                id="email"
                name="email"
                type="email"
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
              <InputBox
                value={settings.city}
                onChange={settingsInputHandler}
                placeholder="City"
                id="city"
                name="city"
                type="text"
                disabled={false}
              />
              <InputBox
                value={settings.state}
                onChange={settingsInputHandler}
                placeholder="State"
                id="state"
                name="state"
                type="text"
                disabled={false}
              />
              <InputBox
                value={settings.country}
                onChange={settingsInputHandler}
                placeholder="Country"
                id="country"
                name="country"
                type="text"
                disabled={false}
              />
              <InputBox
                value={settings.zipCode}
                onChange={settingsInputHandler}
                placeholder="Zip Code"
                id="zipCode"
                name="zipCode"
                type="text"
                disabled={false}
              />
            </div>
            <hr className="my-8 border-gray-200" />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Terms and Conditions
              </label>
              <JoditEditor
                ref={termsAndConditionsRef}
                value={termsAndConditionsContent}
                config={{
                  placeholder: "Write your terms and conditions here...",
                }}
                tabIndex={1}
                onBlur={(newContent: string) =>
                  setTermsAndConditionsContent(newContent)
                }
                onChange={(newContent: string) =>
                  setTermsAndConditionsContent(newContent)
                }
              />
            </div>
            <hr className="my-8 border-gray-200" />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Privacy Policy
              </label>
              <JoditEditor
                ref={privacyPolicyRef}
                value={privacyPolicyContent}
                tabIndex={1}
                config={{
                  placeholder: "Write your privacy policy here...",
                }}
                onBlur={(newContent: string) =>
                  setPrivacyPolicyContent(newContent)
                }
                onChange={(newContent: string) =>
                  setPrivacyPolicyContent(newContent)
                }
              />
            </div>
            <hr className="my-8 border-gray-200" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <InputBox
                value={settings.stripePublishableKey}
                onChange={settingsInputHandler}
                placeholder="Stripe Publishable Key"
                id="stripePublishableKey"
                name="stripePublishableKey"
                type="text"
                disabled={false}
              />
              <InputBox
                value={settings.stripePrivateKey}
                onChange={settingsInputHandler}
                placeholder="Stripe Private Key"
                id="stripePrivateKey"
                name="stripePrivateKey"
                type="text"
                disabled={false}
              />
              <InputBox
                value={settings.googleMapsApiKey}
                onChange={settingsInputHandler}
                placeholder="Google Maps API Key"
                id="googleMapsApiKey"
                name="googleMapsApiKey"
                type="text"
                disabled={false}
              />
              <InputBox
                value={settings.oneLoginPublishableKey}
                onChange={settingsInputHandler}
                placeholder="OneLogin Publishable Key"
                id="oneLoginPublishableKey"
                name="oneLoginPublishableKey"
                type="text"
                disabled={false}
              />
              <InputBox
                value={settings.oneLoginPrivateKey}
                onChange={settingsInputHandler}
                placeholder="OneLogin Private Key"
                id="oneLoginPrivateKey"
                name="oneLoginPrivateKey"
                type="text"
                disabled={false}
              />
              <InputBox
                value={settings.smtpHost}
                onChange={settingsInputHandler}
                placeholder="SMTP Host"
                id="smtpHost"
                name="smtpHost"
                type="text"
                disabled={false}
              />
              <InputBox
                value={settings.smtpPort}
                onChange={settingsInputHandler}
                placeholder="SMTP Port"
                id="smtpPort"
                name="smtpPort"
                type="text"
                disabled={false}
              />
              <InputBox
                value={settings.smtpUsername}
                onChange={settingsInputHandler}
                placeholder="SMTP Username"
                id="smtpUsername"
                name="smtpUsername"
                type="text"
                disabled={false}
              />
              <InputBox
                value={settings.smtpPassword}
                onChange={settingsInputHandler}
                placeholder="SMTP Password"
                id="smtpPassword"
                name="smtpPassword"
                type="text"
                disabled={false}
              />
              <InputBox
                value={settings.smtpFromEmail}
                onChange={settingsInputHandler}
                placeholder="SMTP From Email"
                id="smtpFromEmail"
                name="smtpFromEmail"
                type="email"
                disabled={false}
              />
              <InputBox
                value={settings.smtpFromName}
                onChange={settingsInputHandler}
                placeholder="SMTP From Name"
                id="smtpFromName"
                name="smtpFromName"
                type="text"
                disabled={false}
              />
            </div>
            <div className="mt-8">
              <Button
                text={
                  loadingUpdateAdminGeneralSettings
                    ? "Saving..."
                    : "Save Settings"
                }
                onClick={handleSave}
                disabled={loadingUpdateAdminGeneralSettings}
              />
            </div>
          </form>
        </div>
      </section>
      {loadingUpdateAdminGeneralSettings && (
        <Loader text="Saving settings..." />
      )}
      {loadingGetAdminGeneralSettings && <Loader text="Loading..." />}
    </>
  );
};

export default AdminGeneralSettings;
