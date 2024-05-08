import { useContext, useState } from 'react';
import { Task as TaskType, TasksContext } from '../context/TasksContext';
import {
  MdCheck,
  MdClose,
  MdDeleteOutline,
  MdModeEditOutline,
} from 'react-icons/md';
import { ACTION_TYPES } from '../App';

const datetimeFormatter = new Intl.DateTimeFormat('zh-TW', {
  dateStyle: 'short',
  timeStyle: 'medium',
  hour12: false,
});
export default function Task({ task }: { task: TaskType }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(task.name);
  const { dispatch } = useContext(TasksContext);
  const onToggle = (id: number) => {
    dispatch({ type: ACTION_TYPES.TOGGLE_TASK, payload: { id } });
  };
  const onRemove = (id: number) => {
    dispatch({ type: ACTION_TYPES.DELETE_TASK, payload: { id } });
  };
  const onEdit = () => {
    setIsEditing(true);
    setInputValue(task.name);
  };
  const onCancel = () => {
    setIsEditing(false);
    setInputValue(task.name);
  };
  const onConfirm = () => {
    if (inputValue === '') {
      alert('請輸入任務描述');
      return;
    }
    setIsEditing(false);
    dispatch({
      type: ACTION_TYPES.UPDATE_TASK,
      payload: { id: task.id, name: inputValue },
    });
  };
  return (
    <div
      className={
        'text-xl border-2 rounded p-2 mb-1 cursor-pointer flex justify-between items-center gap-2'
      }
    >
      <div className="grow">
        <label
          className={`flex items-center cursor-pointer hover:text-blue-400  ${
            task.completed ? 'line-through' : ''
          }`}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="mr-2 w-5 h-5 cursor-pointer"
          />

          <div className={'w-full'}>
            <div>
              {isEditing ? (
                <input
                  type="text"
                  className="w-full p-1"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.currentTarget.value)}
                />
              ) : (
                task.name
              )}
            </div>
            <div className={'text-sm text-gray-400'}>
              {datetimeFormatter.format(task.createdAt)}
            </div>
          </div>
        </label>
      </div>

      <div className="flex gap-1 items-center">
        {isEditing ? (
          <>
            <button className="" onClick={onConfirm}>
              <MdCheck className="w-5 h-5 text-green-600" />
            </button>
            <button className="" onClick={onCancel}>
              <MdClose className="w-5 h-5 " />
            </button>
          </>
        ) : (
          <>
            <button className="" onClick={onEdit}>
              <MdModeEditOutline className="w-5 h-5 hover:text-gray-500" />
            </button>
            <button className="" onClick={() => onRemove(task.id)}>
              <MdDeleteOutline className="w-5 h-5 text-red-600 hover:text-red-500" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
