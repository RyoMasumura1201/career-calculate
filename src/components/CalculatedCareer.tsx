import { memo } from 'react';
import { calculatedCareerType } from '../../type';
import { Box } from '@chakra-ui/react';
import { Text } from '@chakra-ui/layout';

type Props = Omit<calculatedCareerType, 'id'>;

const CalculatedCareer: React.VFC<Props> = (props) => {
  const { job, fromYear, fromMonth, toYear, toMonth } = props;
  return (
    <Box>
      <Text fontSize='xx-large' fontWeight='bold' textAlign='left'>
        {job}
      </Text>
      <Text fontSize='x-large'>
        {fromYear}年 {fromMonth}月 ~ {toYear}年 {toMonth}月
      </Text>
    </Box>
  );
};

export default memo(CalculatedCareer);
