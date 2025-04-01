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
