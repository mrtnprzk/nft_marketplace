interface Props {
  text: string;
  parentClassName: string;
  childClassName: string;
}

const Banner = ({ text, parentClassName, childClassName }: Props) => {
  return (
    <div
      className={`relative w-full flex items-center z-0 overflow-hidden nft-gradient ${parentClassName}`}
    >
      <p className={`font-bold text-white text-5xl leading-70 ${childClassName}`}>
        {text}
      </p>
      <div className="absolute w-48 h-48 rounded-full white-bg -top-9 -left-16 -z-5 sm:w-32 sm:h-32"/>
      <div className="absolute w-72 h-72 rounded-full white-bg -bottom-24 -right-14 -z-5 sm:w-56 sm:h-56"/>
    </div>
  );
};

export default Banner;
