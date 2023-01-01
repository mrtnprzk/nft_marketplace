export const shortenAddress = (address: string) => {
  const shortAddress =  `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
  return shortAddress as string
};
