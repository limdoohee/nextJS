import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
import GoogleMapReact from "google-map-react";

const DUMMY_MEETUPS = [
  {
    id: "m11",
    title: "A First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Akasaka_Palace_6.jpg/1024px-Akasaka_Palace_6.jpg",
    address: "Some Adderess",
    description: "This is a first Meetup",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Akasaka_Palace_6.jpg/1024px-Akasaka_Palace_6.jpg",
    address: "Some Adderess",
    description: "This is a Second Meetup",
  },
];

const defaultProps = {
  center: { lat: 10.99835602, lng: 77.01502627 },
  zoom: 1,
};

function HomePage(props) {
  return (
    <>
      <MeetupList meetups={props.meetups} />
      {/* <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCnn6kL-CntlPrNH8zsyON6016j6sHKxZE" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        ></GoogleMapReact>
      </div> */}
    </>
  );
}

// 정적 페이지 생성(ssg) : 프로젝트 빌드시, 정적 페이지가 생성됨
// pages 폴더 안에 있는 파일이여야 하고
// getStaticProps 함수를 export 해야 가능
// 비동기 가능
// export async function getStaticProps() {
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//     // 점진적 정적 생성 기능 사용
//     // 이 페이지를 다시 생성할 때까지 대기하는 시간을 초단위로 표시한 것.
//     // 3600 = 1h
//     // 설정한 초마다 페이지가 생성&대체됨
//     revalidate : 10
//   };
// }

// 서버에서만 실행됨
// getStaticProps와 차이는 이 함수는 빌드 프로세스 중에는 실행되지 않음
// 요청이 들어올때만 실행됨
export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;

  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
}

export default HomePage;
