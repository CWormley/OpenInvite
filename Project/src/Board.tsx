import "./Crossover.css"
import { Story } from "./Story/Story";
import { Component } from "react";
// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { Database, getDatabase, onValue, push, ref } from "firebase/database";
import { StoryModel } from "./Story/Model";
import { Link } from 'react-router-dom';
import { Header } from "./Header";
//from story editor
interface StoryEditorProps {
  addStory: (story: StoryModel) => void;
  cancelStory: () => void;
}
interface StoryEditorState {
  newStoryBody: string;
}

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCuwnKXpBN2c8pTngFLZNexLq_qoWEcZ-k",
  authDomain: "messageboard-b6501.firebaseapp.com",
  databaseURL: "https://messageboard-b6501-default-rtdb.firebaseio.com",
  projectId: "messageboard-b6501",
  storageBucket: "messageboard-b6501.appspot.com",
  messagingSenderId: "762720879335",
  appId: "1:762720879335:web:826b8aa2fc0e9af6235842",
  measurementId: "G-35FNCN76JZ"
};
interface AppState{
  stories: Record <string,StoryModel>;
}
class App extends Component<{}, AppState,StoryEditorProps> {
  private app: FirebaseApp;
  private db: Database;

  constructor(props: {}) {
    super(props);

    // Initialize Firebase
    this.app = initializeApp(firebaseConfig);
    this.db = getDatabase(this.app);

    this.state = {
      stories: {},
    };
    //from story editor
    this.createStory = this.createStory.bind(this);
    this.addStory = this.addStory.bind(this);
  }

  componentWillMount() {
    onValue(ref(this.db, "/stories"), (snapshot) => {
      if (snapshot.val() === null) return;
      const storyMap = snapshot.val() as Record<string, StoryModel>;
      this.setState({
        ...this.state,
        stories:storyMap,
      });
    });
  }

  addStory(story: StoryModel) {
    push(ref(this.db, "/stories"), story);
  }
//simplified show and hide
showPage(){
  const page = document.getElementById("story-editor")as HTMLDivElement;
  page.style.display = "block";
}
exit(){
  const page = document.getElementById("story-editor")as HTMLElement;
  page.style.display = "none";
}

createStory() {
  if(!this.full()){
    const now = new Date();
    const input =  document.getElementById("story") as HTMLInputElement;
    const name =  document.getElementById("name") as HTMLInputElement;
    const subject =  document.getElementById("subject") as HTMLInputElement;
    this.addStory({ author: name.value,title: subject.value, createTime: now.toISOString(), body: input.value });
    const element = document.getElementById("story-editor")as HTMLDivElement;
    element.style.display = "none";
    this.exit();
  }else{
    (document.getElementById("story-editor") as HTMLDivElement).addEventListener('click',() => {
      (document.getElementById("error") as HTMLParagraphElement).innerHTML='';
    });
  }
 
}

//check if inputs are filled

full(){
  const input =  document.getElementById("story") as HTMLInputElement;
  const name =  document.getElementById("name") as HTMLInputElement;
  const title = document.getElementById("subject") as HTMLInputElement;
  const defaultInput = input.defaultValue;
  const defaultName= name.defaultValue;
  const defaultTitle = title.defaultValue;
  const paragraph = document.getElementById("error") as HTMLParagraphElement
  var check = false;
  if(name.value == defaultName ){ 
    paragraph.append("Please enter your name");
    paragraph.appendChild(document.createElement("br"));
    check = true;}
  if(title.value == defaultTitle ){
    paragraph.append("Please enter the title");
    paragraph.appendChild(document.createElement("br"));
    check = true;}
  if(input.value == defaultInput ){ 
    paragraph.append("Please enter your story");
    paragraph.appendChild(document.createElement("br"));
    check = true;} 
  return check;
}
//forcus and blur
inputFocus (name:string):void{
  var input = document.getElementById(name) as HTMLInputElement;
  if(this.check(input.value)){
    var text =  input.value;
    input.value = "";
    input.style.color="black"
    input.addEventListener('blur',() => {
      this.inputBlur(input, text);
    });
}
}
check(val:string):boolean{
  if(val == "Title..." || val == "Your story..." || val == "Your name..."){
      return true;
  }
  return false;
}
inputBlur(input: HTMLInputElement | null, txt: string): void {
if (input && input.value === '') {
    input.style.color = 'gray';
    input.value = txt;
}
}

  render() {
    return (

      <div className="Board">
         <Header></Header>
        <div id="title">
            <h2>
                Memory Board
                <br/>
                <button id="add" onClick={this.showPage}>Add Story</button>
            </h2>

            <div id="story-editor">
              <p  onClick={this.exit} id="exit">X</p>
              <h3>Add Your Story</h3> 
              <p id ="error"></p>
              <input onClick={(event) => this.inputFocus("name")} type="text" id="name" defaultValue="Your name..."></input>
              <input onClick={(event) => this.inputFocus("subject")} type="text" id="subject" defaultValue="Title..."></input>
              <textarea onClick={(event) => this.inputFocus("story")} id="story" defaultValue="Your story..."></textarea>
              <br></br>
              <button  onClick={this.createStory} type="button" id="enter">Submit</button>
            </div>
        </div> 

        <div id="board">
          {Object.entries(this.state.stories).map((entry, idx) => (
          <Story key={idx} story={entry[1]} storyId ={entry[0]}/>
          ))}
        </div>

    </div>
    
    );
  }
}

export default App;
