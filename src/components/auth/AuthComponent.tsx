import { ReactNode } from 'react';
import { useContainer } from '@/store/unstated';
import auth from '@/store/auth';

interface IAuthComponentProps {
  authKey: string;
  children: ReactNode;
}

export default function ({ authKey, children }: IAuthComponentProps) {
  const { authKeys } = useContainer(auth);
  return authKeys.includes(authKey) ? children : null;
}
