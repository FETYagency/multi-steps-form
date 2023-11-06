import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFormData, setAddOn } from "../services/store/features/formData";
import checked from "../../public/assets/images/icon-checkmark.svg";
import { validate } from "../services/store/features/senario";
export default function AddOnsForm() {
  const { addOns, type } = useSelector(selectFormData);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("effect of addOns exection");
    dispatch(validate(true));
    return () => {
      console.log("clean up addOns exection");
      dispatch(validate(false));
    };
  }, []);
  const renderedOptions = Object.keys(addOns).map((per) => {
    let objectEle = addOns[per];
    return (
      <>
        <input
          type="checkbox"
          id={per}
          name={per}
          checked={objectEle.isChecked}
          onInput={(e) =>
            dispatch(setAddOn({ isChecked: !objectEle.isChecked, ele: per }))
          }
          className={`peer absolute h-0 w-0 opacity-0 ${
            per === "onlineServices"
              ? "peer/onlineServices"
              : per === "largerStorage"
              ? "peer/largerStorage"
              : "peer/costumizableProfile"
          }`}
        />
        <label
          htmlFor={per}
          className={`flex items-center gap-[16px] rounded-[8px] border border-[#D6D9E6] px-[16px] py-[13px] ${
            per === "onlineServices"
              ? "peer-checked/onlineServices:border-[#483EFF] peer-checked/onlineServices:bg-[#F8F9FF] peer-checked/onlineServices:[&>span:nth-child(1)]:border-current peer-checked/onlineServices:[&>span:nth-child(1)]:bg-current peer-checked/onlineServices:[&>span:nth-child(1)]:text-[#483EFF]"
              : per === "largerStorage"
              ? "peer-checked/largerStorage:border-[#483EFF] peer-checked/largerStorage:bg-[#F8F9FF] peer-checked/largerStorage:[&>span:nth-child(1)]:border-current peer-checked/largerStorage:[&>span:nth-child(1)]:bg-current peer-checked/largerStorage:[&>span:nth-child(1)]:text-[#483EFF]"
              : "peer-checked/costumizableProfile:border-[#483EFF] peer-checked/costumizableProfile:bg-[#F8F9FF] peer-checked/costumizableProfile:[&>span:nth-child(1)]:border-current peer-checked/costumizableProfile:[&>span:nth-child(1)]:bg-current peer-checked/costumizableProfile:[&>span:nth-child(1)]:text-[#483EFF]"
          }`}
        >
          <span
            className={`grid aspect-square w-[20px] place-items-center rounded-[4px] border border-[#D6D9E6] bg-transparent`}
          >
            <img src={checked} />
          </span>
          <article>
            <h3 className="text-[14px] font-medium leading-normal text-[#022959]">
              {objectEle.title}
            </h3>
            <p className="text-[12px] font-normal leading-[20px] text-[#9699AA]">
              {objectEle.description}
            </p>
          </article>
          <span className="ml-auto text-[12px] leading-[20px] text-[#483EFF]">
            +$
            {type === "monthly"
              ? `${objectEle.price.monthly}/mo`
              : `${objectEle.price.yearly}/yr`}
          </span>
        </label>
      </>
    );
  });
  return (
    <form className="mx-auto max-w-[343px] rounded-[10px] bg-white px-[24px] py-[32px] shadow-[0px_25px_40px_-20px_rgba(0,0,0,0.10)]">
      <article className="mb-[22px]">
        <h1 className="text-[24px] font-bold leading-normal text-[#022959]">
          Pick add-ons
        </h1>
        <p className="mt-[9px] text-[16px] font-normal leading-[25px] text-[#9699AA]">
          Add-ons help enhance your gaming experience.
        </p>
      </article>
      <div className="grid gap-[12px]">{renderedOptions}</div>
    </form>
  );
}
