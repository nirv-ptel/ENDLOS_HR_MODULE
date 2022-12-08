import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [

  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'IOT Dashboard',
    icon: 'shopping-cart-outline',
    link: '/pages/sub-dashboard',
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Category',
    icon: 'layout-outline',
    children: [
      {
        title: 'Create Category',
        link: '/pages/category/main-category',
      },
    
    ],
  },
  {
    title: 'User',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Create User',
        link: '/pages/user/create-user',
      },
      {
        title: 'View User',
        link: '/pages/user/view-user',
      },
    ],
  },
];
