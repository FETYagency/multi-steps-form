import { useDispatch, useSelector } from "react-redux";
import {
  selectFormData,
  setPlans,
  setType,
} from "../services/store/features/formData";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { validate } from "../services/store/features/senario";
const PlansForm = forwardRef(function PlansForm(props, ref) {
  const { plans, type } = useSelector(selectFormData);
  const dispatch = useDispatch();
  const form = useRef(null);
  let [selects, setSelects] = useState({
    arcade: plans.arcade.checked,
    advanced: plans.advanced.checked,
    pro: plans.pro.checked,
  });
  let canNext = Object.values(selects).some((per) => per);
  useImperativeHandle(
    ref,
    () => {
      return {
        submit(submmiter) {
          form.current.requestSubmit(submmiter);
        },
        isValid() {
          return true;
        },
      };
    },
    [],
  );
  useEffect(() => {
    if (canNext) {
      console.log("effect of plansForm exection");
      dispatch(validate(canNext));
    }
    return () => {
      console.log("clean up plansForm exection");
      dispatch(validate(false));
    };
  }, [canNext]);
  function handleSelect(key) {
    const entriesOfObject = Object.keys(selects).map((per) => {
      if (per === key) return [per, true];
      return [per, false];
    });
    const newObject = Object.fromEntries(entriesOfObject);
    setSelects(newObject);
  }
  const renderedPlans = Object.keys(plans).map((plan) => {
    return (
      <>
        <input
          type="radio"
          checked={selects[plan]}
          onChange={() => handleSelect(String(plan))}
          name="plan"
          id={String(plan)}
          className={`absolute h-0 w-0 opacity-0 ${
            plan === "arcade"
              ? "peer/arcade"
              : plan === "advanced"
              ? "peer/advanced"
              : "peer/pro"
          }`}
        />
        <label
          htmlFor={String(plan)}
          className={`flex cursor-pointer items-start gap-[14px] rounded-[8px] border border-[D6D9E6] py-[15px] pl-[16px] ${
            plan === "arcade"
              ? "peer-checked/arcade:border-[#483EFF] peer-checked/arcade:bg-[#F8F9FF]"
              : plan === "advanced"
              ? "peer-checked/advanced:border-[#483EFF] peer-checked/advanced:bg-[#F8F9FF]"
              : "peer-checked/pro:border-[#483EFF] peer-checked/pro:bg-[#F8F9FF]"
          }`}
        >
          <span>
            <img src={String(plans[plan].icon)} />
          </span>
          <article className="grid gap-[4px]">
            <h4>{plan}</h4>
            <p>
              {type === "monthly"
                ? `${plans[plan].price.monthly}/mo`
                : `${plans[plan].price.yearly}/yr`}
            </p>
            {type === "yearly" && <p>{plans[plan].price.yearlyOffer}</p>}
          </article>
        </label>
      </>
    );
  });
  return (
    <form
      ref={form}
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(setPlans(selects));
      }}
      className="mx-auto max-w-[343px] rounded-[10px] bg-white px-[24px] py-[32px] shadow-[0px_25px_40px_-20px_rgba(0,0,0,0.10)]"
    >
      <article className="mb-[22px]">
        <h1 className="text-[24px] font-bold leading-normal text-[#022959]">
          Select your plan
        </h1>
        <p className="mt-[9px] text-[16px] font-normal leading-[25px] text-[#9699AA]">
          You have the option of monthly or yearly billing.
        </p>
      </article>
      <div className="grid gap-[12px]">{renderedPlans}</div>
      <div className="mt-[24px] flex h-[48px] items-center justify-center gap-[24px] rounded-[8px] bg-[#F8F9FF]">
        <span
          className={`text-[14px] font-medium leading-normal ${
            type === "monthly" ? "text-[#022959]" : "text-[#9699AA]"
          }`}
        >
          monthly
        </span>
        <label htmlFor="type" className="relative cursor-pointer">
          <input
            type="checkbox"
            onInput={(e) =>
              dispatch(setType(!e.currentTarget.checked ? "yearly" : "monthly"))
            }
            checked={type === "yearly"}
            id="type"
            className="peer absolute h-0 w-0 opacity-0"
          />
          <span className="flex h-[20px] w-[38px] rounded-[10px] bg-[#022959] p-[4px] peer-checked:justify-end">
            <span className="inline-block aspect-square h-full rounded-[50%] bg-white"></span>
          </span>
        </label>
        <span
          className={`text-[14px] font-medium leading-normal ${
            type === "yearly" ? "text-[#022959]" : "text-[#9699AA]"
          }`}
        >
          yearly
        </span>
      </div>
    </form>
  );
});
export default PlansForm;
