import google from "../../assets/google.png"
function GoogleButton(props) {
    return(
        <button onClick={props.handler} className="rounded p-1 flex items-center gap-2 bg-white">
            <img className="h-10" src={google} alt="google"/>
            <p className=" text-blue-400 font-semibold pr-2">Continue with google</p>
        </button>
    )
}

export default GoogleButton;