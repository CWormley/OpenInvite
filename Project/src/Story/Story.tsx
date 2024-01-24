import { StoryModel } from "./Model";
import { Link } from 'react-router-dom';
export const Story = (props: { story: StoryModel , storyId: string}) => (
  <div className="post">
    <Link to={{pathname:`/story/${props.storyId}`}} className="panel-title">{props.story.title}</Link>
    <div className="panel-name">by: {props.story.author}</div>
    <div className="panel-body">{props.story.body.substring(0,300)}...</div>
  </div>
);

