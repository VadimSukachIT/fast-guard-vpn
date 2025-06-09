import Header from '../../../components/Header';
import GreenConnectionIcon from '../../../assets/svg/green-connection.svg?react';
import YellowConnectionIcon from '../../../assets/svg/yellow-connection.svg?react';
import RedConnectionIcon from '../../../assets/svg/red-connection.svg?react';
// import LockIcon from '../../../assets/svg/lock.svg?react';
import { useNavigate } from 'react-router';
import { useLocalStorage } from 'usehooks-ts';
import { SERVERS, SELECTED_SERVER_ID, DEFAULT_SERVER_ID } from '../../../constants';
import { useTranslation } from 'react-i18next';
import { useThemeColor } from '../../../hooks/useThemeColor';

const ServerConnectionIconsMap: { [key: string]: any } = {
  green: <GreenConnectionIcon className="w-[clamp(20px,4vw,30px)] h-[clamp(16px,4vw,24px)]" />,
  yellow: <YellowConnectionIcon className="w-[clamp(20px,4vw,30px)] h-[clamp(16px,4vw,24px)]" />,
  red: <RedConnectionIcon className="w-[clamp(20px,4vw,30px)] h-[clamp(16px,4vw,24px)]" />,
};

const ServersPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useThemeColor();

  // const [isPremiumPurchased] = useLocalStorage(IS_PREMIUM_PURCHASED, false);
  const [selectedServerId, setSelectedServerId] = useLocalStorage(SELECTED_SERVER_ID, DEFAULT_SERVER_ID);

  console.log(setSelectedServerId);
  const onServerClick = ()  => {
    // setSelectedServerId(id);
    // if (!isPremiumPurchased) {
    //   navigate('/onboarding');
    //   return;
    // }
    navigate('/connection-error');
  };

  const onGoBack = () => navigate('/');

  return (
    <div className="min-h-dvh bg-lightGrey px-[clamp(16px,4vw,24px)] pb-[clamp(20px,6vh,56px)] text-black font-sans">
      <Header title={t('servers.title')} onClick={onGoBack} />

      <p className="text-[clamp(14px,4vw,16px)] text-secondaryGrey mb-[clamp(8px,2vw,12px)] mt-[clamp(8px,2vw,14px)]">
        {t('servers.chooseServer')}
      </p>

      <div className="overflow-y-auto max-h-[70vh] space-y-[clamp(10px,2.5vw,14px)] pr-[2px] no-scrollbar">
        {SERVERS.array.map(({ id, name, FlagIcon, signal}) => (
          <label
            onClick={() => onServerClick()}
            key={id}
            className="bg-white rounded-2xl p-[clamp(12px,4vw,16px)] flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-[clamp(10px,3vw,14px)]">
              <FlagIcon className="w-[clamp(20px,10vw,30px)] h-[clamp(16px,10vw,24px)]" />
              <span className="text-[clamp(14px,4vw,16px)]">{name}</span>
            </div>

            <div className="flex items-center gap-[clamp(10px,2.5vw,14px)]">
              {ServerConnectionIconsMap[signal]}
              {/* {!isPremiumPurchased ? (
                <LockIcon className="w-[clamp(18px,4.5vw,20px)] h-auto" />
              ) : (
                <> */}
                  <input
                    type="radio"
                    name="server"
                    className="sr-only peer"
                    checked={selectedServerId === id}
                    onChange={() => {}}
                  />
                  <div className="w-[clamp(16px,4vw,20px)] h-[clamp(16px,4vw,20px)] rounded-full border-2 border-secondaryGrey peer-checked:border-lightBlue flex items-center justify-center">
                    {selectedServerId === id && (
                      <div className="w-[clamp(8px,2vw,10px)] h-[clamp(8px,2vw,10px)] rounded-full bg-lightBlue" />
                    )}
                  </div>
                {/* </> */}
              {/* )} */}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ServersPage;
