export const MONTHS =
  "January,February,March,April,May,June,July,August,September,October,November,December".split(
    ","
  );

export const QUARTERS = [];

for (let i = 0; i <= 12; i += 3) {
  QUARTERS.push(
    MONTHS.slice(i, i + 3).map((month) => ({ month, i: MONTHS.indexOf(month) }))
  );
}

export const getCurrentQuarter = () => {
  const currentMonth = new Date().getMonth();
  console.log(currentMonth);

  return Math.floor(currentMonth / 3);
};

export const getMonthsByCurrentQuarter = (quarter) => {
  // const quarter = getCurrentQuarter();
  return QUARTERS[quarter];
};

export const getMonthsByPreviousQuarter = () => {
  const quarter = getCurrentQuarter();

  return QUARTERS[quarter === 0 ? 3 : quarter - 1];
};

console.log("getCurrentQuarter", getCurrentQuarter());
console.log("getMonthsByCurrentQuarter", getMonthsByCurrentQuarter());
console.log("getMonthsByPreviousQuarter", getMonthsByPreviousQuarter());
console.log("quarters", QUARTERS);
