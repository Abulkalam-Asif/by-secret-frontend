import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import InputBox from "../../components/general/InputBox";
import Button from "../../components/general/Button";
import {
  GET_ROULETTE_SETTINGS,
  UPDATE_ROULETTE_SETTINGS,
} from "../../graphql/rouletteSettings";
import { useAlert } from "../../contexts/AlertContext";
import Loader from "../../components/general/Loader";

interface RouletteSettingsData {
  costPerView: number;
  costPerClick: number;
  neoDollarsCost: number;
}

const defaultRouletteSettings: RouletteSettingsData = {
  costPerView: 0,
  costPerClick: 0,
  neoDollarsCost: 0,
};

const AdminRouletteSettings = () => {
  const { showAlert } = useAlert();
  const [settings, setSettings] = useState<RouletteSettingsData>(
    defaultRouletteSettings
  );

  // Fetch current settings
  const { data, loading: fetchLoading } = useQuery(GET_ROULETTE_SETTINGS);

  // Update settings mutation
  const [updateRouletteSettingsMutation, { loading: updateLoading }] =
    useMutation(UPDATE_ROULETTE_SETTINGS, {
      refetchQueries: [GET_ROULETTE_SETTINGS],
    });

  // Load settings when data is available
  useEffect(() => {
    if (data?.getRouletteSettings) {
      setSettings(data.getRouletteSettings);
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
    if (settings.neoDollarsCost < 0) {
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
      const response = await updateRouletteSettingsMutation({
        variables: {
          costPerView: settings.costPerView,
          costPerClick: settings.costPerClick,
          neoDollarsCost: settings.neoDollarsCost,
        },
      });

      showAlert({
        message: response.data.updateRouletteSettings.message,
        type: response.data.updateRouletteSettings.success
          ? "success"
          : "error",
      });
    } catch (err) {
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
        <div className="max-w-[450px] w-full mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8 text-theme-gray">
            <h1 className="text-2xl font-bold text-theme-gray">
              Roulette Settings
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Configure costs and rewards for the roulette feature
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
                    disabled={updateLoading}
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
                    disabled={updateLoading}
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
                    Neo Dollars Cost
                  </label>
                  <InputBox
                    name="neoDollarsCost"
                    id="neoDollarsCost"
                    type="number"
                    value={settings.neoDollarsCost}
                    placeholder="0.02"
                    onChange={handleChange}
                    required={true}
                    disabled={updateLoading}
                    className=""
                    step="0.00001"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Current value: {formatCurrency(settings.neoDollarsCost)} USD
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

export default AdminRouletteSettings;
