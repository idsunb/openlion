
from fastapi import FastAPI
from langchain.chat_models import ChatAnthropic, ChatOpenAI

from dotenv import load_dotenv
from langserve import add_routes

load_dotenv()


app = FastAPI(
    title="LangChain Server",
    version="1.0",
    description="Spin up a simple api server using Langchain's Runnable interfaces",
)


@app.get("/")
async def root():
    return {"message": "Hello World"}

fake_items_db = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]


@app.get("/items/")
async def read_item(skip: int = 0, limit: int = 10):
    return fake_items_db[skip : skip + limit]


@app.get("/users/{user_id}")
async def read_user(user_id: str):
    return {"user_id": user_id}




@app.get("/users/me")
async def read_user_me():
    return {"user_id": "the current user"}





add_routes(
    app,
    ChatOpenAI(

    ),
    path="/openai",
)
# add_routes(
#     app,
#     ChatAnthropic(),
#     path="/anthropic",
# )

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("demo:app", host="localhost", port=8888,reload=True)