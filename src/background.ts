// background.ts

import { Message } from './types';

interface DomainCounts {
  [key: string]: number;
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ domainCounts: {} });
  chrome.storage.sync.get('apiKey', ({ apiKey }) => {
    if (!apiKey) {
      chrome.runtime.openOptionsPage();
    }
  });
});





chrome.runtime.onMessage.addListener((message: Message, sender, sendResponse) => {
  console.log("message received");
  chrome.storage.sync.get("apiKey", (data) => {
    const apiKey = data.apiKey;
    if (!apiKey) {
      chrome.runtime.openOptionsPage();
    }
    console.log("API KEY: " + apiKey);

  });


  const { textContent, metadata } = message;
  console.log(`Received message from URL: ${metadata.url}, timestamp: ${metadata.timestamp}`);
  // console.log(`Content: ${textContent.slice(0, 100)}...`);

  const url = new URL(metadata.url);
  const domain = url.hostname;

  chrome.storage.local.get('domainCounts', (result) => {
    const domainCounts = result.domainCounts as DomainCounts || {};
    const count = domainCounts[domain] || 0;

    domainCounts[domain] = count + 1;
    chrome.storage.local.set({ domainCounts });

    const totalCount = Object.values(domainCounts).reduce((acc, val) => acc + val, 0);
    chrome.action.setBadgeText({ text: `${totalCount}` });
  });
});
