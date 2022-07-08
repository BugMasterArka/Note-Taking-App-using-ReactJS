
import React,{useState} from 'react'
import Noteitem from './Noteitem'

export default function Textuser() {

    const [notes, setNotes] = useState([]);

    const [text, setText] = useState('');

    const [edit, setEdit] = useState({
        stateNow: false,
        index: -1
    });

    const handleOnChange = (event)=> {
        setText(event.target.value);
        console.log(notes.length);
        console.log(notes);
    }

    const handleonSave = ()=>{
        if(edit.stateNow===false){
            console.log(notes.length);
            let nowDate = new Date().toDateString();
            let nowTime = new Date().toTimeString().split(' ')[0];
            let now = nowDate + ' at '+nowTime;
            let titlegiven = document.getElementById('myTitle').value;
            console.log(text);
            let continued = [{
                title: titlegiven.length!==0?titlegiven:now,
                content: text?text:"this is sample text"
            }];
            if(notes.length===0){
                setNotes(continued);
            }
            else{
                setNotes(continued.concat(notes));
            }
            console.log(notes);
            console.log(notes.length);
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
    

    return (
        <>
        <div className="container my-5">
            <h1>Enter you Text</h1>
            <div className="mb-3 my-3">
                <input className="form-control form-control-sm my-2" type="text" placeholder=" Enter title" id="myTitle"/>
                <textarea className="form-control" value={text} onChange={handleOnChange} id="myBox" rows="5" placeholder='Enter the content'></textarea>
            </div>
            <button type="button" className="btn btn-outline-dark" onClick={handleonSave}>Save</button>
            <button type="button" className="btn btn-dark mx-2" onClick={handleOnCopy}>Copy Text</button>
        </div>
        <div className="d-flex justify-content-center">
            <div className="row container text-center">
                {notes.map((element)=>{
                    return <div className="col-md-4 col-lg-3 my-2 d-flex justify-content-center" key={element.title}>
                    <Noteitem title={element.title} content={element.content} restore={restoreText} deletion={deleteNote} edit={editNote}/>
                    </div>
                })}
            </div>
        </div>
        </>
    )
}

