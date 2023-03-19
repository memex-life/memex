# the knowledge base class
# - put data into the knowledge base
# - query against the knowledge base

from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.docstore.document import Document
from langchain.docstore.document import Document
from langchain import OpenAI, VectorDBQA
# setup logger
import logging

# chunk size and overlap used for text splitting
CHUNK_SIZE = 800
CHUNK_OVERLAP = 0
# number of top resources to return
TOP_K = 5

CHROMA_PERSIST_DIRECTORY = "./.chroma_persist"


class KnowledgeBase:
    def __init__(self):
        self.db = self.init_vector_store()
        self.text_splitter = CharacterTextSplitter(chunk_size=CHUNK_SIZE, chunk_overlap=CHUNK_OVERLAP)
        self.qa = VectorDBQA.from_chain_type(
            llm=OpenAI(), 
            chain_type="stuff", 
            chain_type_kwargs={"verbose": True},
            return_source_documents=True,
            vectorstore=self.db,
            k=TOP_K,
            verbose=True)

    def init_vector_store(self):
        logging.info("Initializing vector store")
        embeddings = OpenAIEmbeddings()
        nothing_doc = Document(page_content="nothing")
        db = Chroma.from_documents([nothing_doc,nothing_doc,nothing_doc],persist_directory=CHROMA_PERSIST_DIRECTORY, embeddings=embeddings)
        return db

    def put_docs(self,documents):
        print("Putting Document: {}".format(documents))
        docs = self.text_splitter.split_documents(documents)
        for doc in docs:
            text,metadata = doc.page_content, doc.metadata
            self.db.add_texts(texts=[text],metadatas=[metadata])
    
    def answer(self,question):
        logging.info("Answering question: {}".format(question))
        result = self.qa(question)
        return result
        
if __name__ == "__main__":
    kb = KnowledgeBase()
    docs = [
        Document(page_content="Sun is red, fire is red. sky is blue",metadata={"url":"https://hello.com"}),
        Document(page_content="Over 8,500 residents have been urged to evacuate immediately after a 100-foot-wide breach emerged along California's Pajaro River around midnight Saturday morning as the state has faced a series of storm",metadata={"url":"https://www.msn.com/en-us/news/us/california-river-breaches-overnight-residents-urged-to-evacuate-immediately/ar-AA18vaVr"}),
        Document(page_content="Severe weather and heavy snow will move through the middle and eastern parts of the U.S. over the weekend and into next week as northern California is expected to see relentless rainfall that could last until Wednesday afternoon.",metadata={"url":"https://abcnews.go.com/US/west-slammed-rain-threatening-flooding-east-heavy-wet/story?id=97767283"}),
        Document(page_content="goodbye world",metadata={"url":"https://goodbyeworld.com"}),
    ]
    kb.put_docs(docs)
    print(kb.answer("what is the color of the sky?"))
    print(kb.answer("how many residents have been urged to evacuate immediately?"))
    print(kb.answer("where is the breach?"))