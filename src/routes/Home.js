import React, { useState } from "react";

const Home = () => {
    const [eweet, setEweet] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
    };

    const onChange = (event) => {
        const { target:{value}, 
    } = event;
    setEweet(value);
    }
    return (
        <div>
            <form>
                <input value={eweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="e.twitter" />
            </form>
        </div>
    );
};

export default Home;