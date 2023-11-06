import { useDispatch, useSelector } from "react-redux";
import { selectFormData } from "../services/store/features/formData";
import { goToStep } from "../services/store/features/senario";

export default function FinishingUp() {
  const { type, plans, addOns } = useSelector(selectFormData);
  const dispatch = useDispatch();
  const selectedPlan = Object.keys(plans).find(
    (per) => plans[per].checked === true,
  );
  const selectedAddOns = Object.keys(addOns).filter(
    (per) => addOns[per].isChecked === true,
  );
  const totale =
    selectedAddOns.reduce((acc, curr, i) => {
      return (
        acc +
        addOns[selectedAddOns[i]].price[
          type === "monthly" ? "monthly" : "yearly"
        ]
      );
    }, 0) +
    plans[selectedPlan].price[type === "monthly" ? "monthly" : "yearly"];
  return (
    <div className="mx-auto max-w-[343px] rounded-[10px] bg-white px-[24px] py-[32px] shadow-[0px_25px_40px_-20px_rgba(0,0,0,0.10)]">
      <article className="mb-[22px]">
        <h1 className="text-[24px] font-bold leading-normal text-[#022959]">
          Finishing up
        </h1>
        <p className="mt-[9px] text-[16px] font-normal leading-[25px] text-[#9699AA]">
          Double-check everything look OK before confirming.
        </p>
      </article>
      <div className="">
        <div className="rounded-[8px] bg-[#F8F9FF] p-[16px]">
          <div className="flex items-center border-b border-[#9699AA] border-opacity-[.2] pb-[12px]">
            <div className="flex flex-col items-start ">
              <h3 className="text-[14px] font-medium capitalize text-[#022959]">{`${selectedPlan} (${type})`}</h3>
              <button
                className="[text-decoration-skip-ink: none;] mt-[4px] capitalize text-[#9699AA] underline"
                type="button"
                onClick={() => dispatch(goToStep("select plan"))}
              >
                change
              </button>
            </div>
            <span className="ml-auto text-[14px] font-bold normal-case leading-[20px] text-[#022959]">
              {type === "monthly"
                ? `+$${plans[selectedPlan].price.monthly}/mo`
                : `+$${plans[selectedPlan].price.yearly}/yr`}
            </span>
          </div>
          <ul className="flex  flex-col gap-[12px] pt-[12px] text-[#9699AA]">
            {selectedAddOns.length > 0 ? (
              selectedAddOns.map((per) => (
                <li className="flex items-center justify-between">
                  {addOns[per].title}
                  <span>
                    {type === "monthly"
                      ? `+$${addOns[per].price.monthly}/mo`
                      : `+$${addOns[per].price.yearly}/yr`}
                  </span>
                </li>
              ))
            ) : (
              <p className="w-fit text-[12px]">no add-on selected</p>
            )}
          </ul>
        </div>
        <div className="flex items-center  justify-between px-[16px] pt-[24px]">
          <span className="text-[#9699AA]">
            total(per {type === "monthly" ? "month" : "year"})
          </span>
          <span className="text-[16px] font-bold leading-[20px] text-[#483EFF]">
            +${totale}/{type === "monthly" ? "mo" : "yr"}
          </span>
        </div>
      </div>
    </div>
  );
}
