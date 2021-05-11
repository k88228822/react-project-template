import React, { useCallback, useEffect, useState } from 'react';
import { Menu } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { IMenuItem } from '@/types/menu';
import { useContainer } from '@/store/unstated';
import auth from '@/store/auth';

function findPath(tree: IMenuItem[], key: string): string[] | null {
  let path = null;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node?.children?.length) {
      path = findPath(node.children, key);
      if (path) {
        path.unshift(node.path);
        return path;
      }
    } else if (node.path === key) {
      return [node.path];
    }
  }
  return path;
}

function getOpenKeys(key: string, menus: IMenuItem[]) {
  if (!key) return [];
  const selectedPath = findPath(menus, key);
  if (!selectedPath) return [];
  selectedPath.pop();
  return selectedPath;
}

function renderMenu(menuItems: IMenuItem[]) {
  return menuItems.map((item) => {
    if (item.children) {
      return (
        <Menu.SubMenu key={item.path} title={item.name}>
          {renderMenu(item.children)}
        </Menu.SubMenu>
      );
    }
    return <Menu.Item key={item.path}>{item.name}</Menu.Item>;
  });
}

export default function () {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const history = useHistory();
  const location = useLocation();
  const { menus } = useContainer(auth);

  useEffect(() => {
    setOpenKeys(getOpenKeys(location.pathname, menus));
    /* eslint-disable */
  }, [menus]);

  useEffect(() => {
    if (!selectedKeys.includes(location.pathname)) {
      setSelectedKeys([location.pathname]);
    }
  }, [location.pathname, selectedKeys]);

  const onMenuClick = useCallback(
    (item) => {
      setSelectedKeys([item.key]);
      history.push(item.key);
    },
    [history]
  );

  const onOpenChange = useCallback((keys = []) => {
    setOpenKeys(keys);
  }, []);

  return (
    <Menu
      mode="inline"
      multiple={false}
      theme="dark"
      openKeys={openKeys}
      onClick={onMenuClick}
      onOpenChange={onOpenChange}
      selectedKeys={selectedKeys}
    >
      <div className="header-container">hello header</div>
      {renderMenu(menus)}
    </Menu>
  );
}
