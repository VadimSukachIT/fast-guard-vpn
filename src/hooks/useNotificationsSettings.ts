import { useState } from "react";
import OneSignal from "react-onesignal";
import { useEvent } from "./useEvent";

export const useNotificationsSettings = () => {
  const [isEnabled, setIsEnabled] = useState(OneSignal.User.PushSubscription.optedIn);
  const { sendEvent } = useEvent();
  
  const disableNotifications = async () => {
    try {
         const permission = OneSignal.Notifications.permission;
      if (!permission) {
        await OneSignal.Notifications.requestPermission();
      }
      await OneSignal.User.PushSubscription.optOut();
      setIsEnabled(false); 
    } catch (e) {
      console.log('Ошибка отписки от уведомлений', e);
    }
  }

  const allowNotifications = async () => {
    try {
      const permission = OneSignal.Notifications.permission;
      if (!permission) {
        await OneSignal.Notifications.requestPermission();
      }
      await OneSignal.User.PushSubscription.optIn();
      const oneSignalId = await OneSignal.User.onesignalId;
      const pwaId = localStorage.getItem('pwaId');
      const clid = localStorage.getItem('clid');
      await sendEvent(`/event?event=notification&clid=${clid}&pwaID=${pwaId}&onesignalID=${oneSignalId}`)
      setIsEnabled(true);
    } catch (e) {
      console.error('Ошибка подписки на уведомления', e);
    }
  }

  const toggleNotifications = () => {
    console.log('Status: ', OneSignal.User.PushSubscription.optedIn)
    if (OneSignal.User.PushSubscription.optedIn) {
       disableNotifications();
       return;
    }
    allowNotifications();
  }

  return {
    isEnabled,
    toggleNotifications,
  }
}
