import SVG from "../Svg";

function SideBar({current,setCurrent,category}) {
    

    return(
        <div className="ml-[4rem] p-5 w-[25%] h-[25rem] max-w-[15rem] max-[800px]:w-[15%] max-[800px]:h-[20rem] max-[800px]:p-2 max-[800px]:ml-[10px] min-w-[2rem] text-[#f2f2f2] bg-white/15 backdrop-blur-lg  rounded-2xl sticky top-[7rem] flex flex-col items-center justify-center duration-300">
            <div className="flex flex-col gap-4 text-xl w-[85%] max-[800px]:w-full">
                {category.map((element,index)=>(
                    <div onClick={()=>setCurrent(index)} className={`${index === current && " bg-[#6c2492]"} flex items-center gap-2 p-2  rounded-lg  duration-300 cursor-pointer max-[800px]:justify-center`}  key={index}>
                        <SVG icon={element} fill="#ffffff" className="w-5 h-5"></SVG>
                        <div className="max-[800px]:hidden">{element}</div>       
                    </div>
                )
        )}
            </div>
        </div>
    )
}

export default SideBar;