import React from "react";
import { useEffect,useState ,useRef} from "react";
import logo from '../../assets/logo/logocse.svg'
import { NavLink} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
function header() {
    const {user,loginWithRedirect,isAuthenticated,logout}=useAuth0();

    console.log(user);
    let newAccount=async ()=>{
        let year="20"+((Number)(user.email.slice(2,4))+4);
        console.log(year);
            let id=user.email.slice(0,7);
            const check=await axios.get('https://cse-chapter-28-server.vercel.app/api/'+year+'/id?id='+id);
            console.log(check);
            const params = JSON.stringify({
                "name": user.name,
                "id": id,
            });
            if(check.data==[]){
                try{
                await axios.post('http://localhost:3000/api/'+year+'/add',params,{
                    "headers": {
                    "content-type": "application/json",
                    },
                });
                }
                catch(err){
                    console.error(err.message);
                }
            }

    }
    if(isAuthenticated){
        const email=user.email;
        if(email.slice(0,2)!='b1'){
            alert("Email Invailid");
            logout();
        }
        else{
            newAccount();
        }
    }
    let hamRef=useRef();
    const [hamburger,setHamburger]=useState('invisible');
    let EnableBar=()=>{
        if(hamburger=='invisible')
        setHamburger('visible');
        else
        setHamburger('invisible');
    }
    let DisableBar=()=>{
        console.log(hamburger)
        if(hamburger=='visible')
        setHamburger('invisible');
    }
  return (
    <div onClick={DisableBar}>
      <nav>
        <div className=" w-screen flex justify-between">
          <div>
            <img className=" ml-5 mt-2 w-28 h-20"  src={logo}/>
          </div>
          <div className='header flex'>
          <ul className={`flex ${hamburger} fixed top-0 right-0 sm:visible sm:static z-20 flex-col sm:flex-row text-[2.25rem] mt-6 mr-8 font-bold lg:space-x-8 h-20 max-w-[600px] max-h-20`}>
                            <li >
                                <NavLink to="/"
                                    className={({isActive}) =>
                                        `block pr-4 pl-3 duration-200 ${isActive?"textcolor underline":"lightcolor"}    hover:bg-transparent border-0  lg:p-0`
                                    }
                                >
                                    HOME
                                </NavLink>
                            </li>
                            <li>
                            <NavLink
                                to="/Gallery"
                                className={({isActive}) =>
                                    `block pr-4 pl-3 duration-200 ${isActive?"textcolor underline":"lightcolor"}   hover:bg-transparent border-0  lg:p-0`
                                }
                                >
                                    GALLERY
                                </NavLink>

                            </li>
                            <li>
                            <NavLink
                                to="/Batches"
                                className={({isActive}) =>
                                    `block pr-4 pl-3 duration-200 ${isActive?"textcolor underline":"lightcolor"}   hover:bg-transparent border-0  lg:p-0`
                                }
                                >
                                    BATCHES
                                </NavLink>

                            </li>
                            <li>
                                <NavLink
                                to="/About"
                                className={({isActive}) =>
                                    `block pr-4 pl-3 duration-200 ${isActive?"textcolor underline":"lightcolor"}   hover:bg-transparent border-0  lg:p-0`
                                }
                                >
                                    ABOUT
                                </NavLink>
                            </li>
                            
                            {isAuthenticated?<li>
                            <NavLink
                                to="/Profile"
                                className={({isActive}) =>
                                    `block pr-4 pl-3 duration-200 ${isActive?"textcolor underline":"lightcolor"}   hover:bg-transparent border-0  lg:p-0`
                                }
                                >
                                    PROFILE
                                </NavLink>

                            </li>:
                            <li>
                                <button onClick={(e)=>loginWithRedirect()}>LOGIN</button>
                            </li>}
                            
                        </ul>
                
          <FontAwesomeIcon icon={faBars} style={{color: "#004040",}} className="mt-[1.8rem] mx-4 h-10 sm:hidden" onClick={EnableBar}/>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default header;
