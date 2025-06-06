import OneSignal from 'react-onesignal';
import './App.css';

import AppRouter from './router/AppRouter';
import { useEffect } from 'react';
import { ModalProvider } from './context/ModalContext';
import ModalHost from './components/ModalHost';
import { AudioProvider } from './context/AudioContext';

function App() {
  useEffect(() => {
    OneSignal.Notifications.addEventListener('foregroundWillDisplay', (event) => {
      alert("alert " + event.notification.body.toString())
    })
  }, [])

  return (
    <div className="App">
      <AudioProvider>
        <ModalProvider>
          <AppRouter />
          <ModalHost />
        </ModalProvider>
      </AudioProvider>
    </div>
  );
}

export default App;
