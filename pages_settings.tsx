import React, { useState } from 'react';
import { Switch } from '@headlessui/react';

const settingsData = {
  personalInformation: {
    username: {
      type: "text",
      label: "Username",
      value: "habitmaster123"
    },
    email: {
      type: "email",
      label: "Email Address",
      value: "user@example.com"
    },
    profilePicture: {
      type: "file",
      label: "Profile Picture",
      value: "/images/default-avatar.png"
    },
    bio: {
      type: "textarea",
      label: "Bio",
      value: "I'm on a journey to build better habits!"
    }
  },
  privacySettings: {
    profileVisibility: {
      type: "select",
      label: "Profile Visibility",
      options: ["Public", "Friends Only", "Private"],
      value: "Friends Only"
    },
    activitySharing: {
      type: "switch",
      label: "Share Activity with Friends",
      value: true
    },
    allowFriendRequests: {
      type: "switch",
      label: "Allow Friend Requests",
      value: true
    }
  },
  notificationPreferences: {
    emailNotifications: {
      type: "switch",
      label: "Email Notifications",
      value: true
    },
    pushNotifications: {
      type: "switch",
      label: "Push Notifications",
      value: true
    },
    reminderFrequency: {
      type: "select",
      label: "Reminder Frequency",
      options: ["Daily", "Weekly", "Monthly"],
      value: "Daily"
    },
    notificationTypes: {
      type: "multiselect",
      label: "Notification Types",
      options: ["Habit Reminders", "Friend Activity", "Achievements", "Challenges"],
      value: ["Habit Reminders", "Achievements"]
    }
  },
  subscriptionManagement: {
    currentPlan: {
      type: "display",
      label: "Current Plan",
      value: "Free"
    },
    upgradeToPremium: {
      type: "button",
      label: "Upgrade to Premium",
      action: "upgradePlan"
    },
    premiumFeatures: {
      type: "list",
      label: "Premium Features",
      items: [
        "Advanced Analytics",
        "Unlimited Habit Tracking",
        "Priority Support",
        "Ad-free Experience"
      ]
    },
    cancelSubscription: {
      type: "button",
      label: "Cancel Subscription",
      action: "cancelSubscription"
    }
  }
};

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState(settingsData);

  const handleInputChange = (section: string, key: string, value: any) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [section]: {
        ...prevSettings[section],
        [key]: {
          ...prevSettings[section][key],
          value: value
        }
      }
    }));
  };

  const renderInput = (section: string, key: string, item: any) => {
    switch (item.type) {
      case 'text':
      case 'email':
        return (
          <input
            type={item.type}
            id={key}
            name={key}
            value={item.value}
            onChange={(e) => handleInputChange(section, key, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        );
      case 'textarea':
        return (
          <textarea
            id={key}
            name={key}
            value={item.value}
            onChange={(e) => handleInputChange(section, key, e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        );
      case 'select':
        return (
          <select
            id={key}
            name={key}
            value={item.value}
            onChange={(e) => handleInputChange(section, key, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            {item.options.map((option: string) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'switch':
        return (
          <Switch
            checked={item.value}
            onChange={(checked) => handleInputChange(section, key, checked)}
            className={`${
              item.value ? 'bg-indigo-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">{item.label}</span>
            <span
              className={`${
                item.value ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        );
      case 'file':
        return (
          <input
            type="file"
            id={key}
            name={key}
            onChange={(e) => handleInputChange(section, key, e.target.files?.[0])}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
        );
      case 'multiselect':
        return (
          <select
            id={key}
            name={key}
            multiple
            value={item.value}
            onChange={(e) => handleInputChange(section, key, Array.from(e.target.selectedOptions, option => option.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            {item.options.map((option: string) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'display':
        return (
          <p className="mt-1 block w-full text-sm text-gray-900">{item.value}</p>
        );
      case 'button':
        return (
          <button
            onClick={() => console.log(`${item.action} clicked`)}
            className="mt-1 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {item.label}
          </button>
        );
      case 'list':
        return (
          <ul className="mt-1 list-disc list-inside text-sm text-gray-900">
            {item.items.map((listItem: string, index: number) => (
              <li key={index}>{listItem}</li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Settings and Profile Management</h1>
      
      {Object.entries(settings).map(([section, items]) => (
        <section key={section} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 capitalize">{section.replace(/([A-Z])/g, ' $1').trim()}</h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              {Object.entries(items).map(([key, item]: [string, any]) => (
                <div key={key} className="mb-4">
                  <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                    {item.label}
                  </label>
                  {renderInput(section, key, item)}
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <div className="mt-8">
        <button
          onClick={() => console.log('Settings saved:', settings)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;