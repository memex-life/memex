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
Install the extention, setup your OpenAI token.

## Develop

install dependency
```
npm install 
```
Watch build
```
npm run watch
```
import the `dis/` into chrome 
