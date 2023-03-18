// content script

import { Message } from './types';

function sendPageContent() {
  const textNodes = document.querySelectorAll('body, p, h1, h2, h3, h4, h5, h6');
  const textContent = Array.from(textNodes).map((node) => node.textContent).join(' ');
  const metadata = {
    url: window.location.href,
    timestamp: new Date().toISOString(),
  };

  const message: Message = { textContent, metadata };
  console.log('Sending message', message);
  chrome.runtime.sendMessage(message);
}

if (document.readyState === 'complete') {
  // If the page is already loaded, send the message immediately
  console.log('Page is already loaded, sending message immediately')
  sendPageContent();
} else {
  console.log('Page is not loaded, waiting for load event')
  window.addEventListener('load', sendPageContent);

}
