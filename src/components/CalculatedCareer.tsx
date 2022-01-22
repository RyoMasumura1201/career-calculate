import { Text } from '@chakra-ui/layout';
import { calculatedCareerType } from '../../type';
import { memo } from 'react';

type Props = Omit<calculatedCareerType, 'id'>;

const CalculatedCareer: React.VFC<Props> = (props) => {
  const { job, fromYear, fromMonth, toYear, toMonth } = props;
  return (
    <Text>
      {job}:{fromYear}年{fromMonth}月~{toYear}年{toMonth}月
    </Text>
  );
};

export default memo(CalculatedCareer);
