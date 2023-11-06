import { useDispatch, useSelector } from "react-redux";
import {
  selectFormData,
  setPersonalInfos,
} from "../services/store/features/formData";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { validate } from "../services/store/features/senario";
const PersonalInfoForm = forwardRef(function PersonalInfoForm(props, ref) {
  const { personalinfos } = useSelector(selectFormData);
  const dispatch = useDispatch();
  const form = useRef(null);
  const [data, setData] = useState({
    name: personalinfos.name.value,
    email: personalinfos.email.value,
    tel: personalinfos.tel.value,
  });
  let canNext = Boolean(data.name) && Boolean(data.email) && Boolean(data.tel);
  useImperativeHandle(
    ref,
    () => {
      return {
        submit(submmiter) {
          form.current.requestSubmit(submmiter);
        },
        isValid() {
          return form.current.reportValidity();
        },
      };
    },
    [],
  );
  useEffect(() => {
    if (canNext) {
      console.log("effect exection");
      dispatch(validate(canNext));
    }
    return () => {
      console.log("clean up");
      dispatch(validate(false));
    };
  }, [canNext]);
  const rederedInputs = Object.keys(personalinfos).map((per) => {
    return (
      <div className="grid gap-[3px]">
        <label
          className="text-[12px] font-normal capitalize leading-normal"
          htmlFor="name"
        >
          {per}
        </label>
        <input
          className="BORDER-[#D6D9E6] rounded-[4px] border bg-white py-[12px] pl-[16px] text-[15px] font-medium leading-normal text-[#022959] outline-none placeholder-shown:text-[#9699AA] focus:border-[#483EFF]"
          type={per === "email" ? "email" : per === "tel" ? "tel" : "text"}
          pattern={per === "tel" ? "^[0-9]+$" : undefined}
          required
          value={data[per]}
          onInput={(e) => setData({ ...data, [per]: e.target.value })}
          placeholder={personalinfos[per].placeholder}
        />
      </div>
    );
  });
  return (
    <form
      method="post"
      ref={form}
      onSubmit={(e) => {
        e.preventDefault();
        if (canNext) dispatch(setPersonalInfos(data));
      }}
      className="mx-auto max-w-[343px] rounded-[10px] bg-white px-[24px] py-[32px] shadow-[0px_25px_40px_-20px_rgba(0,0,0,0.10)]"
    >
      <article className="mb-[22px]">
        <h1 className="text-[24px] font-bold leading-normal text-[#022959]">
          Personal info
        </h1>
        <p className="mt-[9px] text-[16px] font-normal leading-[25px] text-[#9699AA]">
          Please provide your name, email address, and phone number.
        </p>
      </article>
      <div className="grid gap-[16px]">{rederedInputs}</div>
    </form>
  );
});
export default PersonalInfoForm;
