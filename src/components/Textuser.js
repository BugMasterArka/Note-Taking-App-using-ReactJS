
import HTMLReactParser from 'html-react-parser';
import React,{useState} from 'react'
import Noteitem from './Noteitem'
import $ from 'jquery';

export default function Textuser() {

    const [notes, setNotes] = useState([]);

    const [text, setText] = useState('');

    const [edit, setEdit] = useState({
        stateNow: false,
        index: -1
    });

    const checkURL = (string)=>{
        let index=-1;
        let strArray = string.split(' ');
        let matches=[];
        // let pattern = "/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g";
        // eslint-disable-next-line
        matches = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        // console.log(matches);
        if(matches!==null){
            for(let i=0;i<matches.length;i++){
                index = strArray.findIndex(element=>element===matches[i]);
                if(index!==-1){
                    // console.log("this is ",index);
                    let foundURL = string.split(' ')[index];
                    let finalURL = `<a target="_blank" class="card-link" href="${foundURL}">${foundURL}</a>`;
                    // console.log(finalURL);
                    strArray.splice(index,1);
                    strArray.splice(index,0,finalURL);
                    // console.log(strArray);
                }
                index=-1;
            }
        }
        return strArray.join(" ");
        // return string;
    }

    const handleOnChange = (event)=> {
        setText(event.target.value);
        // console.log(notes.length);
        // console.log(notes);
    }

    const handleonSave = ()=>{
        if(edit.stateNow===false){
            // console.log(notes.length);
            let nowDate = new Date().toDateString();
            let nowTime = new Date().toTimeString().split(' ')[0];
            let now = nowDate + ' at '+nowTime;
            let titlegiven = document.getElementById('myTitle').value;
            // console.log(text);
            let continued = [{
                title: titlegiven.length!==0?titlegiven:now,
                content: text?checkURL(text):"this is sample text"
            }];
            if(notes.length===0){
                setNotes(continued);
            }
            else{
                setNotes(continued.concat(notes));
            }
            // console.log(notes);
            // console.log(notes.length);
            setText('');
            document.getElementById('myTitle').value='';
        }
        else{
            notes[edit.index].title=document.getElementById('myTitle').value;
            notes[edit.index].content=text?text:"this is sample text";
            setEdit({stateNow: false,index: -1});
            setText('');
            document.getElementById('myTitle').value='';
        }
    }

    const handleOnCopy = ()=>{
        navigator.clipboard.writeText(text);
    } 

    const restoreText = (input)=> {
        setText(input);
    }

    const deleteNote = (key)=>{
        // let index = notes.map(element=>element.title).indexOf(key);
        let index = notes.findIndex(element=>element.title === key);
        // console.log(index);
        notes.splice(index,1);
        // console.log(notes);
        setNotes(notes);
    }

    const editNote = (key)=>{
        let index = notes.findIndex(element=>element.title === key);
        setEdit({stateNow: true,index: index});
        document.getElementById('myTitle').value=notes[index].title;
        setText(notes[index].content);
    }

    // where i am passing the value of the text area as value={text}
// change that value={text} to value={HTMLReactParser(text)}
const makeBold = ()=> {
    let stringToFind = giveSelectedText();
    console.log(stringToFind);
    if(stringToFind!==null){
        let givenString = text;
        console.log(givenString);
        let foundAt = -1;
        foundAt=givenString.indexOf(stringToFind);
        console.log(foundAt);
        let beBold=givenString.substring(foundAt,foundAt+stringToFind.length);
        console.log(beBold);
        console.log(givenString.substring(0,foundAt)+`<b>${beBold}</b>`+givenString.substring(foundAt+stringToFind.length));
        let done = $.parseHTML(givenString.substring(0,foundAt)+`<b>${beBold}</b>`+givenString.substring(foundAt+stringToFind.length)),nodeNames=[];
        setText(done.join(''));
        // givenString.substring(0,foundAt)+`<b>${beBold}</b>`+givenString.substring(foundAt+stringToFind.length)
    }
}
const giveSelectedText = ()=>{
    // var selectedText = '';
    // if (window.getSelection) {
    //     selectedText = window.getSelection().toString();
    // }
    // else if (document.getSelection) {
    //     selectedText = document.getSelection();
    // }
    // else if (document.selection) {
    //     selectedText = document.selection.createRange().text;
    // } 
    // else return;
    // return selectedText;
    var selectedtext = "";
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if (
        (activeElTagName === "textarea") || (((activeElTagName === "input") && (/^(?:text|search|password|tel|url)$/i.test(activeEl.type))) && (typeof activeEl.selectionStart == "number"))
    ) {
        selectedtext = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        selectedtext = window.getSelection().toString();
    }
    console.log(selectedtext);
    return selectedtext;
}
    

    return (
        <>
        <div className="container my-5">
            <h1>Enter you Text</h1>
            <div className="mb-3 my-3">
                <input className="form-control form-control-sm my-2" type="text" placeholder=" Enter title" id="myTitle"/>
                <input className="form-control" value={text} onChange={handleOnChange} id="myBox" placeholder='Enter the content' style={{height: '15vh'}}/>
            </div>
            <div className="container d-flex justify-content-between">
                <div className="container d-flex justify-content-start">
                <button type="button" className="btn btn-outline-dark" onClick={handleonSave}>Save</button>
                <button type="button" className="btn btn-dark mx-2" onClick={handleOnCopy}>Copy Text</button>
                </div>
                <button type="button" className="btn btn-info" onClick={makeBold}><i className="fa-solid fa-bold"></i></button>
            </div>
        </div>
        <div className="d-flex justify-content-center">
            <div className="row container text-center">
                {notes.map((element)=>{
                    return <div className="col-md-4 col-lg-3 my-2 d-flex justify-content-center" key={element.title}>
                    <Noteitem title={element.title} content={HTMLReactParser(element.content)} restore={restoreText} deletion={deleteNote} edit={editNote}/>
                    </div>
                })}
            </div>
        </div>
        </>
    )
}

