import { useAlert } from "../../contexts/AlertContext";
import Alert from "./Alert";

const AlertContainer = () => {
  const { alerts } = useAlert();
  return (
    <>
      <div className="fixed top-0 right-0 z-50 flex flex-col items-end gap-3">
        {alerts.map((alert, index) => (
          <Alert key={index} type={alert.type} message={alert.message} />
        ))}
      </div>
    </>
  );
};

export default AlertContainer;
