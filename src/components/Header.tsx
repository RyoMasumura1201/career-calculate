import { Text } from '@chakra-ui/layout';

export const Header: React.VFC = () => {
  return (
    <header style={{ textAlign: 'center' }}>
      <Text fontSize='xx-large' fontWeight='bold'>
        経歴年度計算
      </Text>
    </header>
  );
};
