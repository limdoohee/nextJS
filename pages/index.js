import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="this is description"></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// 정적 페이지 생성(ssg) : 프로젝트 빌드시, 정적 페이지가 생성됨
// pages 폴더 안에 있는 파일이여야 하고
// getStaticProps 함수를 export 해야 가능
// 비동기 가능
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://test:1234@cluster0.ox9ksqx.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("collection1");

  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    // 점진적 정적 생성 기능 사용
    // 이 페이지를 다시 생성할 때까지 대기하는 시간을 초단위로 표시한 것.
    // 3600 = 1h
    // 설정한 초마다 페이지가 생성&대체됨
    revalidate: 1,
  };
}

// 서버에서만 실행됨
// getStaticProps와 차이는 이 함수는 빌드 프로세스 중에는 실행되지 않음
// 요청이 들어올때만 실행됨
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;
