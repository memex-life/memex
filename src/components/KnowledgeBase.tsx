// class KnowledgeBase
// This class provides 2 methods:
// 1. put Document to the knowledge base
// 2. answer a question based on the knowledge base

import { Document } from '../types';

class KnowledgeBase {
    constructor() { }
    putDocument(document: Document) {
        console.log('Document added to the knowledge base:', document);
    }
    answerQuestion(question: string) {
        console.log('Question answered:', question);
        return 'I do not know from the KnowledgeBase class';
    }
}

// extend KnowledgeBase with a remote server implementation
class RemoteKnowledgeBase extends KnowledgeBase {
    private serverUrl: string;

    constructor() {
        super();
        this.serverUrl = 'http://localhost:3000';
    }
    putDocument(document: Document) {
        // send document to the server using fetch
        // log the response to the console
        const url = this.serverUrl + '/index';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(document),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log('Response from the server:', response);
        });
    }
    answerQuestion(question: string) {
        return 'I do not know from the RemoteKnowledgeBase class';
        // send question to the server and return the answer

    }
}


const knowledgeBase = new RemoteKnowledgeBase();
export { knowledgeBase };