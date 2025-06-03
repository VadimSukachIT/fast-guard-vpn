export const useEvent = () => {
  
  const sendEvent = async (url: string) => {
     const baseUrl = 'https://wurvent.com';

     try {
       await fetch(baseUrl + url);
     } catch (e) {
      console.log(e)
     }
  }

  return { sendEvent }; 
}