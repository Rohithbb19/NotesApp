import logo1 from "../../assets/logo1.png"
import SignOut from "../../assets/svg/signout";

function NavBar(props) {



    return (
        <div className="w-full flex justify-center bg-[#6c2492] text-[#f2f2f2] shadow-md shadow-[#3b3b3b] sticky top-0 ">
        <div className="flex justify-between items-center p-2 w-full max-w-[1500px] ">
            <div className="pl-2 flex items-center gap-2">
            <div className=" w-14 h-14 max-[370px]:h-10 max-[370px]:w-10 rounded-full bg-black flex justify-center items-center">
                <img className="h-10 max-[370px]:h-8" src={logo1}/>
            </div>
            <p className="ml-5">PurpleApe</p>
            </div>

            <div className="flex items-center gap-2">
            <div className=" w-14 h-14 max-[370px]:h-10 max-[370px]:w-10 rounded-full flex justify-center items-center border-[3px] border-black">
                {props.pic ?
                <img className="h-10 max-[370px]:h-8 rounded-full" src={props.pic}/>
            :
            <p className=" text-3xl max-[370px]:text-xl">{props.name[0].toUpperCase()}</p>    
            }
            </div>
            <p className="pl-5 pr-3">{props.name}</p>
            <SignOut onClick={props.logOut} fill="white" className="w-6 h-6 rotate-180 cursor-pointer"></SignOut>
            </div>
        </div>
        </div>
    )
}

export default NavBar;