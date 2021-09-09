import { authService, dbService } from "fbase";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";

const Profile = ({ userObj, refreshUser }) => {

    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    };

    // // 로그인한 사용자의 트윗만 골라 화면에 출력하도록 코드 구현
    // const getMyTweets = async () => {
    //     const tweets = await dbService
    //         .collection("tweets")
    //         .where("creatorId", "==", userObj.uid) // 파이어베이스가 제공하는 쿼리함수 where
    //         // 필드, 조건, 찾으려는 값 순서로 인자를 전달해서 사용하면 되는 함수이다. 
    //         // creatorId 필드에서 userObj.uid와 같은 값을 찾기 위한 표현
    //         .orderBy("createdAt", "asc")
    //         // 정렬 기준 필드, 정렬방법을 무낮열로 전달받는다. 
    //         // asc는 오름차순이다. 
    //         .get();

    //     console.log(tweets.docs.map((doc)=> doc.data()));
    // };

    // useEffect(()=>{
    //     getMyTweets();
    // }, []);
    // // profile 컴포넌트가 렌더링된 이후 실행될 함수

    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({ displayName: newDisplayName })
            refreshUser(); // user 상태를 실시간으로 업데이트.
        }
    };

    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm" >
                <input 
                    onChange={onChange}
                    type="text" 
                    placeholder="Display name" 
                    value={newDisplayName}
                    autoFocus
                    className="formInput"
                />
                <input 
                    type="submit" 
                    value="Update Profile"
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }}
                />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    );

};

export default Profile;