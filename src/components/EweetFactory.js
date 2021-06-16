import React from "react";
import {v5} from "uuid";
import { storageService, dbService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const EweetFactory = ({ userObj }) => {
    const [eweet, setEweet] = useState("");
    const [attachment, setAttachment] = useState("");
    const onSubmit = async (event) => {
        if (nweet === "") {
            return;
        }
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== ""){
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${v5()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const eweetObj = {
            text: eweet, 
            createdAt: Date.now(),  
            creatorId: userObj.uid,
            attachmentUrl,
        };
        await dbService.collection("eweets").add(eweetObj);
        setEweet("");
        setAttachment("");
    };

    const onChange = (event) => {
        const { 
            target:{ value }, 
        } = event;
        setEweet(value);
    };

    const onFileChange = (event) => {
        const {target:{files},
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
        const {currentTarget: { result },
        } = finishedEvent;
        setAttachment(result);
    };
    reader.readAsDataURL(theFile);
    }
    const onClearAttachment = () => setAttachment("");
    return (
        <div>
        <form onSubmit={onSubmit} className="factoryForm">
       <div className="factoryInput__container">
         <input
           className="factoryInput__input"
           value={nweet}
           onChange={onChange}
           type="text"
           placeholder="What's on your mind?"
           maxLength={120}
         />
         <input type="submit" value="&rarr;" className="factoryInput__arrow" />
       </div>
       <label for="attach-file" className="factoryInput__label">
         <span>Add photos</span>
         <FontAwesomeIcon icon={faPlus} />
       </label>
            <input 
                id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{
                  opacity: 0,
                }} 
            />
            {attachment && (
                <div className="factoryForm__attachment">
                <img
                  src={attachment}
                  style={{
                    backgroundImage: attachment,
                  }}
                />
                <div className="factoryForm__clear" onClick={onClearAttachment}>
                  <span>Remove</span>
                  <FontAwesomeIcon icon={faTimes} />
                </div>eight="50px" />
                    <button onClick={onClearAttachment}>Clear</button>
                 </div>
            )}
        </form>
            <div>
                {eweets.map((eweet) => (
                    <Eweet 
                        key={eweet.id} 
                        eweetObj={eweet.eweetObj} 
                        isOwner={eweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
};

export default EweetFactory;