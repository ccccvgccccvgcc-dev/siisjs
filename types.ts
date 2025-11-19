export interface PageData {
  id: string;
  title: string;
  category: 'Solar System' | 'Deep Space' | 'Humanity' | 'General';
  summary: string;
  content: string;
  imageUrl: string;
  stats: { label: string; value: string }[];
}

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon?: React.ReactNode;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
