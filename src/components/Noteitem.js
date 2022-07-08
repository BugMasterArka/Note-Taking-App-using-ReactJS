import React,{useState} from 'react'

export default function Noteitem(props) {

    const [deleted, setDeleted] = useState(false);

    return (
        <div>
            {!deleted && <div className="card" style={{width: '17rem'}}>
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <hr/>
                    {/* <h6 className="card-subtitle mb-2 text-muted"></h6> */}
                    <p className="card-text">{props.content}</p>
                    {/* <a href="#" className="card-link">Card link</a> */}
                    {/* <a href="#" className="card-link">Another link</a> */}
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-dark" onClick={()=>{props.restore(props.content)}}>Click to Restore</button>
                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn btn-warning" onClick={()=>{props.edit(props.title)}}><i className="fa-solid fa-pen-clip"></i></button>
                            <button type="button" className="btn btn-danger mx-1" onClick={()=>{setDeleted(true);props.deletion(props.title);}}><i className="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}
