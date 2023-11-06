import { useSelector } from "react-redux";
import { selectSenario } from "../services/store/features/senario";
import PersonalInfoForm from "../components/personalInfoForm";
import PlansForm from "../components/plansForm";
import ActionButtons from "../components/actionButtons";
import { useRef } from "react";
import AddOnsForm from "../components/addOns";
import FinishingUp from "./finishingUp";
export default function Forms() {
  const form = useRef(null);
  const { currentStep } = useSelector(selectSenario);
  return (
    <div className="relative top-[-73px]">
      {currentStep === "your info" && <PersonalInfoForm ref={form} />}
      {currentStep === "select plan" && <PlansForm ref={form} />}
      {currentStep === "add-on" && <AddOnsForm />}
      {currentStep === "summary" && <FinishingUp />}
      <ActionButtons node={form} />
    </div>
  );
}
