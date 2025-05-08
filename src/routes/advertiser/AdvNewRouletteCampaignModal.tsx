import Modal from "../../components/general/Modal";
import InputBox from "../../components/general/InputBox";
import { useState } from "react";
import Button from "../../components/general/Button";
import { useAlert } from "../../contexts/AlertContext";
import { useMutation } from "@apollo/client";
import {
  CREATE_ROULETTE_CAMPAIGN,
  UPDATE_ROULETTE_CAMPAIGN,
  GET_ROULETTE_CAMPAIGNS,
} from "../../graphql/rouletteCampaign";
import Loader from "../../components/general/Loader";

type RouletteCampaign = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  mainPrize: string;
  mainPrizeAmount: string;
  secPrize1: string;
  amount1: string;
  secPrize2: string;
  amount2: string;
  secPrize3: string;
  amount3: string;
  budget: string;
  status: string;
  rejectionReason: string;
};

type AdvNewRouletteCampaignModalProps = {
  setIsModalOpen: (isOpen: boolean) => void;
  campaignToEdit?: RouletteCampaign;
};

const defaultCampaign = {
  id: 0,
  name: "",
  startDate: "",
  endDate: "",
  mainPrize: "",
  mainPrizeAmount: "",
  secPrize1: "",
  amount1: "",
  secPrize2: "",
  amount2: "",
  secPrize3: "",
  amount3: "",
  budget: "",
  status: "PENDING",
  rejectionReason: "",
};

const AdvNewRouletteCampaignModal = ({
  setIsModalOpen,
  campaignToEdit,
}: AdvNewRouletteCampaignModalProps) => {
  const { showAlert } = useAlert();
  const [createRouletteCampaignMutation, { loading: loadingCreateRouletteCampaign }] =
    useMutation(CREATE_ROULETTE_CAMPAIGN, {
      refetchQueries: [GET_ROULETTE_CAMPAIGNS],
    });

  const [updateRouletteCampaignMutation, { loading: loadingUpdateRouletteCampaign }] =
    useMutation(UPDATE_ROULETTE_CAMPAIGN, {
      refetchQueries: [GET_ROULETTE_CAMPAIGNS],
    });

  const [newCampaign, setNewCampaign] = useState<RouletteCampaign>(
    campaignToEdit
      ? {
          id: campaignToEdit.id,
          name: campaignToEdit.name,
          startDate: new Date(Number(campaignToEdit.startDate))
            .toISOString()
            .split("T")[0],
          endDate: new Date(Number(campaignToEdit.endDate))
            .toISOString()
            .split("T")[0],
          mainPrize: campaignToEdit.mainPrize,
          mainPrizeAmount: campaignToEdit.mainPrizeAmount,
          secPrize1: campaignToEdit.secPrize1,
          amount1: campaignToEdit.amount1,
          secPrize2: campaignToEdit.secPrize2,
          amount2: campaignToEdit.amount2,
          secPrize3: campaignToEdit.secPrize3,
          amount3: campaignToEdit.amount3,
          budget: campaignToEdit.budget,
          status: campaignToEdit.status,
          rejectionReason: campaignToEdit.rejectionReason,
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
    if (!newCampaign.startDate) {
      return "Start date is required";
    }
    if (!newCampaign.endDate) {
      return "End date is required";
    }
    if (!newCampaign.mainPrize) {
      return "Main prize is required";
    }
    if (!newCampaign.mainPrizeAmount) {
      return "Main prize amount is required";
    }
    if (!newCampaign.budget) {
      return "Budget is required";
    }
    if (Number(newCampaign.mainPrizeAmount) < 0) {
      return "Main prize amount must be a positive number";
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
        const response = await updateRouletteCampaignMutation({
          variables: {
            id: campaignToEdit.id,
            name: newCampaign.name,
            startDate: newCampaign.startDate,
            endDate: newCampaign.endDate,
            mainPrize: newCampaign.mainPrize,
            mainPrizeAmount: newCampaign.mainPrizeAmount,
            secPrize1: newCampaign.secPrize1,
            amount1: newCampaign.amount1,
            secPrize2: newCampaign.secPrize2,
            amount2: newCampaign.amount2,
            secPrize3: newCampaign.secPrize3,
            amount3: newCampaign.amount3,
            budget: newCampaign.budget,
          },
        });
        if (response.data.updateRouletteCampaign.success) {
          showAlert({
            type: "success",
            message: response.data.updateRouletteCampaign.message,
          });
          setIsModalOpen(false);
        } else {
          showAlert({
            type: "error",
            message: response.data.updateRouletteCampaign.message,
          });
        }
      } else {
        const response = await createRouletteCampaignMutation({
          variables: {
            name: newCampaign.name,
            startDate: newCampaign.startDate,
            endDate: newCampaign.endDate,
            mainPrize: newCampaign.mainPrize,
            mainPrizeAmount: newCampaign.mainPrizeAmount,
            secPrize1: newCampaign.secPrize1,
            amount1: newCampaign.amount1,
            secPrize2: newCampaign.secPrize2,
            amount2: newCampaign.amount2,
            secPrize3: newCampaign.secPrize3,
            amount3: newCampaign.amount3,
            budget: newCampaign.budget,
          },
        });
        if (response.data.createRouletteCampaign.success) {
          showAlert({
            type: "success",
            message: response.data.createRouletteCampaign.message,
          });
          setNewCampaign(defaultCampaign);
          setIsModalOpen(false);
        } else {
          showAlert({
            type: "error",
            message: response.data.createRouletteCampaign.message,
          });
        }
      }
    } catch (error) {
      showAlert({
        type: "error",
        message: "Error submitting roulette campaign",
      });
    }
  };

  return (
    <>
      {(loadingCreateRouletteCampaign || loadingUpdateRouletteCampaign) && (
        <Loader text="Submitting roulette campaign..." />
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
          <div className="mb-4 flex gap-2 flex-col sm:flex-row">
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
          <div className="mb-4">
            <InputBox
              name="mainPrize"
              id="mainPrize"
              type="text"
              value={newCampaign.mainPrize}
              placeholder="Enter main prize"
              onChange={handleChange}
              label="Main Prize"
              required
            />
          </div>
          <div className="mb-4">
            <InputBox
              name="mainPrizeAmount"
              id="mainPrizeAmount"
              type="number"
              value={newCampaign.mainPrizeAmount}
              placeholder="Enter main prize amount"
              onChange={handleChange}
              label="Main Prize Amount"
              required
              min="0"
            />
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="mb-4 flex gap-2 flex-col sm:flex-row">
              <InputBox
                name={`secPrize${i}`}
                id={`secPrize${i}`}
                type="text"
                value={newCampaign[`secPrize${i}` as keyof RouletteCampaign] as string}
                placeholder={`Enter secondary prize ${i}`}
                onChange={handleChange}
                label={`Secondary Prize ${i}`}
              />
              <InputBox
                name={`amount${i}`}
                id={`amount${i}`}
                type="number"
                value={newCampaign[`amount${i}` as keyof RouletteCampaign] as string}
                placeholder={`Enter amount ${i}`}
                onChange={handleChange}
                label={`Amount ${i}`}
                min="0"
              />
            </div>
          ))}
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
              disabled={loadingCreateRouletteCampaign || loadingUpdateRouletteCampaign}
            />
            <Button text="Cancel" onClick={() => setIsModalOpen(false)} />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AdvNewRouletteCampaignModal; 