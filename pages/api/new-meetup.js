// 리액트 컴포넌트 입력하면 안됨
// API 라우트는 리액트 컴포넌트를 정의하고, 렌더리하거나 리턴하지 않음
// 서버에서만 실행됨
// this file URL is '/api/new-meetup'

import { MongoClient } from "mongodb";

async function handler(req, res) {
  //어떤 요청이 보내졌는지 확인
  if (req.method === "POST") {
    const data = req.body;
    const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://test:1234@cluster0.ox9ksqx.mongodb.net/meetup?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("collection1");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meepup Inserted!" });
  }
}

export default handler;
