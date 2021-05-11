import { useState } from 'react';
import { createContainer } from '@/store/unstated';

function useRoot() {
  const [count] = useState(1);
  return { count };
}

export default createContainer(useRoot);
