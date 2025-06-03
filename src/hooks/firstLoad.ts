
import { useLocalStorage } from "usehooks-ts";
import { IS_LOAD_EVENT_FIRED } from "../constants";
import { useEffect } from "react";
import { useEvent } from "./useEvent";

export const useFirstLoad = () => {
  const [isLoadEventFired, setIsLoadEventFired] = useLocalStorage(IS_LOAD_EVENT_FIRED, false);
  const { sendEvent } = useEvent();

  useEffect(() => {
    const onFirstLoad = async () => {
      const pwaId = localStorage.getItem('pwaId');
      const clid = localStorage.getItem('clid');
      if (!isLoadEventFired) {
        await sendEvent(`/event?event=install&clid=${clid}&pwaID=${pwaId}`);
        setIsLoadEventFired(true);
       }
    }
    onFirstLoad();
  }, [isLoadEventFired]);
}