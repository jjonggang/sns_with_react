import { dbService, storageService } from "fbase"; 
import { useEffect, useState } from "react";
import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";

const Home = ({userObj}) => {
    
    const [tweets, setTweets] = useState([]);
    

    // const getTweets = async () => { // 데이터베이스에 있는 트위트 글 가져오기. 
    //     const dbTweets = await dbService.collection("tweets").get();  
    //     dbTweets.forEach((document) => //데이터를 가져와서 읽기 위해서는 forEach 함수를 사용해야 한다.
    //         {const tweetObject = { ...document.data(), id: document.id }; // 어떤 데이터를 수정하고 삭제할 지 구분하기 위해 document에서 제공하는 id를 이용한다. 
    //         setTweets((prev) => [tweetObject, ...prev]) //순회 이전의 tweets와 순회 중인 데이터를 전개 구문을 이용해서 합친다. 이전 상태가 넘어오는 것은 setState에서 관리한다. 
    //     }); 
    // };

    useEffect(() => {
        dbService
       .collection("tweets")
       .orderBy("createdAt", "desc")
       .onSnapshot((snapshot) => {
         const newArray = snapshot.docs.map((document) => ({
           id: document.id,
           ...document.data(),
         }));
         setTweets(newArray);
       });

        // getTweets();
    }, []); // useEffect안에서 async await가 필요한 함수 사용 시 외부에 함수를 정의하고 useEffect안에서 그 함수를 실행시켜야 한다. 

    
    return (
        <div className="container">
            <TweetFactory  userObj={userObj} />
            <div style={{marginTop: 30}}>
                {tweets.map((tweet) => (
                    <Tweet 
                        userObj = {userObj}
                        key = {tweet.id} 
                        tweetObj = {tweet}
                        isOwner = {tweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;