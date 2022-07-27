import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails() {
  return (
    <MeetupDetail
      title="A First Meetup"
      address="Some Adderess"
      description="This is a first Meetup"
      image="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Akasaka_Palace_6.jpg/1024px-Akasaka_Palace_6.jpg"
    />
  );
}

// 어떤 페이지가 미리 SSG 되어야 하는지 알려줌
export async function getStaticPaths() {
  return {
    // false - 모든 지원되는 meetup value를 포함하라는 뜻
    fallback: false,
    paths: [
      {
        params: {
          meetUpID: "m11",
        },
      },
      {
        params: {
          meetUpID: "m2",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetUpID;
  console.log(meetupId);
  // fetch data for a single meetup
  return {
    props: {
      meetUpData: {
        id: "m1",
        title: "A First Meetup",
        address: "Some Adderess",
        description: "This is a first Meetup",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Akasaka_Palace_6.jpg/1024px-Akasaka_Palace_6.jpg",
      },
    },
  };
}

export default MeetupDetails;
