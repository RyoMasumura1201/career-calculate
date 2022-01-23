import React, { useState } from 'react';
import { carrerType } from '../../type';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Meta from '../components/Meta';
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
  Input,
} from '@chakra-ui/react';
import { Text } from '@chakra-ui/layout';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

export default function Home() {
  const [careerList, setCareerList] = useState<carrerType[]>([
    { id: '0', job: '高校', year: 3, month: 4 },
  ]);

  const { calculateCareer, calculatedCareerList, isError } = useCalculateCareer(careerList);
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

  const handleChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.getAttribute('id');
    const value = e.target.value;
    setCareerList(
      careerList.map((career) => {
        if (career.id === id) {
          career.year = parseInt(value);
        }
        return career;
      }),
    );
  };

  const handleChangeMonth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.getAttribute('id');
    const value = e.target.value;
    setCareerList(
      careerList.map((career) => {
        if (career.id === id) {
          career.month = parseInt(value);
        }
        return career;
      }),
    );
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
                <Select value={job} onChange={handleChangeJob} id={id} width='container.xl'>
                  <option value='高校'>高校</option>
                  <option value='大学'>大学</option>
                  <option value='修士'>修士</option>
                  <option value='博士'>博士</option>
                  <option value='高専'>高専</option>
                  <option value='浪人'>浪人</option>
                  <option value='会社'>会社</option>
                  <option value='その他'>その他</option>
                </Select>
                <Input value={year} type='number' onChange={handleChangeYear} id={id} width='sm' />
                <Text fontSize='sm' width='md'>
                  年間
                </Text>
                <Input
                  value={month}
                  type='number'
                  onChange={handleChangeMonth}
                  id={id}
                  width='sm'
                />
                <Text fontSize='sm' width='md'>
                  月から
                </Text>
                <IconButton
                  id={id}
                  colorScheme='gray'
                  aria-label='経歴削除'
                  width='sm'
                  icon={<DeleteIcon />}
                  onClick={deleteCareer}
                />
              </HStack>
            ))}
          </Stack>
          {isError ? (
            <Text color='red' mt='5' mb='5' fontSize='lg'>
              未記入、もしくは無効な値があります。
            </Text>
          ) : (
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
          )}
        </Box>
      </main>

      <Footer />
    </div>
  );
}
