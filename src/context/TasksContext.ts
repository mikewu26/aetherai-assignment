import { createContext } from 'react';

export type Task = {
  id: number;
  name: string;
  completed: boolean;
  createdAt: Date;
};
export const TasksContext = createContext<{
  tasks: Task[];
  dispatch: React.Dispatch<any>;
}>({ tasks: [], dispatch: () => {} });
