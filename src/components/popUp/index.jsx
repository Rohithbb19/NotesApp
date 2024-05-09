import { useReducer, useState } from "react";
import Arrow from "../../assets/svg/arrow";
import SVG from "../Svg";
import Add from "../../assets/svg/add";
import {db} from "../../config/firebase"
import {collection,addDoc} from "firebase/firestore"

function PopUp(props) {
  function reducer(state, action) {
    switch (action.type) {
      case "setTitle":
        return { ...state, title: action.payload };
      case "setDescription":
        return { ...state, description: action.payload };
      case "setType":
        return { ...state, type: action.payload };

      default:
        break;
    }
  }

  let initialValue = {
    title: "",
    description: "",
    type: "Work",
  };

  let category = props.category.slice(1);
  let [drop, setDrop] = useState(false);
  let [state, dispatch] = useReducer(reducer, initialValue);

  const taskCollection = collection(db,`${props.userUID}`)

  async function Submit(){
    try {
      await addDoc(taskCollection,state)
      props.setOpenPopUp(false)
    } catch (error) {
      console.log(error);
    }
  }

  function handleSubmit(){
    if(state.title !== "" && state.description !== ""){
      Submit()
    }
  }




  return (
    <div className="w-[100vw] h-[100vh] bg-black/50 absolute top-0 right-0 z-10 flex justify-center items-center">
      <div className=" bg-[#525252]/40 backdrop-blur-xl w-[25rem] px-4 py-5 rounded-2xl z-20 text-[#6F2F91]">
        <div className="flex justify-end">
            <Add 
            onClick={()=>props.setOpenPopUp(false)}
            fill="#6F2F91" className=" rotate-[45deg]"/>
        </div>
        <p className="text-2xl font-semibold">Add new Task</p>
        <p className="text-lg font-semibold mt-4">Title</p>
        <input
          value={state.title}
          onChange={(e) =>
            dispatch({ type: "setTitle", payload: e.target.value })
          }
          maxLength={20}
          className="w-full focus:outline-none bg-[#202020] text-[#6F2F91] px-2"
        ></input>
        <p className="text-lg font-semibold mt-2">Description</p>
        <textarea
          value={state.description}
          onChange={(e) =>
            dispatch({ type: "setDescription", payload: e.target.value })
          }
          maxLength="100"
          className="w-full h-[10rem] focus:outline-none bg-[#202020] text-[#6F2F91] px-2 resize-none"
        ></textarea>
        <div className="flex relative">
          <div
          onClick={() => setDrop(!drop)}
            className={`${
              drop ? "rounded-t-lg" : "rounded-lg"
            } flex items-center justify-between bg-[#202020] p-2 w-[9rem] duration-200 mt-3 cursor-pointer`}
          >
            <div className="flex gap-1 items-center">
              <SVG icon={state.type} fill="#6F2F91" className="w-5 h-5 mr-3" />
              <div className=" font-bold">{state.type}</div>
            </div>
            <Arrow
              
              fill="#6F2F91"
              className={`${drop && " rotate-180"}  duration-300  w-6 h-6 mt-1`}
            />
            <div
              className={` ${
                drop ? "h-[9rem] " : "h-0"
              } duration-300  absolute bg-[#202020]  w-[9rem] top-full left-0 overflow-hidden rounded-b-lg`}
            >
              {category.map((element, index) => (
                <div
                  key={index}
                  onClick={() => {
                    dispatch({ type: "setType", payload: element });
                    setDrop(!drop);
                  }}
                  className="flex mb-2 px-2 py-0.5"
                >
                  <SVG icon={element} fill="#6F2F91" className="w-5 h-5 mr-4" />
                  <p className="font-bold">{element}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button 
          onClick={handleSubmit}
          className="ml-2 mt-4 px-6 py-2 rounded-full text-[#f2f2f2] text-lg bg-[#6F2F91] hover:bg-[#763fbd] duration-300">
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}
export default PopUp;
