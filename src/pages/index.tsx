import Head from 'next/head';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Box, Select } from '@chakra-ui/react';
import { Stack, HStack } from '@chakra-ui/react';
import { Text } from '@chakra-ui/layout';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { IconButton, Button } from '@chakra-ui/react';
import { carrerType, calculatedCareerType } from '../../type';
import dayjs from 'dayjs';
import CalculatedCareer from '../components/CalculatedCareer';

export default function Home() {
  const [careerList, setCareerList] = useState<carrerType[]>([
    { id: '0', job: '高校', year: 3, month: 4 },
  ]);
  const [calculatedCareerList, setCalculatedCareerList] = useState<calculatedCareerType[]>([]);
  const addCareer = () => {
    setCareerList([
      ...careerList,
      {
        id: (parseInt(careerList[careerList.length - 1].id) + 1).toString(),
        job: '高校',
        year: 3,
        month: 4,
      },
    ]);
  };

  const handleChangeJob = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.getAttribute('id');
    const value = e.target.value;
    setCareerList(
      careerList.map((career) => {
        if (career.id === id) {
          career.job = value;
        }
        return career;
      }),
    );
  };

  const handleChangeYear = (str: string, num: number) => {
    setTimeout(() => {
      if (document.activeElement) {
        const id = document.activeElement.getAttribute('id');
        setCareerList(
          careerList.map((career) => {
            if (career.id === id && num >= 0) {
              career.year = num;
            }
            return career;
          }),
        );
      }
    }, 0);
  };

  const handleChangeMonth = (str: string, num: number) => {
    setTimeout(() => {
      if (document.activeElement) {
        const id = document.activeElement.getAttribute('id');
        setCareerList(
          careerList.map((career) => {
            if (career.id === id && num >= 0) {
              career.month = num;
            }
            return career;
          }),
        );
      }
    }, 0);
  };

  const deleteCareer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (careerList.length > 1) {
      const id = e.currentTarget.getAttribute('id');

      setCareerList(careerList.filter((career) => career.id != id));
    }
  };

  const calculateCareer = () => {
    const now = dayjs();
    const reverseCareerList = [...careerList].reverse();
    const calculatedCareerListForCalculate: calculatedCareerType[] = [];
    reverseCareerList.forEach((career, i) => {
      console.log(i);
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
  return (
    <div className='site-wrapper'>
      <Head>
        <title>経歴年度計算</title>
        <meta name='description' content='経歴年度を計算する' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />

      <main>
        <Box textAlign='center' width='70%' margin='0 auto'>
          <Stack spacing={2} margin='0'>
            <HStack>
              <IconButton
                colorScheme='teal'
                aria-label='経歴追加'
                width='40px'
                icon={<AddIcon />}
                onClick={addCareer}
              />

              <Button colorScheme='teal' variant='outline' onClick={calculateCareer}>
                計算
              </Button>
            </HStack>

            {careerList.map(({ id, job, year, month }) => (
              <HStack key={id}>
                <Select value={job} onChange={handleChangeJob} id={id}>
                  <option value='高校'>高校</option>
                  <option value='大学'>大学</option>
                  <option value='大学院(修士)'>大学院(修士)</option>
                  <option value='大学院(博士)'>大学院(博士)</option>
                  <option value='高専'>高専</option>
                  <option value='会社'>会社</option>
                  <option value='その他'>その他</option>
                </Select>
                <NumberInput
                  defaultValue={3}
                  min={0}
                  value={year}
                  onChange={handleChangeYear}
                  id={id}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

                <Text fontSize='sm'>年間</Text>
                <NumberInput
                  defaultValue={4}
                  min={0}
                  max={12}
                  value={month}
                  onChange={handleChangeMonth}
                  id={id}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Text fontSize='sm'>月から</Text>
                <IconButton
                  id={id}
                  colorScheme='gray'
                  aria-label='経歴削除'
                  width='40px'
                  icon={<DeleteIcon />}
                  onClick={deleteCareer}
                />
              </HStack>
            ))}
          </Stack>
          {calculatedCareerList.map(({ id, job, fromYear, fromMonth, toYear, toMonth }) => (
            <HStack key={id}>
              <CalculatedCareer
                job={job}
                fromYear={fromYear}
                fromMonth={fromMonth}
                toYear={toYear}
                toMonth={toMonth}
              />
            </HStack>
          ))}
        </Box>
      </main>

      <Footer />
    </div>
  );
}
