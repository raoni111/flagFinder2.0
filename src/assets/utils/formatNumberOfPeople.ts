export default function formatNumberOfPeople(
  param: number | undefined,
): string | undefined {
  if (param) {
    const formatedNumber = param
      .toLocaleString(undefined, {
        minimumFractionDigits: 2,
      })
      .slice(0, -3);
    return formatedNumber;
  }
}
