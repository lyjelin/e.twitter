import { dbService, storateService } from "fbase";
import React, { useEffect, useState } from "react";
import Eweet from "./Eweet.js";
import { v5 as uuid } from "uuid/v5";

const Home = ({ userObj }) => {
    const [eweet, setEweet] = useState("");
    const [eweets, setEweets] = useState("");
    const [atttachment, serAttechment] = useState();

    useEffect(() => {
        getEweets();
        dbService.collection("eweets").onSnapshot(snapshot => {
            const eweetArray = snapshot.docs.map(doc => ({
                id:doc.id, 
                ...doc.data
            }));
            setEweets(eweetArray);
        });
    }, [])

    const onSubmit = (event) => {
        event.preventDefault();
        const fileRef = storateService.ref().child(`${userObj.uid}/${uuidv5()}`);
        await fileRef.putString(attachment, "data_url")
        /*await dbService.collection("eweets").add({
            eweet, 
            createdAt: Date.now(),  
            creatorId: userObj.uid,
        });
        setEweet("");*/
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
        setAttechment(result);
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
                        <img sre={atttachment} width="50px" height="50px" />
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

export default Home;