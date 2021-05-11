import React from 'react';
import { Layout } from 'antd';
import LayoutHeader from '@/components/layout/LayoutHeader';
import LayoutContent from '@/components/layout/LayoutContent';
import LayoutMenu from '@/components/layout/LayoutMenu';

const { Header, Sider, Content } = Layout;

export default function () {
  return (
    <Layout className="page-layout-container">
      <Sider theme="light" className="page-layout-aside" width={208}>
        <LayoutMenu />
      </Sider>
      <Sider width={208} />
      <div className="page-layout-content">
        <Header>
          <LayoutHeader />
        </Header>
        <Content>
          <LayoutContent />
        </Content>
      </div>
    </Layout>
  );
}
