export const shortenAddress = (address: string) => {
  const shortAddress =  `${address.slice(0, 4)}...${address.slice(address.length - 3)}`;
  return shortAddress as string
};
