# A simple flask server to serve the memex web app

from flask import Flask, render_template, request, redirect, url_for, jsonify
from knowledgeBase import KnowledgeBase
import logging
logging.basicConfig(level=logging.WARNING)

from langchain.docstore.document import Document

# receive post request from the web app
app = Flask(__name__)
kb = KnowledgeBase()

@app.route('/index', methods=['POST'])
def index():
    print('received request')
    # extract the data from the request json
    message = request.get_json()
    doc = Document(page_content=message['textContent'],metadata=message['metadata'])
    # put the data into the knowledge base
    kb.put_docs([doc])
    return jsonify({'status': 'success'})


# answer a question with /answer?question=...
@app.route('/answer', methods=['GET', 'POST'])
def answer():
    if request.method == 'POST':
        question = request.get_json()['question']
    else:
        question = request.args.get('question')
    if question is None:
        return jsonify({'error': 'no question provided'})
    answer = kb.answer(question)
    references = [dict(page_content=doc.metadata, metadata=doc.metadata) for doc in answer['source_documents']]
    result = {
        "query": answer['query'],
        "answer": answer['result'],
        "references": references
    }
    # return the answer
    return jsonify(result)

#  response CORS headers on all options requests
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response


