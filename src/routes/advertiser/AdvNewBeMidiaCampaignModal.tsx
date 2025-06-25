import Modal from "../../components/general/Modal";
import InputBox from "../../components/general/InputBox";
import ImageInput from "../../components/general/ImageInput";
import { useState } from "react";
import Button from "../../components/general/Button";
import { useAlert } from "../../contexts/AlertContext";
import { useMutation } from "@apollo/client";
import {
  CREATE_BEMIDIA_CAMPAIGN,
  UPDATE_BEMIDIA_CAMPAIGN,
  GET_BEMIDIA_CAMPAIGNS,
} from "../../graphql/beMidiaCampaign";
import Loader from "../../components/general/Loader";
import { BeMidiaCampaign } from "../../types";

type AdvNewBeMidiaCampaignModalProps = {
  setIsModalOpen: (isOpen: boolean) => void;
  campaignToEdit?: BeMidiaCampaign | undefined;
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
  startHour: string;
  endDate: string;
  endHour: string;
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
  startHour: "",
  endDate: "",
  endHour: "",
  budget: "",
  status: "PENDING",
};

const AdvNewBeMidiaCampaignModal = ({
  setIsModalOpen,
  campaignToEdit,
}: AdvNewBeMidiaCampaignModalProps & { campaignToEdit?: BeMidiaCampaign }) => {
  const { showAlert } = useAlert();
  const [createBeMidiaCampaignMutation, { loading: loadingCreateBeMidiaCampaign }] =
    useMutation(CREATE_BEMIDIA_CAMPAIGN, {
      refetchQueries: [GET_BEMIDIA_CAMPAIGNS],
    });

  const [updateBeMidiaCampaignMutation, { loading: loadingUpdateBeMidiaCampaign }] =
    useMutation(UPDATE_BEMIDIA_CAMPAIGN, {
      refetchQueries: [GET_BEMIDIA_CAMPAIGNS],
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
          startHour: campaignToEdit.startHour,
          endDate: new Date(Number(campaignToEdit.endDate))
            .toISOString()
            .split("T")[0],
          endHour: campaignToEdit.endHour,
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
      return "Action URL is required";
    }
    // Validate URL format
    try {
      new URL(newCampaign.action);
    } catch {
      return "Action must be a valid URL";
    }
    if (!newCampaign.startDate) {
      return "Start date is required";
    }
    if (!newCampaign.startHour) {
      return "Start hour is required";
    }
    if (!newCampaign.endDate) {
      return "End date is required";
    }
    if (!newCampaign.endHour) {
      return "End hour is required";
    }
    if (!newCampaign.budget) {
      return "Budget is required";
    }
    if (Number(newCampaign.budget) <= 0) {
      return "Budget must be a positive number";
    }
    
    // Validate date and time range
    const startDateTime = new Date(`${newCampaign.startDate}T${newCampaign.startHour}:00`);
    const endDateTime = new Date(`${newCampaign.endDate}T${newCampaign.endHour}:00`);
    
    if (startDateTime >= endDateTime) {
      return "Start date and time must be before end date and time";
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
        const response = await updateBeMidiaCampaignMutation({
          variables: {
            id: campaignToEdit.id,
            name: newCampaign.name,
            adImage: newCampaign.adImage.base64 || newCampaign.adImage.url,
            action: newCampaign.action,
            startDate: newCampaign.startDate,
            startHour: newCampaign.startHour,
            endDate: newCampaign.endDate,
            endHour: newCampaign.endHour,
            budget: newCampaign.budget,
          },
        });
        if (response.data.updateBeMidiaCampaign.success) {
          showAlert({
            type: "success",
            message: response.data.updateBeMidiaCampaign.message,
          });
          setIsModalOpen(false);
        } else {
          showAlert({
            type: "error",
            message: response.data.updateBeMidiaCampaign.message,
          });
        }
      } else {
        const response = await createBeMidiaCampaignMutation({
          variables: {
            name: newCampaign.name,
            adImage: newCampaign.adImage.base64,
            action: newCampaign.action,
            startDate: newCampaign.startDate,
            startHour: newCampaign.startHour,
            endDate: newCampaign.endDate,
            endHour: newCampaign.endHour,
            budget: newCampaign.budget,
          },
        });
        if (response.data.createBeMidiaCampaign.success) {
          showAlert({
            type: "success",
            message: response.data.createBeMidiaCampaign.message,
          });
          setNewCampaign(defaultCampaign);
          setIsModalOpen(false);
        } else {
          showAlert({
            type: "error",
            message: response.data.createBeMidiaCampaign.message,
          });
        }
      }
    } catch {
      showAlert({
        type: "error",
        message: "Error submitting BeMidia campaign",
      });
    }
  };

  return (
    <>
      {(loadingCreateBeMidiaCampaign || loadingUpdateBeMidiaCampaign) && (
        <Loader text="Submitting BeMidia campaign..." />
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
              type="url"
              value={newCampaign.action}
              placeholder="Enter action URL (e.g., https://example.com)"
              onChange={handleChange}
              label="Action (URL)"
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
                name="startHour"
                id="startHour"
                type="time"
                value={newCampaign.startHour}
                onChange={handleChange}
                label="Start Hour"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex gap-2 flex-col sm:flex-row">
              <InputBox
                name="endDate"
                id="endDate"
                type="date"
                value={newCampaign.endDate}
                onChange={handleChange}
                label="End Date"
                required
              />
              <InputBox
                name="endHour"
                id="endHour"
                type="time"
                value={newCampaign.endHour}
                onChange={handleChange}
                label="End Hour"
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
              step="0.01"
            />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button
              text="Submit"
              onClick={handleSubmitCampaign}
              disabled={loadingCreateBeMidiaCampaign || loadingUpdateBeMidiaCampaign}
            />
            <Button text="Cancel" onClick={() => setIsModalOpen(false)} />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AdvNewBeMidiaCampaignModal;
