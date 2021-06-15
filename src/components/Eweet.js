import React from "react";
import { dbService } from "fbase";

const Eweet = ({eweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newEweet, setNewEweet] = useState(eweetObj.text);
    const onDeleteClick = () => {
        const ok = window.confirm("Are you sure you want to delete this eweet?");
        if (ok) {
            dbService.doc(`eweets/${eweetObj.id}`).delete();
        }
    }
    
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(eweetObj, newEweet);
        await dbService.doc(`eweets/${eweetObj.id}`).update({
            text:newEweet,
        });
        setEditing(false);
    };
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewEweet(value);
    };
    return(
    <div>
        {editing ? (
            <>
            {isOwner && (
            <>
                <form onSubmit={onSubmit}>
                    <input 
                        type="text" 
                        placeholder="Edit your eweet" 
                        value={newEweet} 
                        onChange={onChange}
                        required />
                    <input type="submit" value="Update Eweet" />
                </form>  
                <button onClick={toggleEditing}>Cancel</button>
            </>
            )}
            </>
        ) : (
        <>
            <h4>{eweetObj.text}</h4>
            {eweetObj.attachmentUrl && <img src={eweetObj.attachmentUrl}} width="50px" height="50px" />
            {isOwnerr && (
                <> 
                    <button onClick={onDeleteClick}>Delete Eweet</button>
                    <button onClick={toggleEditing}>Edit Eweet</button>
                </>
            )}</>
        )};
    </div>
    );
};

export default Eweet;