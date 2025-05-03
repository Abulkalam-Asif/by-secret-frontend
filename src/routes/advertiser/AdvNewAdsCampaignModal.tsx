import Modal from "../../components/general/Modal";
import InputBox from "../../components/general/InputBox";
import ImageInput from "../../components/general/ImageInput";
import { useState } from "react";
import Button from "../../components/general/Button";
import { useAlert } from "../../contexts/AlertContext";
import { useMutation } from "@apollo/client";
import {
  CREATE_ADS_CAMPAIGN,
  UPDATE_ADS_CAMPAIGN,
  GET_ADS_CAMPAIGNS,
} from "../../graphql/adsCampaign";
import Loader from "../../components/general/Loader";
import { AdsCampaign } from "../../types";

type AdvNewAdsCampaignModalProps = {
  setIsModalOpen: (isOpen: boolean) => void;
  campaignToEdit?: AdsCampaign | undefined;
};

type NewCampaign = {
  id: number;
  name: string;
  adImage: {
    file: File | null;
    base64: string;
    url: string;
  };
  action: string;
  startDate: string;
  endDate: string;
  budget: string;
  status: string;
};

const defaultCampaign: NewCampaign = {
  id: 0,
  name: "",
  adImage: {
    file: null,
    base64: "",
    url: "",
  },
  action: "",
  startDate: "",
  endDate: "",
  budget: "",
  status: "PENDING", // Updated to match the enum in the backend
};

const AdvNewAdsCampaignModal = ({
  setIsModalOpen,
  campaignToEdit,
}: AdvNewAdsCampaignModalProps & { campaignToEdit?: AdsCampaign }) => {
  const { showAlert } = useAlert();
  const [createAdsCampaignMutation, { loading: loadingCreateAdsCampaign }] =
    useMutation(CREATE_ADS_CAMPAIGN, {
      refetchQueries: [GET_ADS_CAMPAIGNS],
    });

  const [updateAdsCampaignMutation, { loading: loadingUpdateAdsCampaign }] =
    useMutation(UPDATE_ADS_CAMPAIGN, {
      refetchQueries: [GET_ADS_CAMPAIGNS],
    });

  const [newCampaign, setNewCampaign] = useState<NewCampaign>(
    campaignToEdit
      ? {
          id: campaignToEdit.id,
          name: campaignToEdit.name,
          adImage: {
            file: null,
            base64: "",
            url: campaignToEdit.adImage,
          },
          action: campaignToEdit.action,
          startDate: new Date(Number(campaignToEdit.startDate))
            .toISOString()
            .split("T")[0],
          endDate: new Date(Number(campaignToEdit.endDate))
            .toISOString()
            .split("T")[0],
          budget: campaignToEdit.budget,
          status: campaignToEdit.status,
        }
      : defaultCampaign
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCampaign((prev) => ({ ...prev, [name]: value }));
  };

  const validateInput = () => {
    if (!newCampaign.name) {
      return "Campaign name is required";
    }
    if (!newCampaign.adImage.base64 && !newCampaign.adImage.url) {
      return "Ad image is required";
    }
    if (!newCampaign.action) {
      return "Action is required";
    }
    if (!newCampaign.startDate) {
      return "Start date is required";
    }
    if (!newCampaign.endDate) {
      return "End date is required";
    }
    if (!newCampaign.budget) {
      return "Budget is required";
    }
    if (Number(newCampaign.budget) < 0) {
      return "Budget must be a positive number";
    }
    if (new Date(newCampaign.startDate) >= new Date(newCampaign.endDate)) {
      return "Start date must be before end date";
    }
    return null;
  };

  const handleSubmitCampaign = async (e: React.MouseEvent) => {
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
      if (campaignToEdit) {
        const response = await updateAdsCampaignMutation({
          variables: {
            id: campaignToEdit.id,
            name: newCampaign.name,
            adImage: newCampaign.adImage.base64 || newCampaign.adImage.url,
            action: newCampaign.action,
            startDate: newCampaign.startDate,
            endDate: newCampaign.endDate,
            budget: newCampaign.budget,
          },
        });
        if (response.data.updateAdsCampaign.success) {
          showAlert({
            type: "success",
            message: response.data.updateAdsCampaign.message,
          });
          setIsModalOpen(false);
        } else {
          showAlert({
            type: "error",
            message: response.data.updateAdsCampaign.message,
          });
        }
      } else {
        const response = await createAdsCampaignMutation({
          variables: {
            name: newCampaign.name,
            adImage: newCampaign.adImage.base64,
            action: newCampaign.action,
            startDate: newCampaign.startDate,
            endDate: newCampaign.endDate,
            budget: newCampaign.budget,
          },
        });
        if (response.data.createAdsCampaign.success) {
          showAlert({
            type: "success",
            message: response.data.createAdsCampaign.message,
          });
          setNewCampaign(defaultCampaign);
          setIsModalOpen(false);
        } else {
          showAlert({
            type: "error",
            message: response.data.createAdsCampaign.message,
          });
        }
      }
    } catch (error) {
      showAlert({
        type: "error",
        message: "Error submitting ads campaign",
      });
    }
  };

  return (
    <>
      {(loadingCreateAdsCampaign || loadingUpdateAdsCampaign) && (
        <Loader text="Submitting ads campaign..." />
      )}
      <Modal closeModal={() => setIsModalOpen(false)}>
        <form className="p-4">
          <h2 className="text-xl font-bold mb-4">
            {campaignToEdit ? "Edit Campaign" : "Add New Campaign"}
          </h2>
          <div className="mb-4">
            <InputBox
              name="name"
              id="name"
              type="text"
              value={newCampaign.name}
              placeholder="Enter campaign name"
              onChange={handleChange}
              label="Campaign Name"
              required
            />
          </div>
          <div className="flex items-center justify-between gap-4 mb-4">
            <ImageInput
              label="Ad Image"
              idHtmlFor="adImage"
              value={newCampaign.adImage}
              onChange={handleChange}
              classNameOuter="w-full"
            />
            {newCampaign.adImage.base64 ? (
              <img
                src={newCampaign.adImage.base64}
                alt="Logo Preview"
                className="mt-2 h-20 w-20 object-contain rounded"
              />
            ) : (
              newCampaign.adImage.url && (
                <img
                  src={newCampaign.adImage.url}
                  alt="Logo Preview"
                  className="mt-2 h-20 w-20 object-contain rounded"
                />
              )
            )}
          </div>
          <div className="mb-4">
            <InputBox
              name="action"
              id="action"
              type="text"
              value={newCampaign.action}
              placeholder="Enter action"
              onChange={handleChange}
              label="Action"
              required
            />
          </div>
          <div className="mb-4">
            <div className="flex gap-2 flex-col sm:flex-row">
              <InputBox
                name="startDate"
                id="startDate"
                type="date"
                value={newCampaign.startDate}
                onChange={handleChange}
                label="Start Date"
                required
              />
              <InputBox
                name="endDate"
                id="endDate"
                type="date"
                value={newCampaign.endDate}
                onChange={handleChange}
                label="End Date"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <InputBox
              name="budget"
              id="budget"
              type="number"
              value={newCampaign.budget}
              placeholder="Enter budget"
              onChange={handleChange}
              label="Budget (in dollars)"
              required
              min="0"
            />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button
              text="Submit"
              onClick={handleSubmitCampaign}
              disabled={loadingCreateAdsCampaign || loadingUpdateAdsCampaign}
            />
            <Button text="Cancel" onClick={() => setIsModalOpen(false)} />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AdvNewAdsCampaignModal;
