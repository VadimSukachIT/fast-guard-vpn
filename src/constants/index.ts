import FinlandIcon from '../assets/svg/finland.svg?react';
import JapanIcon from '../assets/svg/japan.svg?react';
import BrazilIcon from '../assets/svg/brazil.svg?react';
import CanadaIcon from '../assets/svg/canada.svg?react';
import USAIcon from '../assets/svg/usa.svg?react';
import SouthAfricaIcon from '../assets/svg/south-africa.svg?react';
import SingaporeIcon from '../assets/svg/singapore.svg?react';
import QatarIcon from '../assets/svg/qatar.svg?react';

export const IS_ONBOARD_COMPLETED = 'isOnboardCompleted';
export const IS_PREMIUM_PURCHASED = 'isPremiumPurchased';
export const IS_LOAD_EVENT_FIRED = 'isLoadEventFired';
export const IS_NOTIFICATIONS_ENABLED = 'isNotificationsEnabled';
export const ONE_SIGNAL_APP_ID = 'c30d700e-a2f5-4b7c-aa55-9656bdd74747';
export const ONE_SIGNAL_TEST_APP_ID = 'a37659d2-0b83-4803-a669-31b5a2aa8f53';
export const SELECTED_SERVER_ID = 'selectedCountry';
export const DEFAULT_SERVER_ID = '1';

export const SERVERS: {
  array: { id: string; name: string; town: string; FlagIcon: any; signal: string }[];
  byIds: {
    [key: string]: { id: string; town: string; name: string; FlagIcon: any; signal: string };
  };
} = {
  array: [
    { id: '1', name: 'Финляндия', town: 'Хельсинки', FlagIcon: FinlandIcon, signal: 'green' },
    { id: '2', name: 'Япония', town: 'Токио', FlagIcon: JapanIcon, signal: 'yellow' },
    { id: '3', name: 'Бразилия', town: 'Бразилиа', FlagIcon: BrazilIcon, signal: 'yellow' },
    { id: '4', name: 'Канада', town: 'Оттава', FlagIcon: CanadaIcon, signal: 'yellow' },
    { id: '5', name: 'США', town: 'Вашингтон', FlagIcon: USAIcon, signal: 'yellow' },
    { id: '6', name: 'Южная Африка', town: 'Претория', FlagIcon: SouthAfricaIcon, signal: 'red' },
    { id: '7', name: 'Сингапур', town: 'Сингапур', FlagIcon: SingaporeIcon, signal: 'red' },
    { id: '8', name: 'Катар', town: 'Доха', FlagIcon: QatarIcon, signal: 'yellow' },
  ],
  byIds: {
    '1': { id: '1', name: 'Финляндия', town: 'Хельсинки', FlagIcon: FinlandIcon, signal: 'green' },
    '2': { id: '2', name: 'Япония', town: 'Токио', FlagIcon: JapanIcon, signal: 'yellow' },
    '3': { id: '3', name: 'Бразилия', town: 'Бразилиа', FlagIcon: BrazilIcon, signal: 'yellow' },
    '4': { id: '4', name: 'Канада', town: 'Оттава', FlagIcon: CanadaIcon, signal: 'yellow' },
    '5': { id: '5', name: 'США', town: 'Вашингтон', FlagIcon: USAIcon, signal: 'yellow' },
    '6': { id: '6', name: 'Южная Африка', town: 'Претория', FlagIcon: SouthAfricaIcon, signal: 'red' },
    '7': { id: '7', name: 'Сингапур', town: 'Сингапур', FlagIcon: SingaporeIcon, signal: 'red' },
    '8': { id: '8', name: 'Катар', town: 'Доха', FlagIcon: QatarIcon, signal: 'yellow' },
  }
};
