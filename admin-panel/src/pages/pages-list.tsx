// project import
import {
    AntDesignOutlined,
    AppstoreAddOutlined,
    BarcodeOutlined,
    BgColorsOutlined,
    ChromeOutlined,
    DashboardOutlined,
    FontSizeOutlined,
    LoadingOutlined,
    LoginOutlined,
    ProfileOutlined,
    QuestionOutlined,
} from '@ant-design/icons';

const icons = {
    ChromeOutlined,
    QuestionOutlined,
    DashboardOutlined,
    LoginOutlined,
    ProfileOutlined,
    FontSizeOutlined,
    BgColorsOutlined,
    BarcodeOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    AppstoreAddOutlined,
};

export type NavigationItem = {
    id: string;
    title: string;
    type: string;
    url: string;
    icon: typeof icons.DashboardOutlined;
    breadcrumbs?: boolean;
    target?: boolean;
    external?: boolean;
    disabled?: boolean;
};

export type NavigationItemGroup = {
    id: string;
    title: string;
    type: string;
    children: NavigationItem[];
};

export type ItemsMenu = {
    items: NavigationItemGroup[];
};

const utilities = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'util-typography',
            title: 'Typography',
            type: 'item',
            url: '/typography',
            icon: icons.FontSizeOutlined,
        },
        {
            id: 'util-color',
            title: 'Color',
            type: 'item',
            url: '/color',
            icon: icons.BgColorsOutlined,
        },
        {
            id: 'util-shadow',
            title: 'Shadow',
            type: 'item',
            url: '/shadow',
            icon: icons.BarcodeOutlined,
        },
        {
            id: 'ant-icons',
            title: 'Ant Icons',
            type: 'item',
            url: '/icons/ant',
            icon: icons.AntDesignOutlined,
            breadcrumbs: false,
        },
    ],
};

const users: NavigationItemGroup = {
    id: 'manage',
    title: 'Manage',
    type: 'group',
    children: [
        {
            id: 'login1',
            title: 'Users',
            type: 'item',
            url: '/users',
            icon: icons.LoginOutlined,
        },
    ],
};

const dashboard: NavigationItemGroup = {
    id: 'home',
    title: 'Home',
    type: 'group',
    children: [
        {
            id: 'home',
            title: 'Home',
            type: 'item',
            url: '/',
            icon: icons.DashboardOutlined,
            breadcrumbs: false,
        },
    ],
};

const support = {
    id: 'support',
    title: 'Support',
    type: 'group',
    children: [
        {
            id: 'sample-page',
            title: 'Sample Page',
            type: 'item',
            url: '/sample-page',
            icon: icons.ChromeOutlined,
        },
        {
            id: 'documentation',
            title: 'Documentation',
            type: 'item',
            url: 'https://codedthemes.gitbook.io/mantis/',
            icon: icons.QuestionOutlined,
            external: true,
            target: true,
        },
    ],
};

const menuItems: ItemsMenu = {
    items: [users],
};

export default menuItems;
