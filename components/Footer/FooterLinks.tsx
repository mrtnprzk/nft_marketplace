interface Props {
  heading: string;
  items: string[];
}

const FooterLinks = ({ heading, items }: Props) => {
  return (
    <div className="flex-1 justify-start items-start">
      <h3 className="font-semibold text-xl mb-10 text-nft-black-1 dark:text-white">
        {heading}
      </h3>
      {items.map((item, index) => (
        <p
          key={index}
          className="text-nft-black-1 font-normal text-base cursor-pointer my-3 hover:text-nft-gray-2 dark:text-white dark:hover:text-nft-gray-2 duration-500"
        >
          {item}
        </p>
      ))}
    </div>
  );
};

export default FooterLinks;
