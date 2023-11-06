import thx from "../../public/assets/images/icon-thank-you.svg";
export default function ThankYou() {
  return (
    <div className="relative top-[-73px] mx-auto max-w-[343px] rounded-[10px] bg-white px-[24px] py-[32px] text-center shadow-[0px_25px_40px_-20px_rgba(0,0,0,0.10)]">
      <div className="m-auto w-fit pb-[24px] pt-[47px]">
        <img src={thx} alt="" />
      </div>
      <article>
        <h1 className="text-[24px] font-bold leading-normal text-[#022959]">
          Thank you!{" "}
        </h1>
        <p className="mt-[9px] text-[16px] font-normal leading-[25px] text-[#9699AA]">
          Thanks for confirming your subscription! We hope you have fun using
          our platform. If you ever need support, please feel free to email us
          at support@loremgaming.com.
        </p>
      </article>
    </div>
  );
}
