import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        // setIsLoggedIn(user);
        setUserObj({
          uid: user.uid,
          displayName: user.displayName,
          updateProfile: (args) => user.updateProfile(args),
        });
      }else {
        // setIsLoggedIn(false);
        setUserObj(false);
      }
      setInit(true);
    })
  }, []); // 2번째 인자를 []로 지정해야 컴포넌트가 최초로 렌더링 되었을 때 1회만 동작한다. 
  
  // 프로필을 실시간으로 업데이트 해주기 위한 함수
  const refreshUser = () => {
    // setUserObj(authService.currentUser);
    const user = authService.currentUser;
    setUserObj({
      uid: user.uid,
      displayName: user.displayName,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  
  return (
    <>
      {init ? 
        (<AppRouter 
          refreshUser={refreshUser} 
          isLoggedIn = {Boolean(userObj)} 
          userObj={userObj} 
        />
        ) : ("initializing...")}
    </>
  );
}

export default App;
