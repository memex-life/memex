# Memex
Your second brain for web browsing. Picture possessing the ultimate ability of total recall.

## Overview

This project aims to create a browser extension that acts like a personal memex machine.
It will keep track of everything you browse online to build your own knowledge base.
Then it will use AI to retrieve that knowledge whenever you need it.

**What is a Memex?**
> Consider a future device for individual use, which is a sort of mechanized private file and library. It needs a name, and, to coin one at random, “memex” will do. A memex is a device in which an individual stores all his books, records, and communications, and which is mechanized so that it may be consulted with exceeding speed and flexibility. It is an enlarged intimate supplement to his memory.   
> --- “As We May Think”  Vannevar Bush (1945)


## Features
- Seamlessly captures content and metadata from your web browsing.
- Constructs your own personalized knowledge base on your local device
- Retrive knowledge with power of AI. 

## How it works 

When you browse the web, this extension will inject a script to capture the text content on the pages you visit. It will send that content to the backend service-worker for processing
The service-worker will break the content into pieces and store it in a database. 
The popup page acts as a chat interface to answer your questions using the information in the database.

## Getting Started


### Build & import Extension
Build extension files into `dist/` folder
```bash
npm install
npm run build # or npm run watch
```
[Load extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked)

### Start the Kownledge Base server
Currently the [LangchainJs](https://github.com/hwchase17/langchainjs) has not yet support browser runtime. The extension still needs a backend server as Knowledge Base implementaion. 

set environments:
```
export TOKENIZERS_PARALLELISM=false
export OPENAI_API_KEY=<your-api-key>
cd server
FLASK_APP=server flask run
```
### Start using

Once you have completed the above steps, you can start using the Memex browser extension to enhance your web browsing experience.
* As you browse the web, the extension will automatically capture and store the text content from the web pages you visit, along with their metadata, in your personalized knowledge base.
* When you need to retrieve information or recall something from your browsing history, simply open the chat interface by clicking on the Memex extension icon. Type your question or query into the chat interface and press Enter or click the Send button. The Memex extension will use AI to search your knowledge base and provide you with the most relevant information based on your query.

