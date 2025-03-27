type TdProps = {
  children: React.ReactNode;
  align?: "center" | "left" | "right";
  colSpan?: number;
};
const Td = ({ children, align = "left", colSpan }: TdProps) => (
  <td
    align={align}
    colSpan={colSpan}
    className="text-sm text-theme-dark-gray border-2 border-theme-light-gray p-2">
    {children}
  </td>
);

export default Td;
