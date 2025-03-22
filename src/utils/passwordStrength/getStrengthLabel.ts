export const getStrengthLabel = (strength: number): string => {
  switch (strength) {
    case 0:
      return "No password";
    case 1:
      return "Very weak";
    case 2:
      return "Weak";
    case 3:
      return "Medium";
    case 4:
      return "Strong";
    case 5:
      return "Very strong";
    default:
      return "";
  }
};
