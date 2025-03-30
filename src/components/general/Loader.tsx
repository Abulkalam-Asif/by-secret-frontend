type LoaderProps = {
  text?: string;
};

const Loader = ({ text }: LoaderProps) => {
  return (
    <div
      className={
        "flex flex-col items-center justify-center h-screen w-full fixed top-0 left-0 bg-white/40 z-[9999] backdrop-blur-lg"
      }>
      <div className={"flex justify-between w-28"}>
        <div
          className={
            "w-6 h-6 rounded-full bg-theme-gray animate-bounce2"
          }></div>
        <div
          className={
            "w-6 h-6 rounded-full bg-theme-gray animate-bounce2"
          }></div>
        <div
          className={
            "w-6 h-6 rounded-full bg-theme-gray animate-bounce2"
          }></div>
      </div>
      {text && (
        <div className={"mt-5 text-lg font-medium text-theme-gray"}>{text}</div>
      )}
    </div>
  );
};

export default Loader;
