export default function formatNumberOfPeople(param: number): string {
  const formatedNumber = param
    .toLocaleString(undefined, {
      minimumFractionDigits: 2,
    })
    .slice(0, -3);
  return formatedNumber;
}
