import { Link } from "react-router-dom";
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 import { faTwitter } from "@fortawesome/free-brands-svg-icons";
 import { faUser } from "@fortawesome/free-solid-svg-icons";

 const Navigation = ({ userObj }) => {
   return (
     <nav>
       <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
         <li>
           <Link to="/" style={{ marginRight: 10 }}>
           <img id="main_icon" src="https://i.postimg.cc/yNyBxhKZ/003-1.png" />
             {/* <FontAwesomeIcon icon={faTwitter} color={"#ef9e9f"} size="2x" /> */}
           </Link>
         </li>
         <li>
           <Link
             to="/profile"
             style={{
               marginLeft: 10,
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
               fontSize: 12,
             }}
           >
             <FontAwesomeIcon icon={faUser} color={"#ef9e9f"} size="2x" />
             <span id="profile_font_color" style={{ marginTop: 10 }}>
               {userObj.displayName
                 ? `${userObj.displayName}의 Profile`
                 : "Profile"}
             </span>
           </Link>
         </li>
       </ul>
     </nav>
  );
};
export default Navigation;