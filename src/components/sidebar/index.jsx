import SVG from "../Svg";

function SideBar({current,setCurrent,category}) {
    

    return(
        <div className="ml-[4rem] p-5 w-[25%] max-w-[20rem] min-w-[5rem] text-[#f2f2f2] bg-white/15 backdrop-blur-lg h-[25rem] rounded-2xl sticky top-[7rem] flex flex-col items-center justify-center">
            <div className="flex flex-col gap-4 text-xl w-[85%]">
                {category.map((element,index)=>(
                    <div onClick={()=>setCurrent(index)} className={`${index === current && " bg-[#6c2492]"} flex items-center gap-2 p-2  rounded-lg  duration-300 cursor-pointer`}  key={index}>
                        <SVG icon={element} fill="#ffffff" className="w-5 h-5"></SVG>
                        <div >{element}</div>       
                    </div>
                )
        )}
            </div>
        </div>
    )
}

export default SideBar;