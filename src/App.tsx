import { useReducer, useState } from 'react';
import './App.css';
import Tabs from './components/Tabs';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import { Task, TasksContext } from './context/TasksContext';

let id = 0;
export const ACTION_TYPES = {
  ADD_TASK: 'ADD_TASK',
  TOGGLE_TASK: 'TOGGLE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  CLEAR_COMPLETED: 'CLEAR_COMPLETED',
};
type Action =
  | { type: typeof ACTION_TYPES.ADD_TASK; payload: { name: string } }
  | { type: typeof ACTION_TYPES.TOGGLE_TASK; payload: { id: number } }
  | { type: typeof ACTION_TYPES.DELETE_TASK; payload: { id: number } }
  | {
      type: typeof ACTION_TYPES.UPDATE_TASK;
      payload: { id: number; name: string };
    }
  | { type: typeof ACTION_TYPES.CLEAR_COMPLETED };
const reducer = (state: Task[], action: Action): Task[] => {
  switch (action.type) {
    case ACTION_TYPES.ADD_TASK:
      return [
        ...state,
        {
          id: id++,
          name: action.payload.name,
          completed: false,
          createdAt: new Date(),
        },
      ];
    case ACTION_TYPES.TOGGLE_TASK:
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, completed: !task.completed }
          : task,
      );
    case ACTION_TYPES.DELETE_TASK:
      return state.filter((task) => task.id !== action.payload.id);

    case ACTION_TYPES.UPDATE_TASK:
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, name: action.payload.name }
          : task,
      );
    case ACTION_TYPES.CLEAR_COMPLETED:
      return state.filter((task) => !task.completed);
    default:
      return state;
  }
};
const initialTasks: Task[] = [];
function App() {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [tasks, dispatch] = useReducer(reducer, initialTasks);
  const onChangeTab = (tab: string) => setActiveTab(tab);
  return (
    <TasksContext.Provider value={{ tasks, dispatch }}>
      <div
        className={
          'rounded-md p-5 shadow-md mx-auto md:mt-10 md:max-w-xl bg-gray-100'
        }
      >
        <h1 className={'text-2xl font-semibold mb-3 text-center'}>Todo List</h1>
        <AddTask />
        <Tabs activeTab={activeTab} onChange={onChangeTab} />
        <TaskList activeTab={activeTab} />
      </div>
    </TasksContext.Provider>
  );
}

export default App;
