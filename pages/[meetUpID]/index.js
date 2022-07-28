import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetUpData.title}</title>
        <meta name="description" content={props.meetUpData.description}></meta>
      </Head>
      <MeetupDetail
        title={props.meetUpData.title}
        image={props.meetUpData.image}
        address={props.meetUpData.address}
        description={props.meetUpData.description}
      />
    </Fragment>
  );
}

// 어떤 페이지가 미리 SSG 되어야 하는지 알려줌
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://test:1234@cluster0.ox9ksqx.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("collection1");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    // false - 모든 지원되는 meetup value를 포함하라는 뜻
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetUpID: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetUpID;
  const client = await MongoClient.connect(
    "mongodb+srv://test:1234@cluster0.ox9ksqx.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("collection1");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  // fetch data for a single meetup
  return {
    props: {
      meetUpData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
        image: selectedMeetup.image,
      },
    },
  };
}

export default MeetupDetails;
