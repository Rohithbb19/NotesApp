import Delete from "../../assets/svg/delete";
import SVG from "../Svg";

function TaskCard(props){
    return(
        <div className="w-[16rem] h-[12rem] bg-white/15 p-2 rounded-xl">
                <div className="flex justify-between items-center">
                <p className="text-lg">{props.data.title}</p>
                <div className="flex gap-2">
                    <SVG icon={props.data.type} fill="#f2f2f2" className="w-5 h-5"/>    
                    <Delete onClick={()=>{
                        props.deleTask(props.data.id)
                        props.setToggle(!props.toggle)
                    }} fill="#f2f2f2" className="w-5 h-5"></Delete>
                </div>    
                </div>
                <div className="h-[2px] w-full mt-1 rounded-full bg-[#6F2F91]"></div>
                <div></div>
                <p className=" overflow-hidden">{props.data.description}</p>    
        </div>
    )
}

export default TaskCard;