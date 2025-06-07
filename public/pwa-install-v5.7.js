// pwa-install.js — переиспользуемый для всех лендингов
(function () {
  const source = document.currentScript.dataset.source || 'unknown-landing';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }
  
  const installBtn = document.getElementById('install-btn');
  const openLink = document.getElementById('open-link');
  const popup = document.getElementById('install-popup');
  const popupStatus = document.getElementById('install-popup-status');
  const popupOpenLink = document.getElementById('install-popup-open-link');
  const loader = document.querySelector('.install-popup-loader');
  const verifiedLine = document.getElementById('install-status-line');
  const installedLine = document.getElementById('installed-status-line');

  function getClidId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('clid') || '';
  }

  function getConf() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('conf') || 0;
  }

  function generateUUID() {
    return crypto.randomUUID?.() || ([1e7]+-1e3+-4e3+-8e3+-1e11)
      .replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
  }

  // const checkIfAppInstalled = async () => {
  //   const relatedApps = await navigator.getInstalledRelatedApps();
  //   const isInstalled = relatedApps.some(app => app.platform === 'webapp' && app.url.includes('hide-vpn.com'));

  //   return isInstalled
  // };

  const init = async () => {
    if (!localStorage.getItem('pwaId')) {
      const clid = getClidId();
      const pwaId = generateUUID();
      const conf = getConf();
      localStorage.setItem('clid', clid);
      localStorage.setItem('pwaId', pwaId);
      localStorage.setItem('conf', conf);
    }

    const isInstalled = false;

    if (isInstalled) {
      installBtn?.classList.add('hidden');
      openLink?.classList.remove('hidden');
      popupStatus?.classList.add('hidden');
      popupOpenLink?.classList.remove('hidden')
      verifiedLine?.classList.add('hidden');
      installedLine?.classList.remove('hidden');
      loader?.classList.add('hidden');
    } else {
      installBtn?.classList.remove('hidden');
      if (installBtn) {
        installBtn.innerText = 'Установить';
      }
      openLink?.classList.add('hidden');
    
      popupStatus?.classList.remove('hidden');
      if (popupStatus) {
        popupStatus.innerText = 'Загрузка...';
      }
      popupOpenLink?.classList.add('hidden');
      loader?.classList.remove('hidden');
    
      verifiedLine?.classList.remove('hidden');
      installedLine?.classList.add('hidden');
    }
  }

  let deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) {
      installBtn.classList.add('visible');
    }
  });
  
  window.installApp = async function () {
    if (!deferredPrompt) return;
    
    if (installBtn) {
      installBtn.innerText = 'Загрузка...';
      installBtn.disabled = true;
    }

    const clid = getClidId();
    const url = `https://wurvent.com/event?event=ctr&clid=${clid}`;
    await fetch(url)

    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(async (choice) => {
      if (choice.outcome === 'accepted') {
          try {
            document.getElementById('install-popup')?.classList.remove('hidden');
            popup?.classList.remove('hidden');
            popupStatus?.classList.remove('hidden');
            if (popupStatus) {
              popupStatus.innerText = 'Загрузка...';
            }
            popupOpenLink?.classList.add('hidden');
            
            const pwaId = localStorage.getItem('pwaId') || '';
            const url = `https://wurvent.com/event?event=installclick&clid=${clid}&pwaID=${pwaId}`;
            await fetch(url)
          } catch (e) {
             console.log(e);
          }
      }
      deferredPrompt = null;
 
    });
  };

  setInterval(() => {
    init();
  }, 2000);
  
  init();
})();