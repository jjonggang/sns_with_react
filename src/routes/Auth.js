import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 import {
   faTwitter,
   faGoogle,
   faGithub,
 } from "@fortawesome/free-brands-svg-icons";
import { authService, firebaseInstance } from "fbase";
import AuthForm from "components/AuthForm";

const Auth = () => {
    const onSocialClick = async (event) => {
      const{
          target : {name},
      } = event;
      let provider;
      if(name === "google"){
          provider = new firebaseInstance.auth.GoogleAuthProvider();
      }else if(name === "github"){
          provider = new firebaseInstance.auth.GithubAuthProvider();
      }
      const data = await authService.signInWithPopup(provider);
    };

    return (
        <div className="authContainer">
            {/* <FontAwesomeIcon 
                icon={faTwitter}
                color={"#cb7575"}
                size="3x"
                style={{marginBottom: 30}}
            /> */}
            <img id="login_icon" src="https://i.postimg.cc/yNyBxhKZ/003-1.png" />
            <AuthForm />
            <div className="authBtns">
                <button onClick = {onSocialClick} name = "google" className="authBtn">Continue with google <FontAwesomeIcon icon={faGoogle} /></button>
                <button onClick = {onSocialClick} name = "github" className="authBtn">Continue with Github<FontAwesomeIcon icon={faGithub} /></button>
            </div>
        </div>
    );
};
export default Auth;