import { useState } from "react";
import { useEvent } from "./useEvent";
import OneSignal from "react-onesignal";

export const usePayment = (subscriptionId: number) => {
  const { sendEvent } = useEvent();
  const [isLoading, setIsLoading] = useState<boolean>(false);
   
  const onPayment = async () => {
    setIsLoading(true);
    const pwaId = localStorage.getItem('pwaId');
    const clid = localStorage.getItem('clid');
    let oneSignalID = '';
     try {
      oneSignalID = await OneSignal.User.onesignalId || '';
     } catch (e) {
      console.log(e);
     }
    await sendEvent(`/event?event=paymentopen&clid=${clid}&pwaID=${pwaId}&onesignalID=${oneSignalID}&subID=${subscriptionId}`)
    
    window.location.href = `https://ray.yourmessage.me/v1.0/user/billing/flow/web/yookassa/subscription/create?subscriptionId=${subscriptionId}&pwaId=${pwaId}&clickId=${clid}&onesignalID=${oneSignalID}&source=pwa&urlOk=https://hide-vpn.com?payment-success=true&urlFail=https://hide-vpn.com?payment-success=false`

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  };

  return { onPayment, isLoading };
}