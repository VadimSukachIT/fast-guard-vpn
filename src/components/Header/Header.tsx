import ArrowLeftIcon from "../../assets/svg/arrow-left.svg?react";

interface Props {
  title?: string;
  onClick?: () => void;
}

const Header: React.FC<Props> = ({ title, onClick }) => {
  return (
    <div className="flex items-center justify-between pb-[clamp(10px,2.5dvh,14px)]  pt-[clamp(16px,4dvh,56px)]  w-full">
      <button
        onClick={onClick || undefined}
        className="w-[clamp(20px,6vw,28px)] h-[clamp(20px,6vw,28px)] min-h-[clamp(36px,9vw,44px)] flex items-center justify-center"
      >
        <ArrowLeftIcon className="w-[clamp(12px,4vw,18px)] h-[clamp(12px,4vw,18px)]" />
      </button>

      <span className="text-[clamp(16px,4.5vw,24px)] text-black font-medium">
        {title}
      </span>

      <div className="w-[clamp(20px,6vw,24px)]" />
    </div>
  );
};

export default Header;
