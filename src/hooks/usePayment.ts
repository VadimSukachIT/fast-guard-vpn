import { useState } from "react";
import { useEvent } from "./useEvent";
import OneSignal from "react-onesignal";
// import { useLocalStorage } from "usehooks-ts";

export const usePayment = (subID: number, isFreeTrial?: boolean) => {
  const { sendEvent } = useEvent();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [conf] = useLocalStorage('conf', 0);
 
  const getSubscriptionId = () => {
    return isFreeTrial ? subID - 1 : subID;
  }

  const onPayment = async () => {
    setIsLoading(true);
    const pwaId = localStorage.getItem('pwaId');
    const clid = localStorage.getItem('clid');
    const subscriptionId = getSubscriptionId();
    const oneSignalID = OneSignal.User.onesignalId || '';

    await sendEvent(`/event?event=paymentopen&clid=${clid}&pwaID=${pwaId}&onesignalID=${oneSignalID}&subID=${subID}`)
    const urlOk = encodeURIComponent('https://hide-vpn.com?payment-success=true');
    const urlFail = encodeURIComponent('https://hide-vpn.com?payment-success=false');
    //  const isStandalone =  window.matchMedia('(display-mode: standalone)').matches ||
    //  (window.navigator as any).standalone === true;

    //  const paymentLink = `https://ray.yourmessage.me/v1.0/user/billing/flow/web/yookassa/subscription/create?subscriptionId=${subscriptionId}&pwaId=${pwaId}&clickId=${clid}&onesignalID=${oneSignalID}&source=pwa&urlOk=https://hide-vpn.com?payment-success=true&urlFail=https://hide-vpn.com?payment-success=false`;
    const paymentLink = `https://ray.yourmessage.me/v1.0/user/billing/flow/web/yookassa/subscription/create?subscriptionId=${subscriptionId}&pwaId=${pwaId}&clickId=${clid}&onesignalID=${oneSignalID}&source=pwa&urlOk=${urlOk}&urlFail=${urlFail}`;

     window.open(paymentLink, '_blank', 'noopener,noreferrer');
    //  if (isStandalone && conf === 1) {

        // window.location.href = paymentLink;
    //  }


    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  };

  return { onPayment, isLoading };
}