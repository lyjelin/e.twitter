import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = () => {
    const [eweet, setEweet] = useState("");
    const [eweets, setEweets] = useState("");
    const getEweets = async() => {
        const dbEweets = await dbService.collection("eweets").get();
        dbEweets.forEach((document)=> {
            const eweetObject = {
                ...document.data(),
                id: document.id,
            };
            setEweets((prev) => [eweetObject, ...prev]);
        });
    };

    useEffect(() => {
        getEweets();
    }, [])

    const onSubmit = (event) => {
        event.preventDefault();
        dbService.collection("eweets").add({
            eweet, 
            createdAt: Date.now(),  
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
                         <h4>{eweet.eweet}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;