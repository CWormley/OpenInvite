import { StoryModel } from "./Story/Model";
import { initializeApp } from "@firebase/app";
import { firebaseConfig } from "./Board";
import { Header } from "./Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { get, getDatabase, ref } from "firebase/database";
import "./Crossover.css"

export default function Full() {
  const [story, setStory] = useState<StoryModel>();

  let { storyId } = useParams();

  useEffect(() => {
    (async function () {
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const db = getDatabase(app);
      const dbRef = ref(db, `/stories/${storyId}`);
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        setStory(snapshot.val());
      }
    })();
  }, [storyId]);

  if (!story) {
    return <div>Loading...</div>;
  }
  return (
    <div className="Full">
      <Header></Header>
      <div id="heading">
        <h2>
          Memory
          <br/>
          <a id="back" href="/board">
            back
          </a>
        </h2>
        <h3>
          {story.title} <br></br>
          <div id="sign">
          by: {story.author}
          </div>
        </h3>
      </div>
      <div id="txt">
        <p>{story.body}</p>
      </div>
    </div>
  );
}
