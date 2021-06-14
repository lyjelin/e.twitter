import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
    const [eweet, setEweet] = useState("");
    const [eweets, setEweets] = useState("");


    useEffect(() => {
        getEweets();
        dbService.collection("eweets").onSnapshot(snapshot => {
            const eweetArray = snapshot.docs.map(doc => ({
                id:doc.id, 
                ...doc.data
            }));
            console.log(eweetArray);
        });
    }, [])

    const onSubmit = (event) => {
        event.preventDefault();
        dbService.collection("eweets").add({
            eweet, 
            createdAt: Date.now(),  
            creatorId: userObj.uid,
        });
        setEweet("");
    };

    const onChange = (event) => {
        const { 
            target:{ value }, 
        } = event;
        setEweet(value);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={eweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="e.twitter" />
            </form>
            <div>
                {eweets.map((eweet) => (
                    <div key={eweet.id}>
                         <h4>{eweet.text}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;