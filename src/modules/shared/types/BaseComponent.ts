import type { ReactNode } from 'react';

export interface BaseComponentProps {
  children?: ReactNode;
  className?: string;
  id?: string;
}

export interface BaseLayoutProps extends BaseComponentProps {
  title?: string;
  description?: string;
}
