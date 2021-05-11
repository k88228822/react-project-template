import { useState } from 'react';
import { createContainer } from '@/store/unstated';
import { IMenuItem } from '@/types/menu';

const defaultMenus: IMenuItem[] = [
  {
    path: '/project',
    name: '项目',
    icon: '',
    children: [
      { path: '/project/list', name: '项目列表' },
      { path: '/project/detail', name: '项目详情' },
    ],
  },
  {
    path: '/user',
    name: '用户',
    icon: '',
    children: [
      { path: '/user/list', name: '用户列表' },
      {
        path: '/user/detail',
        name: '用户详情',
        children: [
          { path: '/user/detail/one', name: '详情1' },
          { path: '/user/detail/two', name: '详情2' },
        ],
      },
    ],
  },
  {
    path: '/test',
    name: 'test',
    icon: '',
    children: [{ path: '/test/list', name: '项目详情' }],
  },
];

const defaultAuthPath = ['/project/list'];

function useAuth() {
  const [menus] = useState<IMenuItem[]>(defaultMenus);
  const [authKeys] = useState<string[]>(defaultAuthPath);
  return { menus, authKeys };
}

export default createContainer(useAuth);
