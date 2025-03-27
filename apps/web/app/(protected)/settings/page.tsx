'use client';

import Header from '@/components/Header';
import { useState } from 'react';

type UserSetting = {
  label: string;
  value: string | boolean;
  type: 'text' | 'toggle';
};

const mockSettings: UserSetting[] = [
  { label: 'Username', value: 'john_doe', type: 'text' },
  { label: 'Email', value: 'john.doe@example.com', type: 'text' },
  { label: 'Notification', value: true, type: 'toggle' },
  { label: 'Dark Mode', value: false, type: 'toggle' },
  { label: 'Language', value: 'English', type: 'text' },
];

const Settings = () => {
  const [userSettings, setUserSettings] = useState<UserSetting[]>(mockSettings);

  const handleToggleChange = (index: number) => {
    const settingsCopy = [...userSettings];
    settingsCopy[index].value = !settingsCopy[index].value as boolean;
    setUserSettings(settingsCopy);
  };

  return (
    <div className="w-full">
      <Header name="User Settings" />
      <div className="mt-5 overflow-x-auto shadow-md">
        <table className="min-w-full rounded-lg bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-sm uppercase">
                Setting
              </th>
              <th className="px-4 py-3 text-left font-semibold text-sm uppercase">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {userSettings.map((setting, index) => (
              <tr className="hover:bg-blue-50" key={setting.label}>
                <td className="px-4 py-2">{setting.label}</td>
                <td className="px-4 py-2">
                  {setting.type === 'toggle' ? (
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={setting.value as boolean}
                        onChange={() => handleToggleChange(index)}
                      />
                      <div className="peer h-6 w-11 rounded-full bg-gray-200 transition after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-400" />
                    </label>
                  ) : (
                    <input
                      type="text"
                      className="rounded-lg border px-4 py-2 text-gray-500 focus:border-blue-500 focus:outline-none"
                      value={setting.value as string}
                      onChange={(e) => {
                        const settingsCopy = [...userSettings];
                        settingsCopy[index].value = e.target.value;
                        setUserSettings(settingsCopy);
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Settings;
