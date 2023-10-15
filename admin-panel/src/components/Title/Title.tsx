import { Flex, Image } from '@mantine/core';
import { TitleProps } from '@refinedev/core';

const Title = ({ collapsed }: TitleProps) => {
    return (
        <Flex align="center">
            <Image src="/logo.png" fit="contain" width={50} height={50} />
            {!collapsed && <span>Admin Panel</span>}
        </Flex>
    );
};

export default Title;
