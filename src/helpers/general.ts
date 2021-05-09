import { DateTime } from 'luxon';

interface ColorObject {
    percentage: number;
    color: { r: number; g: number; b: number };
}

const getColorForPercentage = function (percentageValue: number, arrayOfColors: ColorObject[]) {
    // eslint-disable-next-line no-var
    for (var i = 1; i < arrayOfColors.length - 1; i++) {
        if (percentageValue < arrayOfColors[i].percentage) {
            break;
        }
    }

    const lower = arrayOfColors[i - 1];
    const upper = arrayOfColors[i];
    const range = upper.percentage - lower.percentage;
    const rangePct = (percentageValue - lower.percentage) / range;
    const percentageLower = 1 - rangePct;
    const percentageUpper = rangePct;
    const color = {
        r: Math.floor(lower.color.r * percentageLower + upper.color.r * percentageUpper),
        g: Math.floor(lower.color.g * percentageLower + upper.color.g * percentageUpper),
        b: Math.floor(lower.color.b * percentageLower + upper.color.b * percentageUpper),
    };
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
    // or output as hex if preferred
};

const checkIfCurrentWeek = (year: number, month: number, week: number) => {
    const currentTime = DateTime.local();
    return currentTime.year === year && currentTime.month === month && currentTime.weekNumber === week;
};
const checkIfCurrentMonth = (year: number, month: number) => {
    const currentTime = DateTime.local();
    return currentTime.year === year && currentTime.month === month;
};

const returnWeekLabel = (year: number, month: number, week: number, translation: string, showYear = false) => {
    const currentYear = DateTime.local().year;
    if (checkIfCurrentWeek(year, month, week)) {
        return translation + ` (${week})`;
    } else {
        return `week ${week}${showYear && year !== currentYear ? `, ${year}` : ''}`;
    }
};

const returnMonthLabel = (year: number, month: number, translation: string, showYear = false) => {
    const monthString = DateTime.fromObject({ month: month, year: year }).toFormat('MMM');
    const currentYear = DateTime.local().year;
    if (checkIfCurrentMonth(year, month)) {
        return translation + ` (${monthString})`;
    } else {
        return `${monthString}${showYear && year !== currentYear ? ` ${year}` : ''}`;
    }
};

const concatenateAndParse = (...numbers: number[]) => {
    let finalstring = '';

    numbers.forEach((number) => (finalstring += number.toString()));

    return parseInt(finalstring);
};

export type { ColorObject };
export { getColorForPercentage, checkIfCurrentWeek, returnWeekLabel, returnMonthLabel, concatenateAndParse };
