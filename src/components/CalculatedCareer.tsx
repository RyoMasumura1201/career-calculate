import { Text } from '@chakra-ui/layout';
import { calculatedCareerType } from '../../type';
import { memo } from 'react';

const CalculatedCareer: React.VFC<calculatedCareerType> = (props) => {
  const { id, job, fromYear, fromMonth, toYear, toMonth } = props;
  return (
    <Text>
      {job}:{fromYear}年{fromMonth}月~{toYear}年{toMonth}月
    </Text>
  );
};

export default memo(CalculatedCareer);
