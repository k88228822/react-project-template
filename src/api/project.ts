import { post } from '@/utils/request';

export const getProjectList = async () => {
  return post('/project/list', { pageNo: 1, pageSize: 10 });
};
