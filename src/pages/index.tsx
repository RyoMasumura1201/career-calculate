import React, { useState } from 'react';
import { carrerType } from '../../type';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import CalculatedCareer from '../components/CalculatedCareer';
import { useCalculateCareer } from '../hooks/useCalculateCareer';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  HStack,
  Box,
  Select,
  IconButton,
  Button,
} from '@chakra-ui/react';
import { Text } from '@chakra-ui/layout';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { Meta } from '../components/Meta';

export default function Home() {
  const [careerList, setCareerList] = useState<carrerType[]>([
    { id: '0', job: '高校', year: 3, month: 4 },
  ]);

  const { calculateCareer, calculatedCareerList } = useCalculateCareer(careerList);
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

  const handleCalculate = () => {
    calculateCareer();
  };
  return (
    <div className='site-wrapper'>
      <Meta />
      <Header />

      <main>
        <Box textAlign='center' width={{ base: '90%', md: '40%' }} margin='0 auto'>
          <Stack spacing={2} margin='0'>
            <HStack>
              <IconButton
                colorScheme='teal'
                aria-label='経歴追加'
                width='40px'
                icon={<AddIcon />}
                onClick={addCareer}
              />

              <Button colorScheme='teal' variant='outline' onClick={handleCalculate}>
                計算
              </Button>
            </HStack>

            {careerList.map(({ id, job, year, month }) => (
              <HStack key={id}>
                <Select value={job} onChange={handleChangeJob} id={id}>
                  <option value='高校'>高校</option>
                  <option value='大学'>大学</option>
                  <option value='修士'>修士</option>
                  <option value='博士'>博士</option>
                  <option value='高専'>高専</option>
                  <option value='浪人'>浪人</option>
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
          <Stack spacing='3' mt='5' mb='5'>
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
          </Stack>
        </Box>
      </main>

      <Footer />
    </div>
  );
}
