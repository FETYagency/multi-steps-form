import { useSelector } from "react-redux";
import FormBar from "./components/formBar";
import Forms from "./layouts/Form";
import { selectFormData } from "./services/store/features/formData";
import ThankYou from "./layouts/thankYou";
export default function FormApp() {
  const { isSending } = useSelector(selectFormData);
  return (
    <main className="m-auto min-h-screen max-w-[375px] bg-[#EFF5FF] pb-[72px]">
      <FormBar />
      {isSending === "SENT" ? <ThankYou /> : <Forms />}
    </main>
  );
}
