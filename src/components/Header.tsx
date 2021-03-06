import { memo } from 'react';
import { Text } from '@chakra-ui/layout';

const Header: React.VFC = () => {
  return (
    <header style={{ textAlign: 'center' }}>
      <Text fontSize='xx-large' fontWeight='bold'>
        経歴年度計算
      </Text>
    </header>
  );
};

export default memo(Header);
