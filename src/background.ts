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




// Define the message handler function
function handleMessage(message: Message, sender: any, sendResponse: any): void {
  console.log("Message received");

  const { textContent, metadata } = message;
  console.log(`Received message from URL: ${metadata.url}, timestamp: ${metadata.timestamp}`);
  const domain = new URL(metadata.url).hostname;

  incrementDomainCount(domain, () => {
    updateBadge();
  });
}

// Increments the message count for a given domain
function incrementDomainCount(domain: string, callback: Function): void {
  chrome.storage.local.get('domainCounts', (result) => {
    const domainCounts = result.domainCounts as DomainCounts || {};
    const count = domainCounts[domain] || 0;
    domainCounts[domain] = count + 1;
    chrome.storage.local.set({ domainCounts }, () => {
      callback();
    });
  });
}

// Updates the badge text with the total message count
function updateBadge(): void {
  chrome.storage.local.get('domainCounts', (result) => {
    const domainCounts = result.domainCounts as DomainCounts || {};
    const totalCount = Object.values(domainCounts).reduce((acc, val) => acc + val, 0);
    chrome.action.setBadgeText({ text: `${totalCount}` });
  });
}

// Register the message handler function
chrome.runtime.onMessage.addListener(handleMessage);
