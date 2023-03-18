// background.ts

import { Message } from './types';

interface DomainCounts {
  [key: string]: number;
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ domainCounts: {} });
});

chrome.runtime.onMessage.addListener((message: Message, sender, sendResponse) => {
  const { textContent, metadata } = message;
  console.log(`Received message from URL: ${metadata.url}, timestamp: ${metadata.timestamp}`);
  console.log(`Content: ${textContent.slice(0, 100)}...`);

  // Get the domain from the URL
  const url = new URL(metadata.url);
  const domain = url.hostname;

  // Get the current domain counts from storage
  chrome.storage.local.get('domainCounts', (result) => {
    const domainCounts = result.domainCounts as DomainCounts || {};
    const count = domainCounts[domain] || 0;

    // Increment the count for this domain
    domainCounts[domain] = count + 1;

    // Save the updated domain counts to storage
    chrome.storage.local.set({ domainCounts });

    // Get the total message count
    const totalCount = Object.values(domainCounts).reduce((acc, val) => acc + val, 0);

    // Set the badge text to the total message count
    chrome.action.setBadgeText({ text: `${totalCount}` });
  });
});
