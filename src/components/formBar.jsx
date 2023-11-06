import patter_desk from "../../public/assets/images/bg-sidebar-desktop.svg";
import patter_mob from "../../public/assets/images/bg-sidebar-mobile.svg";
import { useSelector } from "react-redux";
import { selectSenario } from "../services/store/features/senario";
export default function FormBar() {
  const { steps, currentStep } = useSelector(selectSenario);
  const renderedStepLabels = steps.map((step) => {
    return (
      <div key={step}>
        <span
          className={`grid aspect-square w-[32px] place-items-center rounded-[50%] border font-bold ${
            step !== currentStep
              ? "border-current text-white"
              : "border-[#BEE2FD] bg-[#BEE2FD] text-[#022959]"
          }`}
        >
          {steps.indexOf(step) + 1}
        </span>
        <article className="hidden">
          <h3>{`step ${steps.indexOf(step) + 1}`}</h3>
          <p>{step}</p>
        </article>
      </div>
    );
  });
  return (
    <header className="relative flex h-[172px] justify-center pt-[32px]">
      <picture className="absolute top-0 block h-full w-full">
        <source media="(min-width: 1440px)" srcSet={patter_mob} />
        <img className="h-full w-full object-cover" src={patter_mob} />
      </picture>
      <div className="relative flex gap-[16px]">{renderedStepLabels}</div>
    </header>
  );
}
