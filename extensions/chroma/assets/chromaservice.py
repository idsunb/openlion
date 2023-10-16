import subprocess
import sys

try:
    import chromadb
except ImportError:
    subprocess.check_call(["pip", "install", "chromadb"])
import chromadb
chroma_client = chromadb.Client()

collection = chroma_client.create_collection(name="my_collection")

collection.add(
    documents=["This is a document", "This is another document"],
    metadatas=[{"source": "my_source"}, {"source": "my_source"}],
    ids=["id1", "id2"]
)

results = collection.query(
    query_texts=["This is a query document"],
    n_results=2
)

print(results)
sys.stdout.flush()


# 接收终端输入,做出相应的动作,返回结果
for line in sys.stdin:
    line = line.strip()
    if line == "exit":
        break
    else:
        print(line+" is not a command")
        sys.stdout.flush()





