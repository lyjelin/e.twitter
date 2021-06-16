import { dbService, storateService } from "fbase";
import React, { useEffect, useState } from "react";
import { v5 } from "uuid/v5";
import Eweet from "components/Eweet";
import EweetFactory from "components/EweetFactory";

const Home = ({ userObj }) => {
    const [eweets, setEweets] = useState("");

    useEffect(() => {
        
        dbService.collection("eweets").onSnapshot(snapshot => {
            const eweetArray = snapshot.docs.map(doc => ({
                id:doc.id, 
                ...doc.data
            }));
            setEweets(eweetArray);
        });
    }, [])

    return (
        <div className="container">
            <EweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                {eweets.map((eweet) => (
                    <Eweet  
                    key={eweet.id}
                    eweetObj={eweet}
                    isOwner={eweet.creatorId === userObj.uid}
                />
                ))}
            </div>
        </div>
    );
};

export default Home;