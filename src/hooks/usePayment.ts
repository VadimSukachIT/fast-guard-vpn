import { useState } from "react";
import { useEvent } from "./useEvent";
import OneSignal from "react-onesignal";
import { useLocalStorage } from "usehooks-ts";

export const usePayment = (subID: number, isFreeTrial?: boolean) => {
  const { sendEvent } = useEvent();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [conf] = useLocalStorage('conf', 0);
 
  const getSubscriptionId = () => {
    return isFreeTrial ? subID - 1 : subID;
  }

  const openExternalLink = (url: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const onPayment = async () => {
    setIsLoading(true);
    const pwaId = localStorage.getItem('pwaId');
    const clid = localStorage.getItem('clid');
    const subscriptionId = getSubscriptionId();
    const oneSignalID = OneSignal.User.onesignalId || '';

     await sendEvent(`/event?event=paymentopen&clid=${clid}&pwaID=${pwaId}&onesignalID=${oneSignalID}&subID=${subID}`)

     const isStandalone =  window.matchMedia('(display-mode: standalone)').matches ||
     (window.navigator as any).standalone === true;

     console.log('Is standalone: ', isStandalone);
     console.log(conf, typeof conf);
     const paymentLink = `https://ray.yourmessage.me/v1.0/user/billing/flow/web/yookassa/subscription/create?subscriptionId=${subscriptionId}&pwaId=${pwaId}&clickId=${clid}&onesignalID=${oneSignalID}&source=pwa&urlOk=https://hide-vpn.com?payment-success=true&urlFail=https://hide-vpn.com?payment-success=false`;
     if (isStandalone && conf === 1) {
      console.log('window.open blank');
      openExternalLink(paymentLink);
     } else {
        console.log('default');
        window.location.href = paymentLink;
     }


    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  };

  return { onPayment, isLoading };
}