import { FooterSocial, FooterSubscribe, FooterLinks } from "../index";

const Footer = () => {
  return (
    <footer className="flexCenter flex-col border-t border-nft-gray-1 py-16 sm:py-8 dark:border-nft-black-1">
      <div className="flex flex-row w-full minmd:w-4/5 px-16 sm:px-4 md:flex-col">
        <FooterSubscribe />

        <div className="flex-1 flexBetweenStart flex-wrap ml-10 md:ml-0 md:mt-8">
          <FooterLinks
            heading="CryptoKet"
            items={["Explore", "How it Works", "Contact Us"]}
          />
          <FooterLinks
            heading="Support"
            items={[
              "Help Center",
              "Terms of Service",
              "Legal",
              "Privacy Policy",
            ]}
          />
        </div>
      </div>
      <FooterSocial />
    </footer>
  );
};

export default Footer;
