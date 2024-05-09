import { useReducer } from "react";
import { signInWithEmailAndPassword ,signInWithPopup} from "firebase/auth";
import { auth ,googleProvider} from "../../../config/firebase";
import { useNavigate } from "react-router-dom";
import GoogleButton from "../../../components/googleButton";

function LogIn() {

  const navigate = useNavigate();

  function reducer(state, action) {
    switch (action.type) {
      case "setEmail":
        return { ...state, email: action.payload };
      case "setPassword":
        return { ...state, password: action.payload };
      case "setEmailError":
        return { ...state, emailError: action.payload };
      case "setPasswordError":
        return { ...state, passwordError: action.payload };
      default:
        return state;
    }
  }
  let initialValue = {
      // email: "rio@gmail.com",
    email: "",
    // password: "Rio@9941745151",
    password: "",
    emailError: null,
    passwordError: null,
  };
  const [state, dispatch] = useReducer(reducer, initialValue);

  // // login with email password
  async function fbLogIn() {
    if (state.emailError != null && state.passwordError != null) {
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, state.email, state.password);
      navigate(`/home/${auth?.currentUser?.uid}`);
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        dispatch({
          type: "setPasswordError",
          payload: "Invalid Email or password",
        });
      }
    }
  }

  // login with google
  async function logInWithGoogle() {
    try {
       await signInWithPopup(auth,googleProvider);
       navigate(`/Home/${auth?.currentUser?.uid}`);
    } catch (error) {
      console.log(error);
    }
  }

  function handleLogin() {
    dispatch({ type: "setEmailError", payload: null });
    dispatch({ type: "setPasswordError", payload: null });
    // email
    if (
      state.email === "" ||
      state.email.trim() === "" ||
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(state.email)
    ) {
      dispatch({ type: "setEmailError", payload: "enter a Valid email" });
    }
    // password
    if (
      state.password === "" ||
      state.password.trim() === "" ||
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        state.password
      )
    ) {
      dispatch({ type: "setPasswordError", payload: "enter a Valid password" });
    } else {
      fbLogIn();
    }
  }

  return (
    <div className="h-[100vh] flex justify-center items-center bg-[#202020]">
      <div className="p-4 w-[25rem] rounded-xl bg-[#525252]/10 text-[#f0f0f0] flex flex-col justify-center gap-5">
        <p className=" text-4xl pb-10 text-[#6F2F91] font-semibold">Login</p>
        {/* email */}
        <p className=" text-xl">Email</p>
        <div className="w-full">
          <input
            value={state.email}
            onChange={(e) =>
              dispatch({ type: "setEmail", payload: e.target.value })
            }
            className="w-full focus:outline-none bg-[#202020] text-[#6F2F91] px-2 "
            type="email"
          />
          <div className=" overflow-hidden h-4">
            <p
              className={`${
                state.emailError ? "translate-y-0" : " -translate-y-5"
              } " text-xs text-red-400 duration-300 overflow-hidden"`}
            >
              {state.emailError}
            </p>
          </div>
        </div>
        {/* Password */}
        <p>Password</p>
        <div className="w-full">
          <input
            value={state.password}
            onChange={(e) =>
              dispatch({ type: "setPassword", payload: e.target.value })
            }
            className="w-full focus:outline-none bg-[#202020] text-[#6F2F91] px-2 "
            type="password"
          />
          <div className=" overflow-hidden h-4">
            <p
              className={`${
                state.passwordError ? "translate-y-0" : " -translate-y-5"
              } " text-xs text-red-400 duration-300 overflow-hidden"`}
            >
              {state.passwordError}
            </p>
          </div>
        </div>
        <div className="pt-5 flex justify-between">
          <button
            onClick={handleLogin}
            className="ml-2 px-6 py-2 rounded-full text-xl bg-[#6F2F91] hover:bg-[#763fbd] duration-300"
          >
            Login
          </button>
          <button
            onClick={()=>navigate("/")}
          className="ml-2 px-6 py-2 rounded-full text-xl bg-[#6F2F91] hover:bg-[#763fbd] duration-300"
          >
            New User
          </button>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-[45%] h-[2px] bg-[#535353]"></div>
          <div className="mb-[2px]">or</div>
          <div className="w-[45%] h-[2px] bg-[#535353]"></div>
        </div>
        <div className="flex justify-center mb-2">
          <GoogleButton handler={logInWithGoogle} />
        </div>
      </div>
    </div>
  );
}
export default LogIn;
