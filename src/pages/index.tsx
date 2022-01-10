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
import { IconButton } from '@chakra-ui/react';
import { carrerType } from '../../type';

export default function Home() {
  const [careerList, setCareerList] = useState<carrerType[]>([
    { id: '1', job: '', year: 3, month: 4 },
  ]);
  const addCareer = () => {
    setCareerList([
      ...careerList,
      {
        id: (parseInt(careerList[careerList.length - 1].id) + 1).toString(),
        job: '',
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
            if (career.id === id && num > 0) {
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
            if (career.id === id && num > 0) {
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
            <IconButton
              colorScheme='teal'
              aria-label='経歴追加'
              width='40px'
              icon={<AddIcon />}
              onClick={addCareer}
            />

            {careerList.map(({ id, job, year, month }) => (
              <HStack key={id}>
                <Select value={job} onChange={handleChangeJob} id={id}>
                  <option value='高校'>高校</option>
                  <option value='大学'>大学</option>
                  <option value='高専'>高専</option>
                  <option value='会社'>会社</option>
                  <option value='その他'>その他</option>
                </Select>
                <NumberInput
                  defaultValue={3}
                  min={1}
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
                  min={1}
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
        </Box>
      </main>

      <Footer />
    </div>
  );
}
