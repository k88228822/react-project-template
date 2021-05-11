interface IRouterConfig {
  path: string;
  name: string;
}

const configs: IRouterConfig[] = [
  {
    path: '/project/list',
    name: '项目列表',
  },
  {
    path: '/project/detail',
    name: '项目详情',
  },
];

export default configs;
