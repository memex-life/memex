const form = document.querySelector("form")!;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const apiKey = (document.querySelector("#api-key") as HTMLInputElement).value;
  chrome.storage.sync.set({ apiKey }, () => {
    console.log("API key saved");
  });
});

chrome.storage.sync.get("apiKey", (data) => {
  (document.querySelector("#apiKey") as HTMLInputElement).value = data.apiKey || "";
});
