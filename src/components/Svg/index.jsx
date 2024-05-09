import All from "../../assets/svg/all"
import Exercise from "../../assets/svg/exercise"
import Work from "../../assets/svg/work"
import Hobby from "../../assets/svg/hobby"
import Studies from "../../assets/svg/studies"

function SVG(props) {

        switch (props.icon) {
            case "All":
                return <All {...props}/>
            case "Exercise":
                return <Exercise {...props}/>
            case "Work":
                return <Work {...props}/>
            case "Hobby":
                return <Hobby {...props}/>
            case "Studies":
                return <Studies {...props}/>
            default:
                break;
        }
}

export default SVG;