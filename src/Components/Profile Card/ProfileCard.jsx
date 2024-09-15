import React, { useEffect } from "react";
import { useState } from "react";
import image from "../../assets/default.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


function ProfileCard() {
  const [data, setData] = useState([]);
  const [load, LoadState] = useState(false);
  let datageter = () => {
    let response={};
    let ApiCaller = async () => {
      LoadState(false);
      response = await axios.get("https://cse-chapter-28-server.vercel.app/api/2027");
      setData(response.data);
      console.log(response.data);
    };
    ApiCaller();
    console.log(data[0]);
    LoadState(true);
  };
  let [name,setName]=useState("");
  let [id,setId]=useState("");
  let [location,setLocation]=useState("");
  let [description,setDescription]=useState("");
  let [disable,setDisable]=useState("");
  useEffect(datageter, []);
  const [pop, popState] = useState("hidden");
  let popup = (item) => {
    if(item!={}){
    setName(item.name);
    setId(item.id.slice(4));
    setLocation(item.Location);
    setDescription(item.Description);
    }
    popState("visible");
  };
  let popdown=()=>{
    popState('hidden');
  }





  return (
    <div
      className="flex flex-wrap gap-3 justify-center max-w-[100vw]"
      
    >
      <div onClick={()=>popdown()}
              className={`absolute z-10 bg-white bg-opacity-[20%] onClickPopUp w-[60%] h-[70%] backdrop-blur-md border-4 border-opacity-30 rounded-xl border-[#E1E1E1] flex flex-row align-center ${pop} items-center`}
            >
              <div className="flex flex-col justify-center m-3  w-[40%] h-[95%]  my-8 ">
                <div className="flex justify-between flex-col items-center h-[80%] w-[100%]">
                  <div className=" h-[100%] ">
                    <div className="relative h-[75%]">
                      <img
                        className="h-[100%]  z-20 rounded-full border-[#002f26] border-8 "
                        src={image}
                      />
                      <div className="h-[80px] w-[80px] z-20 rounded-full bg-[#002f26] absolute  right-0 bottom-0 flex justify-center items-center">
                        <p className="text-white text-3xl font-bold">{id}</p>
                      </div>
                    </div>
                    <div className="my-4">
                      <p className="text-3xl text-center">{name}</p>
                      <p className="text-1xl text-center">{location}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[80%] w-[0.3%] bg-[#002f26]"></div>
              <div className="h-[95%] w-[59.7%] flex flex-col justify-center items-center">
                <div className=" h-[80%] w-[90%]">
                  <p className="text-3xl text-center font-bold">About Me</p>
                  <div className="flex justify-center items-center h-[85%]">
                    <div className=" border-[15px] border-transparent w-[100%] bg-white bg-opacity-30 rounded-md">
                      <p className="text-2xl">{description}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-around">
                    <FontAwesomeIcon className="size-7" icon={faInstagram} />
                    <FontAwesomeIcon className="size-7" icon={faGithub} />
                    <FontAwesomeIcon className="size-7" icon={faLinkedin} />
                    <FontAwesomeIcon className="size-7" icon={faEnvelope} />
                  </div>
                </div>
              </div>
            </div>
      {(load)?(
        data.map((item) => (
          <div className="m-4"  >
            
            <div onClick={()=>popup(item)} className="pcard  h-[400px] w-[275px] backdrop-blur-md backdrop-brightness-[85%] hover:backdrop-brightness-[60%] transition-backdrop-brightness duration-500 border-2 rounded-xl border-[#E1E1E1] border-opacity-30 flex justify-around items-center flex-col text-[#002020] hover:text-[#ffffff]">
              <div className="mt-3 rounded-full h-[195px] w-[195px]" >
                <img className="h-[195px] w-[195px] rounded-full" src={image} />
              </div>
              <div className="flex items-center flex-col">
                <p className=" text-3xl">{item.name}</p>
                <p className=" text-2xl">{item.id}</p>
              </div>
              <div className="flex w-[210px] justify-around">
                <FontAwesomeIcon className="size-7" icon={faInstagram} />
                <FontAwesomeIcon className="size-7" icon={faGithub} />
                <FontAwesomeIcon className="size-7" icon={faLinkedin} />
                <FontAwesomeIcon className="size-7" icon={faEnvelope} />
              </div>
            </div>
          </div>
        ))
      ): (
        <p className="w-[1000px] h-[50px]">loading....</p>
      ) }
    </div>
  );
}

export default ProfileCard;
