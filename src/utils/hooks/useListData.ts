import { useCallback, useEffect, useMemo, useState } from 'react';
import { message, TablePaginationConfig } from 'antd';
import useWatch from '@/utils/hooks/useWatch';

export interface IListDataProps {
  fetchListData: any;
  queryParams?: object | undefined;
  pageSize?: number;
  shouldRestList?: boolean;
  pageStartNum?: number;
  immediate?: boolean;
  totalName?: string;
  pageNoName?: string;
  pageSizeName?: string;
}

const useListData = ({
  pageSize = 10,
  pageStartNum = 1,
  queryParams = {},
  fetchListData,
  shouldRestList = false,
  immediate = false,
  totalName = 'total',
  pageNoName = 'pageNo',
  pageSizeName = 'pageSize',
}: IListDataProps) => {
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState<any>({ total: 0, items: [] });
  const [currentNum, setCurrentNum] = useState(1);
  const [finalPageSize, setFinalPageSize] = useState(pageSize);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await fetchListData({
        [pageNoName]: currentNum - 1 + pageStartNum,
        [pageSizeName]: finalPageSize,
        ...queryParams,
      });
      setListData(result);
    } catch (e) {
      message.error('加载数据失败');
    } finally {
      setLoading(false);
    }
  }, [queryParams, currentNum, finalPageSize]);

  const onPageNumChange = useCallback((num: number) => {
    setCurrentNum(num);
  }, []);

  const onPageSizeChange = useCallback(
    (_, num: number) => {
      setFinalPageSize(num);
      if (currentNum !== 1) {
        setCurrentNum(1);
      }
    },
    [currentNum]
  );

  const pagination: TablePaginationConfig = useMemo(
    () => ({
      pageSize: finalPageSize,
      current: currentNum,
      total: listData[totalName],
      onChange: onPageNumChange,
      showTotal: (total: number) => `总共 ${total} 条数据`,
      onShowSizeChange: onPageSizeChange,
      showSizeChanger: true,
      showQuickJumper: true,
    }),
    [finalPageSize, currentNum, listData, currentNum, onPageNumChange]
  );

  useEffect(() => {
    setFinalPageSize(pageSize);
  }, [pageSize]);

  useWatch(finalPageSize, () => fetchData());

  useWatch(shouldRestList, () => fetchData());

  useWatch(currentNum, (preValue) => {
    if (preValue !== currentNum) fetchData();
  });

  useWatch(
    queryParams,
    () => {
      setCurrentNum(1);
      fetchData();
    },
    { immediate }
  );

  return { loading, listData, pagination };
};

export default useListData;
