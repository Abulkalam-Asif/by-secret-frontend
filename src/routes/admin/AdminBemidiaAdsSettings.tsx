import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import InputBox from "../../components/general/InputBox";
import Button from "../../components/general/Button";
import {
  GET_BEMIDIA_ADS_SETTINGS,
  UPDATE_BEMIDIA_ADS_SETTINGS,
} from "../../graphql/bemidiaAdsSettings";
import { useAlert } from "../../contexts/AlertContext";
import Loader from "../../components/general/Loader";

interface BemidiaAdsSettingsData {
  costPerView: number;
  costPerClick: number;
  rewardPerView: number;
  rewardPerClick: number;
}

const defaultBemidiaAdsSettings: BemidiaAdsSettingsData = {
  costPerView: 0,
  costPerClick: 0,
  rewardPerView: 0,
  rewardPerClick: 0,
};

const AdminBemidiaAdsSettings = () => {
  const { showAlert } = useAlert();
  const [settings, setSettings] = useState<BemidiaAdsSettingsData>(
    defaultBemidiaAdsSettings
  );

  // Fetch current settings
  const { data, loading: fetchLoading } = useQuery(GET_BEMIDIA_ADS_SETTINGS);

  // Update settings mutation
  const [updateBemidiaAdsSettingsMutation, { loading: updatingSettings }] =
    useMutation(UPDATE_BEMIDIA_ADS_SETTINGS, {
      refetchQueries: [GET_BEMIDIA_ADS_SETTINGS],
    });

  // Load settings when data is available
  useEffect(() => {
    if (data?.getBemidiaAdsSettings) {
      setSettings(data.getBemidiaAdsSettings);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Convert string value to number, ensuring it's valid
    const numericValue = parseFloat(value) || 0;
    setSettings((prev) => ({ ...prev, [name]: numericValue }));
  };

  const validateInput = () => {
    if (settings.costPerView < 0) {
      return "Cost per view cannot be negative";
    }
    if (settings.costPerClick < 0) {
      return "Cost per click cannot be negative";
    }
    if (settings.rewardPerView < 0) {
      return "Reward per view cannot be negative";
    }
    if (settings.rewardPerClick < 0) {
      return "Reward per click cannot be negative";
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
      const response = await updateBemidiaAdsSettingsMutation({
        variables: {
          costPerView: settings.costPerView,
          costPerClick: settings.costPerClick,
          rewardPerView: settings.rewardPerView,
          rewardPerClick: settings.rewardPerClick,
        },
      });

      showAlert({
        message: response.data.updateBemidiaAdsSettings.message,
        type: response.data.updateBemidiaAdsSettings.success
          ? "success"
          : "error",
      });
    } catch {
      showAlert({
        message: "An error occurred while updating settings",
        type: "error",
      });
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    }).format(value);
  };

  return (
    <>
      <section>
        <div className="max-w-[450px] w-full mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8 text-theme-gray">
            <h1 className="text-2xl font-bold text-theme-gray">
              BeMidia Advertisement Settings
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Configure costs for advertisers and rewards for users
            </p>
          </div>
          {fetchLoading ? (
            <Loader text="Loading current settings..." />
          ) : (
            <form>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cost for advertisers per view
                  </label>
                  <InputBox
                    name="costPerView"
                    id="costPerView"
                    type="number"
                    value={settings.costPerView}
                    placeholder="0.01"
                    onChange={handleChange}
                    required={true}
                    disabled={updatingSettings}
                    className=""
                    step="0.00001"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Current value: {formatCurrency(settings.costPerView)} USD
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cost for advertisers per click
                  </label>
                  <InputBox
                    name="costPerClick"
                    id="costPerClick"
                    type="number"
                    value={settings.costPerClick}
                    placeholder="0.05"
                    onChange={handleChange}
                    required={true}
                    disabled={updatingSettings}
                    className=""
                    step="0.00001"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Current value: {formatCurrency(settings.costPerClick)} USD
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rewards for users per view
                  </label>
                  <InputBox
                    name="rewardPerView"
                    id="rewardPerView"
                    type="number"
                    value={settings.rewardPerView}
                    placeholder="0.005"
                    onChange={handleChange}
                    required={true}
                    disabled={updatingSettings}
                    className=""
                    step="0.00001"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Current value: {formatCurrency(settings.rewardPerView)} USD
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rewards for users per click
                  </label>
                  <InputBox
                    name="rewardPerClick"
                    id="rewardPerClick"
                    type="number"
                    value={settings.rewardPerClick}
                    placeholder="0.02"
                    onChange={handleChange}
                    required={true}
                    disabled={updatingSettings}
                    className=""
                    step="0.00001"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Current value: {formatCurrency(settings.rewardPerClick)} USD
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  text={
                    updatingSettings ? "Updating settings..." : "Save Settings"
                  }
                  disabled={updatingSettings || fetchLoading}
                  onClick={handleSubmit}
                />
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default AdminBemidiaAdsSettings;
