import React from 'react';
import ReactDom from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.less';
import Layout from '@/components/layout';
import { Provider } from '@/store';
import { BrowserRouter } from 'react-router-dom';
import './index.less';

function Root() {
  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Provider>
          <Layout />
        </Provider>
      </BrowserRouter>
    </ConfigProvider>
  );
}

ReactDom.render(<Root />, document.getElementById('root'));
