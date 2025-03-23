import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import InputBox from "../../components/general/InputBox";
import Button from "../../components/general/Button";
import { getAdsSetting, updateAdsSetting } from "../../graphql/adsSetting";

interface AdsSettingData {
  costPerView: number;
  costPerClick: number;
  rewardPerView: number;
  rewardPerClick: number;
}

const defaultAdsSettings: AdsSettingData = {
  costPerView: 0,
  costPerClick: 0,
  rewardPerView: 0,
  rewardPerClick: 0,
};

const AdminAdsSetting = () => {
  const [settings, setSettings] = useState<AdsSettingData>(defaultAdsSettings);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch current settings
  const { data, loading: fetchLoading } = useQuery(getAdsSetting);

  // Update settings mutation
  const [updateAdsSettingMutation, { loading: updateLoading }] =
    useMutation(updateAdsSetting);

  // Load settings when data is available
  useEffect(() => {
    if (data?.getAdsSetting) {
      setSettings(data.getAdsSetting);
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
      setError("Cost per view cannot be negative");
      return false;
    }
    if (settings.costPerClick < 0) {
      setError("Cost per click cannot be negative");
      return false;
    }
    if (settings.rewardPerView < 0) {
      setError("Reward per view cannot be negative");
      return false;
    }
    if (settings.rewardPerClick < 0) {
      setError("Reward per click cannot be negative");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validateInput()) return;

    setError("");
    setSuccess("");

    try {
      const response = await updateAdsSettingMutation({
        variables: {
          costPerView: settings.costPerView,
          costPerClick: settings.costPerClick,
          rewardPerView: settings.rewardPerView,
          rewardPerClick: settings.rewardPerClick,
        },
      });

      if (response.data.updateAdsSetting.success) {
        setSuccess("Ad settings updated successfully!");
      } else {
        setError(
          response.data.updateAdsSetting.message || "Failed to update settings"
        );
      }
    } catch (err) {
      setError("An error occurred while updating settings");
      console.error(err);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(value);
  };

  return (
    <>
      <section >
        <div className="max-w-[450px] w-full mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8 text-theme-gray">
            <h1 className="text-2xl font-bold text-theme-gray">
              Advertisement Settings
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Configure costs for advertisers and rewards for users
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 text-sm text-green-700 bg-green-100 rounded-md">
              {success}
            </div>
          )}

          {fetchLoading ? (
            <div className="text-center py-8">Loading current settings...</div>
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
                    value={settings.costPerView.toString()}
                    placeholder="0.01"
                    onChange={handleChange}
                    required={true}
                    disabled={updateLoading}
                    className=""
                    step="0.0001"
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
                    value={settings.costPerClick.toString()}
                    placeholder="0.05"
                    onChange={handleChange}
                    required={true}
                    disabled={updateLoading}
                    className=""
                    step="0.0001"
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
                    value={settings.rewardPerView.toString()}
                    placeholder="0.005"
                    onChange={handleChange}
                    required={true}
                    disabled={updateLoading}
                    className=""
                    step="0.0001"
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
                    value={settings.rewardPerClick.toString()}
                    placeholder="0.02"
                    onChange={handleChange}
                    required={true}
                    disabled={updateLoading}
                    className=""
                    step="0.0001"
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
                    updateLoading ? "Updating settings..." : "Save Settings"
                  }
                  disabled={updateLoading || fetchLoading}
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

export default AdminAdsSetting;
