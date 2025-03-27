export type AlertType = {
  type: "success" | "error" | "warning";
  message: string;
};

export type AdminUserDisplayType = {
  fullName: string;
  username: string;
  isActive: boolean;
};
