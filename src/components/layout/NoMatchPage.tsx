import React from 'react';
import { useLocation } from 'react-router-dom';

export default function () {
  const location = useLocation();
  return <div>找不到页面：{location.pathname}</div>;
}
