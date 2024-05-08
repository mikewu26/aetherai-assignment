const tabs = ['All', 'Active', 'Completed'];
export default function Tabs({
  activeTab,
  onChange,
}: {
  activeTab: string;
  onChange: (name: string) => void;
}) {
  return (
    <div className="mb-4 flex place-content-center">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center border-b border-gray-200">
        {tabs.map((name) => (
          <li className="">
            <button
              className={`inline-block px-4 py-2 border-blue-600 ${
                activeTab === name
                  ? 'border-b-2 text-blue-500'
                  : 'hover:text-blue-400 '
              }`}
              type="button"
              onClick={() => onChange(name)}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
