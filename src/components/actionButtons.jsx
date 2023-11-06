import { useDispatch, useSelector } from "react-redux";
import {
  backStep,
  nextStep,
  selectSenario,
} from "../services/store/features/senario";
import { selectFormData, sendData } from "../services/store/features/formData";
export default function ActionButtons({ node }) {
  const { currentIndex, steps, isValid } = useSelector(selectSenario);
  const { addOns, plans, personalinfos, isSending } =
    useSelector(selectFormData);
  function preparedData() {
    const selectedAddOns = Object.keys(addOns).filter(
      (per) => addOns[per].isChecked,
    );
    const selectedAddOnsObjects = selectedAddOns.map((per) => addOns[per]);
    const selectedPlan = Object.keys(plans).find((per) => plans[per].checked);
    return {
      selectedAddOnsObjects,
      selectedPlan,
      personalinfos,
    };
  }
  const dispatch = useDispatch();
  function handleSteps(hint) {
    hint === "next" && dispatch(nextStep());
    hint === "back" && dispatch(backStep());
  }
  return (
    <div className="fixed bottom-0 left-[50%] flex w-[375px] max-w-full translate-x-[-50%] justify-between bg-white px-[16px] py-[16px]">
      {currentIndex > 0 && (
        <button
          onClick={(e) => handleSteps("back")}
          className=" text-[14px] font-medium capitalize leading-normal text-[#9699AA]"
        >
          go back
        </button>
      )}
      {currentIndex !== steps.length - 1 ? (
        <button
          onClick={(e) => {
            if (node.current) {
              node.current.submit();
            }
            console.log(node);
            currentIndex < steps.length - 1 &&
              isValid &&
              (node.current?.isValid() || Boolean(node.current) === false) &&
              handleSteps("next");
          }}
          className="ml-auto h-[40px]  w-[97px] rounded-[4px] bg-[#022959] text-[14px] font-medium capitalize text-white"
        >
          next step
        </button>
      ) : (
        <button
          className="ml-auto h-[40px]  w-[97px] rounded-[4px] bg-[#483EFF] text-[14px] font-medium capitalize text-white"
          onClick={() => dispatch(sendData(preparedData()))}
        >
          {isSending === "OPERATING" ? "Sending..." : "Confirm"}
        </button>
      )}
    </div>
  );
}
