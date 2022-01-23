import { useState } from 'react';
import { carrerType, calculatedCareerType } from '../../type';
import dayjs from 'dayjs';

export const useCalculateCareer = (careerList: carrerType[]) => {
  const [calculatedCareerList, setCalculatedCareerList] = useState<calculatedCareerType[]>([]);
  const [isError, setIsError] = useState(false);
  const calculateCareer = () => {
    setIsError(false);
    careerList.forEach((career) => {
      if (
        Number.isNaN(career.year) ||
        Number.isNaN(career.month) ||
        career.year < 0 ||
        career.month < 1 ||
        career.month > 12
      ) {
        setIsError(true);
        return;
      }
    });
    const now = dayjs();
    const reverseCareerList = [...careerList].reverse();
    const calculatedCareerListForCalculate: calculatedCareerType[] = [];
    reverseCareerList.forEach((career, i) => {
      if (i === 0) {
        let year = now.year() - career.year;
        if (now.month() < 4 && career.month >= 4) {
          year--;
        }

        calculatedCareerListForCalculate.push({
          id: i.toString(),
          job: career.job,
          fromYear: year,
          fromMonth: career.month,
          toYear: now.year(),
          toMonth: now.month() + 1,
        });
      } else {
        const nextCareer = calculatedCareerListForCalculate[i - 1];
        let fromYear = nextCareer.fromYear - career.year;
        if (nextCareer.fromYear < 4 && career.month >= 4) {
          fromYear--;
        }
        // nextCareerのfrom日付から一日前にしたい
        const fromDateOfNextCareer = dayjs()
          .year(nextCareer.fromYear)
          .month(nextCareer.fromMonth)
          .date(1);
        const toDateOfCareer = fromDateOfNextCareer.subtract(1, 'day');
        calculatedCareerListForCalculate.push({
          id: i.toString(),
          job: career.job,
          fromYear: fromYear,
          fromMonth: career.month,
          toYear: toDateOfCareer.year(),
          toMonth: toDateOfCareer.month(),
        });
      }
      setCalculatedCareerList([...calculatedCareerListForCalculate].reverse());
    });
  };

  return { calculateCareer, calculatedCareerList, isError };
};
