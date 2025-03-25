import { useEffect } from "react";
import { useSearchParams } from "react-router";
import AdvRegisterStep1 from "./AdvRegisterStep1";
import AdvRegisterStep2 from "./AdvRegisterStep2";
import AdvRegisterStep3 from "./AdvRegisterStep3";

const AdvRegister = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (!searchParams.get("step")) {
      setSearchParams({ step: "1" });
    }
  }, []);

  return (
    <>
      <section className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[450px] w-full mx-auto p-8 md:p-12 rounded-xl bg-white shadow-lg">
          <h1 className="text-xl mb-4 font-bold text-theme-gray">
            Register as Advertiser
          </h1>
          {searchParams.get("step") === "1" ? (
            <>
              <AdvRegisterStep1
                moveToStep2={() => setSearchParams({ step: "2" })}
              />
            </>
          ) : searchParams.get("step") === "2" ? (
            <AdvRegisterStep2 />
          ) : searchParams.get("step") === "3" && searchParams.get("token") ? (
            <AdvRegisterStep3 />
          ) : (
            <div>Invalid step. Please go back and try again.</div>
          )}
        </div>
      </section>
    </>
  );
};

export default AdvRegister;
