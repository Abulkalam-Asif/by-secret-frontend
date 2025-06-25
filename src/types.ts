export type AlertType = {
  type: "success" | "error" | "warning";
  message: string;
};

export type AdminUserDisplayType = {
  fullName: string;
  email: string;
  isActive: boolean;
};

export type EmailTemplate = {
  id: number;
  name: string;
  content: string;
  active: boolean;
};

export type AdsCampaign = {
  id: number;
  name: string;
  adImage: string;
  action: string;
  startDate: string;
  endDate: string;
  budget: string;
  status: string;
  rejectionReason: string;
};

export type BeMidiaCampaign = {
  id: number;
  name: string;
  adImage: string;
  action: string;
  startDate: string;
  startHour: string;
  endDate: string;
  endHour: string;
  budget: string;
  status: string;
  rejectionReason: string;
};
