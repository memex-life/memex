// background service worker

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { textContent, metadata } = message;
  console.log(textContent, metadata);
  // Store textContent and metadata in database
});
