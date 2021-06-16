import { authService, dbService } from "fbase";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default ({ userObj }) => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    const getMyEweets = async() => {
        const eweets = await dbService
            .collection("eweets")
            .where("creatorId", "==", userObj.uid)
            .orderBy("createdAt")
            .get();
    };
    useEffect(() => {
        getMyEweets();
    }, []);

    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
    
};