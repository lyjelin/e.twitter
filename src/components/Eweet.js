import { dbService, storateService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Eweet = ({eweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newEweet, setNewEweet] = useState(eweetObj.text);
    const onDeleteClick = () => {
        const ok = window.confirm("Are you sure you want to delete this eweet?");
        if (ok) {
            dbService.doc(`eweets/${eweetObj.id}`).delete();
            storateService.refFromURL(eweetObj.attachmentUrl).delete();
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
    <div className="nweet">
        {editing ? (
            <>
            {isOwner && (
            <>
                <form onSubmit={onSubmit} className="container nweetEdit">
                    <input 
                        type="text" 
                        placeholder="Edit your eweet" 
                        value={newEweet} 
                        onChange={onChange}
                        required 
                        autoFocus
                        className="formInput"
                    />
                    <input type="submit" value="Update Eweet" className="formBtn" />
                </form>  
                <span onClick={toggleEditing} className="formBtn cancelBtn">
                    Cancel
                </span>
            </>
            )}
            </>
        ) : (
        <>
            <h4>{eweetObj.text}</h4>
            {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
            {isOwner && (
                <div class="nweet__actions">
                    <span onClick={onDeleteClick}>
                        <FontAwesomeIcon icon={faTrash} />
                    </span>
                    <span onClick={toggleEditing}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </span>
                </div>
            )}</>
        )};
    </div>
    );
};

export default Eweet;