import React from 'react';
import { Container } from '@/store/unstated';
import root from '@/store/root';
import auth from '@/store/auth';

function compose(...containers: Array<Container<any, any>>) {
  return function Component(props: any) {
    return containers.reduceRight((children, ItemContainer) => {
      return <ItemContainer.Provider>{children}</ItemContainer.Provider>;
    }, props.children);
  };
}

export const Provider = compose(root, auth);
