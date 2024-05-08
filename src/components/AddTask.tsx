import { FormEvent, useContext, useState } from 'react';
import { TasksContext } from '../context/TasksContext';
import { ACTION_TYPES } from '../App';

export default function AddTask() {
  const [value, setValue] = useState<string>('');
  const { dispatch } = useContext(TasksContext);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch({ type: ACTION_TYPES.ADD_TASK, payload: { name: value } });
    setValue('');
  };
  return (
    <form onSubmit={onSubmit} className={'flex gap-2 mb-3'}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        className={'w-full h-max p-2 border rounded-md'}
        placeholder="Add a new task..."
      />
      <button
        type="submit"
        disabled={value === ''}
        title={value === '' ? 'Enter some task description first' : 'Add Task'}
        className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
          value === '' ? 'cursor-not-allowed bg-gray-300' : 'hover:bg-blue-600'
        }`}
      >
        Add
      </button>
    </form>
  );
}
