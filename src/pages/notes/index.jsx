import { UserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar";
import SideBar from "../../components/sidebar";
import PopUp from "../../components/popUp";
import Add from "../../assets/svg/add";
import TaskCard from "../../components/taskCard";
import { db } from "../../config/firebase";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";

function Notes() {
  const category = ["All", "Work", "Studies", "Hobby", "Exercise"];

  const [task, setTask] = useState([]);
  const [toggle, setToggle] = useState(false);

  let [current, setCurrent] = useState(0);
  let [OpenPopUp, setOpenPopUp] = useState(false);
  const user = useContext(UserContext);
  // console.log(user);
  const navigate = useNavigate();

  let auth = getAuth();
  async function logOut() {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  const taskCollection = collection(db, `${auth?.currentUser?.uid}`);

  useEffect(() => {
    async function getTask() {
      try {
        const data = await getDocs(taskCollection);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTask(filteredData);
      } catch (error) {
        console.log(error);
      }
    }
    getTask();
  }, [OpenPopUp, user, toggle]);

  async function deleTask(id) {
    const taskDelete = doc(db, `${auth?.currentUser?.uid}`, id);
    await deleteDoc(taskDelete);
  }

  if (user) {
    return (
      <div className="h-full min-h-[100vh] relative bg-[#272727]">
        <NavBar pic={user?.photoURL} name={user?.displayName} logOut={logOut} />

        <div className="flex w-full justify-center mt-10">
          <div className="flex gap-5 w-full max-w-[1500px]">
            <SideBar
              current={current}
              setCurrent={setCurrent}
              category={category}
            />

            {OpenPopUp && (
              <PopUp
                userUID={user?.uid}
                category={category}
                setOpenPopUp={setOpenPopUp}
              ></PopUp>
            )}
            <div className=" text-[#f2f2f2] flex gap-5 flex-wrap w-[75%]">
              <div
                onClick={() => setOpenPopUp(true)}
                className="w-[16rem] h-[12rem] bg-white/15 rounded-xl flex justify-center items-center group"
              >
                <Add
                  fill="#f2f2f2"
                  className="w-14 h-14 group-hover:scale-110 duration-300"
                ></Add>
              </div>

              {current === 0
                ? task.map((element, index) => (
                    <TaskCard
                      key={index}
                      data={element}
                      deleTask={deleTask}
                      setToggle={setToggle}
                      toggle={toggle}
                    />
                  ))
                : task.map(
                    (element, index) =>
                      element.type === category[current] && (
                        <TaskCard
                          key={index}
                          data={element}
                          deleTask={deleTask}
                          setToggle={setToggle}
                          toggle={toggle}
                        />
                      )
                  )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-[#272727]">
        <div className="h-14 w-14  border-[5px] rounded-full border-t-[#6F2F91] border-[#5a5a5a] animate-spin"></div>
      </div>
    );
  }
}
export default Notes;
