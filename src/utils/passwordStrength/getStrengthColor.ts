export const getStrengthColor = (strength: number): string => {
  switch (strength) {
    case 0:
      return "bg-gray-300";
    case 1:
      return "bg-red-500";
    case 2:
      return "bg-orange-500";
    case 3:
      return "bg-yellow-500";
    case 4:
      return "bg-blue-500";
    case 5:
      return "bg-green-500";
    default:
      return "bg-gray-300";
  }
};
