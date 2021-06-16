import React from "react";
import {v5} from "uuid";
import { storageService, dbService } from "fbase";

const EweetFactory = ({ userObj }) => {
    const [eweet, setEweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (event) => {
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
    const onClearAttachment = () => setAttachment(null);
    return (
        <div>
        <form onSubmit={onSubmit}>
            <input 
                value={eweet} 
                onChange={onChange} 
                type="text" 
                placeholder="What's on your mind?" 
                maxLength={120} />
            <input type="file" accept="image/*" onChange={onFileChange} />
            <input type="submit" value="e.twitter" />
            {attachment && (
                <div>
                    <img alt={attachment} src={attachment} width="50px" height="50px" />
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