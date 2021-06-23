import React, { useEffect, useState } from 'react';

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetch('/api/notifications');
      const data = await response.json();

      setNotifications(data.notifications);
    };

    const id = setInterval(() => fetchNotifications(), 200);

    return () => clearInterval(id);
  }, []);

  return notifications;
}

export const Button = () => {
  const notifications = useNotifications();

  return <button>Notifications: {notifications.length}</button>;
};
