import { useContext } from 'react';
import { TasksContext } from '../context/TasksContext';
import Task from './Task';

export default function TaskList({ activeTab }: { activeTab: string }) {
  const { tasks } = useContext(TasksContext);
  const filteredTasks = tasks.filter(({ completed }) => {
    return (
      activeTab === 'All' ||
      (activeTab === 'Active' && !completed) ||
      (activeTab === 'Completed' && completed)
    );
  });
  return (
    <div className={''}>
      {filteredTasks.length ? (
        filteredTasks.map((task) => <Task task={task} />)
      ) : (
        <div className={'text-gray-500 my-5 text-center'}>No tasks found.</div>
      )}
    </div>
  );
}
