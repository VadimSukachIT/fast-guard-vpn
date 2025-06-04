import OneSignal from 'react-onesignal';
import { useEffect, useState } from 'react';
import { useEvent } from './useEvent';

import { ONE_SIGNAL_APP_ID, ONE_SIGNAL_TEST_APP_ID } from '../constants';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from 'usehooks-ts';

export const useNotifications = () => {
  const { sendEvent } = useEvent();
  const { t } = useTranslation();
  const [showPrompt, setShowPrompt] = useState(false);
  const [notificationPromptShown, setNotificationPromptShown] = useLocalStorage('notificationPromptShown', false);
 
  const onClose = () => setShowPrompt(false);

  useEffect(() => {
    const initNotifications = async () => {
      await OneSignal.init({
        appId: import.meta.env.VITE_VERCEL_ENV === 'production' ? ONE_SIGNAL_TEST_APP_ID : ONE_SIGNAL_APP_ID,
        serviceWorkerPath: 'service-worker.js',
        serviceWorkerUpdaterPath: 'service-worker.js',
        serviceWorkerOverrideForTypical: true,
        promptOptions: {
          slidedown: {
            prompts: [{
              autoPrompt: false,
              categories: [],
              delay: {
                timeDelay: 0,
                pageViews: 0,
              },
              text: {
                cancelMessage: t('notifications.cancel'),
                acceptButton: t('notifications.accept'),
                actionMessage: t('notifications.acceptMessage'),
              },
              type: 'push',
            }]
          }
        },
        // allowLocalhostAsSecureOrigin: true,
        notifyButton: {
          showCredit: false,
          prenotify: false,
          text: {

          'dialog.blocked.message': 'test',
          'dialog.blocked.title': 'test',
          'dialog.main.button.subscribe': 'test',
          'dialog.main.button.unsubscribe': 'test',
          'dialog.main.title': 'test',
          'message.action.resubscribed': '',
          'message.action.subscribed': '',
          'message.action.subscribing': '',
          'message.action.unsubscribed': '',
          'message.prenotify': '',
          'tip.state.blocked': '',
          'tip.state.subscribed': '',
          'tip.state.unsubscribed': '',
          },
          enable: false,
        }
      });

      if (!OneSignal || !OneSignal.Notifications || !OneSignal.User) {
        console.warn('[OneSignal] SDK not fully initialized');
      }

        const permission = await OneSignal.Notifications.permission;
        const isSubscribed = await OneSignal.User.PushSubscription.optedIn;
  
        if ((!permission || !isSubscribed) && !notificationPromptShown) {
          setNotificationPromptShown(true);
          setShowPrompt(true);
        }

    }

    initNotifications();
  }, []);

  const onSubscribe = async () => {
    try {
      await OneSignal.Notifications.requestPermission();
      await OneSignal.User.PushSubscription.optIn();
      const oneSignalId = await OneSignal.User.onesignalId;
      const pwaId = localStorage.getItem('pwaId');
      const clid = localStorage.getItem('clid');
      await sendEvent(`/event?event=notification&clid=${clid}&pwaID=${pwaId}&onesignalID=${oneSignalId}`)
      setShowPrompt(false);
    } catch (e) {
      console.error('Ошибка подписки на уведомления', e);
    }
  }


  return { onSubscribe, showPrompt, onClose};
}