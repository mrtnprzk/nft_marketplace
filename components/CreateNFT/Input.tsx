interface Props {
  inputType: string;
  title: string;
  placeholder: string;
  handleClick: (e: any) => void;
}

const Input = ({ inputType, title, placeholder, handleClick }: Props) => {
  return (
    <div className="mt-10 w-full">
      <p className="font-semibold text-xl text-nft-black-1 dark:text-white">
        {title}
      </p>
      {inputType === "textarea" ? (
        <textarea
          placeholder={placeholder}
          onChange={handleClick}
          rows={10}
          className="bg-white text-nft-gray-2 text-base mt-4 px-4 py-3 border border-nft-gray-2 rounded-lg w-full outline-none dark:text-white dark:bg-nft-black-1 dark:border-nft-black-1"
        />
      ) : inputType === "number" ? (
        <div className="flexBetween flex-row bg-white text-nft-gray-2 text-base mt-4 px-4 py-3 border border-nft-gray-2 rounded-lg w-full outline-none dark:text-white dark:bg-nft-black-1 dark:border-nft-black-1">
          <input
            type="number"
            placeholder={placeholder}
            onChange={handleClick}
            className="flex w-full bg-white outline-none dark:bg-nft-black-1"
          />
          <p className="font-semibold text-xl text-nft-black-1 dark:text-white">
            ETH
          </p>
        </div>
      ) : (
        <input
          placeholder={placeholder}
          onChange={handleClick}
          className="bg-white text-nft-gray-2 text-base mt-4 px-4 py-3 border border-nft-gray-2 rounded-lg w-full outline-none dark:text-white dark:bg-nft-black-1 dark:border-nft-black-1"
        />
      )}
    </div>
  );
};

export default Input;
