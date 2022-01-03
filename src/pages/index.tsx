import Head from 'next/head';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Box, Select } from '@chakra-ui/react';
import { Stack, HStack, VStack } from '@chakra-ui/react';
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

  const deleteCareer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (careerList.length > 1) {
      const id = e.currentTarget.getAttribute('id');

      setCareerList(careerList.filter((career) => career.id != id));
    }
  };
  return (
    <div className='site-wrapper'>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
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

            {careerList.map((carrer) => (
              <HStack key={carrer.id}>
                <Select>
                  <option value='高校'>高校</option>
                  <option value='大学'>大学</option>
                  <option value='高専'>高専</option>
                  <option value='会社'>会社</option>
                  <option value='その他'>その他</option>
                </Select>
                <NumberInput defaultValue={3} min={1}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Text fontSize='sm'>年間</Text>
                <NumberInput defaultValue={4} min={1} max={12}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Text fontSize='sm'>月から</Text>
                <IconButton
                  id={carrer.id}
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
