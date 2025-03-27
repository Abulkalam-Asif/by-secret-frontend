type ThProps = {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
};
const Th = ({ children, align = "left" }: ThProps) => (
  <th
    align={align}
    className="text-xs font-semibold text-theme-gray uppercase border-2 border-theme-light-gray p-2">
    {children}
  </th>
);

export default Th;
