'use client';

import Header from '@/components/Header';
import {
  Bell,
  CreditCard,
  Globe,
  Key,
  Moon,
  Save,
  Settings as SettingsIcon,
  Shield,
  Smartphone,
  User,
} from 'lucide-react';
import { useState } from 'react';
import type React from 'react';

type UserSetting = {
  label: string;
  value: string | boolean;
  type: 'text' | 'toggle' | 'select';
  icon: React.ReactNode;
  description?: string;
  options?: string[];
  category: 'account' | 'appearance' | 'notifications' | 'security' | 'payment';
};

const mockSettings: UserSetting[] = [
  {
    label: 'Username',
    value: 'john_doe',
    type: 'text',
    icon: <User className="h-5 w-5" />,
    description: 'Your unique username for identification',
    category: 'account',
  },
  {
    label: 'Email',
    value: 'john.doe@example.com',
    type: 'text',
    icon: <User className="h-5 w-5" />,
    description: 'Your email address for communications',
    category: 'account',
  },
  {
    label: 'Phone Number',
    value: '+1 (555) 123-4567',
    type: 'text',
    icon: <Smartphone className="h-5 w-5" />,
    description: 'Your contact phone number',
    category: 'account',
  },
  {
    label: 'Email Notifications',
    value: true,
    type: 'toggle',
    icon: <Bell className="h-5 w-5" />,
    description: 'Receive notifications via email',
    category: 'notifications',
  },
  {
    label: 'Push Notifications',
    value: false,
    type: 'toggle',
    icon: <Bell className="h-5 w-5" />,
    description: 'Receive push notifications on your devices',
    category: 'notifications',
  },
  {
    label: 'Dark Mode',
    value: false,
    type: 'toggle',
    icon: <Moon className="h-5 w-5" />,
    description: 'Switch between light and dark theme',
    category: 'appearance',
  },
  {
    label: 'Language',
    value: 'English',
    type: 'select',
    icon: <Globe className="h-5 w-5" />,
    options: ['English', 'Spanish', 'French', 'German', 'Japanese'],
    description: 'Select your preferred language',
    category: 'appearance',
  },
  {
    label: 'Two-Factor Authentication',
    value: true,
    type: 'toggle',
    icon: <Shield className="h-5 w-5" />,
    description: 'Add an extra layer of security to your account',
    category: 'security',
  },
  {
    label: 'Password Reset',
    value: '',
    type: 'text',
    icon: <Key className="h-5 w-5" />,
    description: 'Change your account password',
    category: 'security',
  },
  {
    label: 'Default Payment Method',
    value: 'Credit Card',
    type: 'select',
    icon: <CreditCard className="h-5 w-5" />,
    options: ['Credit Card', 'PayPal', 'Bank Transfer'],
    description: 'Select your preferred payment method',
    category: 'payment',
  },
];

const Settings = () => {
  const [userSettings, setUserSettings] = useState<UserSetting[]>(mockSettings);
  const [activeTab, setActiveTab] = useState<string>('account');

  const handleToggleChange = (index: number) => {
    const settingsCopy = [...userSettings];
    settingsCopy[index].value = !settingsCopy[index].value as boolean;
    setUserSettings(settingsCopy);
  };

  const handleTextChange = (index: number, value: string) => {
    const settingsCopy = [...userSettings];
    settingsCopy[index].value = value;
    setUserSettings(settingsCopy);
  };

  const handleSelectChange = (index: number, value: string) => {
    const settingsCopy = [...userSettings];
    settingsCopy[index].value = value;
    setUserSettings(settingsCopy);
  };

  const filteredSettings = userSettings.filter(
    (setting) => setting.category === activeTab
  );

  const categories = [
    { id: 'account', label: 'Account', icon: <User className="h-5 w-5" /> },
    {
      id: 'appearance',
      label: 'Appearance',
      icon: <Moon className="h-5 w-5" />,
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Bell className="h-5 w-5" />,
    },
    { id: 'security', label: 'Security', icon: <Shield className="h-5 w-5" /> },
    {
      id: 'payment',
      label: 'Payment',
      icon: <CreditCard className="h-5 w-5" />,
    },
  ];

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-3">
        <SettingsIcon className="h-7 w-7 text-blue-600" />
        <Header name="User Settings" />
      </div>
      <p className="text-gray-500">
        Manage your account settings and preferences
      </p>

      <div className="flex flex-col gap-6 md:flex-row">
        {/* Sidebar */}
        <div className="w-full rounded-xl bg-white p-4 shadow-sm md:w-64">
          <nav className="space-y-1">
            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${
                  activeTab === category.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span
                  className={
                    activeTab === category.id
                      ? 'text-blue-600'
                      : 'text-gray-500'
                  }
                >
                  {category.icon}
                </span>
                <span className="font-medium">{category.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 font-semibold text-xl">
            {categories.find((c) => c.id === activeTab)?.label} Settings
          </h2>

          <div className="space-y-6">
            {filteredSettings.map((setting, _index) => {
              const originalIndex = userSettings.findIndex(
                (s) => s.label === setting.label
              );

              return (
                <div
                  key={setting.label}
                  className="border-gray-100 border-b pb-6 last:border-0"
                >
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 rounded-full bg-blue-50 p-2 text-blue-600">
                        {setting.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {setting.label}
                        </h3>
                        {setting.description && (
                          <p className="text-gray-500 text-sm">
                            {setting.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="ml-10 md:ml-0">
                      {setting.type === 'toggle' ? (
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            className="peer sr-only"
                            checked={setting.value as boolean}
                            onChange={() => handleToggleChange(originalIndex)}
                          />
                          <div className="peer h-6 w-11 rounded-full bg-gray-200 transition after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-400" />
                        </label>
                        // biome-ignore lint/nursery/noNestedTernary:
                      ) : setting.type === 'select' ? (
                        <select
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                          value={setting.value as string}
                          onChange={(e) =>
                            handleSelectChange(originalIndex, e.target.value)
                          }
                        >
                          {setting.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                          value={setting.value as string}
                          onChange={(e) =>
                            handleTextChange(originalIndex, e.target.value)
                          }
                          placeholder={`Enter your ${setting.label.toLowerCase()}`}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
