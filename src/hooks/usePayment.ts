import { useState } from "react";
import { useEvent } from "./useEvent";
import OneSignal from "react-onesignal";

export const usePayment = (subID: number, isFreeTrial?: boolean) => {
  const { sendEvent } = useEvent();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const getSubscriptionId = () => {
    return isFreeTrial ? subID - 1 : subID;
  }

  const onPayment = async () => {
    setIsLoading(true);
    const pwaId = localStorage.getItem('pwaId');
    const clid = localStorage.getItem('clid');
    const subscriptionId = getSubscriptionId();
    let oneSignalID = '';
     try {
      oneSignalID = await OneSignal.User.onesignalId || '';
     } catch (e) {
      console.log(e);
     }
    await sendEvent(`/event?event=paymentopen&clid=${clid}&pwaID=${pwaId}&onesignalID=${oneSignalID}&subID=${subID}`)
    
    window.location.href = `https://ray.yourmessage.me/v1.0/user/billing/flow/web/yookassa/subscription/create?subscriptionId=${subscriptionId}&pwaId=${pwaId}&clickId=${clid}&onesignalID=${oneSignalID}&source=pwa&urlOk=https://hide-vpn.com?payment-success=true&urlFail=https://hide-vpn.com?payment-success=false`
  };

  return { onPayment, isLoading };
}