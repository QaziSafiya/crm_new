export const MONTHS = 'January,February,March,April,May,June,July,August,September,October,November,December'
    .split(',');

export const QUARTERS = [];

for(let i = 0; i <= 12; i += 3) {
    QUARTERS
        .push(MONTHS.slice(i, i + 3).map(month => ({ month, i: MONTHS.indexOf(month) })));
}

export const getCurrentQuarter = () => {
    const currentMonth = new Date().getMonth();

    return Math.floor(currentMonth / 3);
};

export const getMonthsByCurrentQuarter = () => {
    const quarter = getCurrentQuarter();

    return QUARTERS[quarter];
};

export const getMonthsByPreviousQuarter = () => {
    const quarter = getCurrentQuarter();

    return QUARTERS[quarter === 0 ? 3 : quarter - 1];
};