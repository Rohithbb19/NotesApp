import { useReducer } from "react";
import { auth,googleProvider } from "../../../config/firebase";
import { createUserWithEmailAndPassword,signInWithPopup, updateProfile } from "firebase/auth";
// import { setPersistence, browserLocalPersistence } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import GoogleButton from "../../../components/googleButton";

function SignUp() {
  const navigate = useNavigate();

  function reducer(state, action) {
    switch (action.type) {
      case "setName":
        return { ...state, username: action.payload };
      case "setEmail":
        return { ...state, email: action.payload };
      case "setPassword":
        return { ...state, password: action.payload };
      case "setNameError":
        return { ...state, usernameError: action.payload };
      case "setEmailError":
        return { ...state, emailError: action.payload };
      case "setPasswordError":
        return { ...state, passwordError: action.payload };
      default:
        return state;
    }
  }
  let initialValue = {
    username: "",
    email: "",
    password: "",
    usernameError: null,
    emailError: null,
    passwordError: null,
  };
  const [state, dispatch] = useReducer(reducer, initialValue);

  async function fbSignUp() {
    if (
      state.usernameError != null &&
      state.emailError != null &&
      state.passwordError != null
    ) {
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        state.email,
        state.password
      );
      await updateProfile(userCredential.user, {
        displayName: state.username,
      });
      // setPersistence(auth, browserLocalPersistence);
      navigate(`/Home/${auth?.currentUser?.uid}`);
    } catch (error) {
      console.log(error);
    }
  }

    // signIn with google
  async function signInWithGoogle() {
    try {
       await signInWithPopup(auth,googleProvider);
       navigate(`/Home/${auth?.currentUser?.uid}`);
    } catch (error) {
      console.log(error);
    }
  }

  function SignUpHandler() {
    dispatch({ type: "setNameError", payload: null });
    dispatch({ type: "setEmailError", payload: null });
    dispatch({ type: "setPasswordError", payload: null });
    // user name
    if (state.username === "" || state.username.trim() === "") {
      dispatch({ type: "setNameError", payload: "enter a Valid name" });
    }
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
      fbSignUp();
    }
  }

  return (
    <div className="h-[100vh] flex justify-center items-center bg-[#202020]">
      <div className="p-4 w-[25rem] rounded-xl bg-[#525252]/10 text-[#f0f0f0] flex flex-col justify-center gap-4">
        <p className=" text-4xl pb-10 text-[#6F2F91] font-semibold">SignUp</p>
        {/* User name */}
        <p className=" text-xl">User Name</p>
        <div className="w-full">
          <input
            value={state.username}
            onChange={(e) =>
              dispatch({ type: "setName", payload: e.target.value })
            }
            maxLength={25}
            className="w-full focus:outline-none bg-[#202020] text-[#6F2F91] px-2"
            type="text"
          />
          <div className=" overflow-hidden h-4">
            <p
              className={`${
                state.usernameError ? "translate-y-0" : " -translate-y-5"
              } " text-xs text-red-400 duration-300 overflow-hidden"`}
            >
              {state.usernameError}
            </p>
          </div>
        </div>
        {/* Email */}
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
            onClick={SignUpHandler}
            className="ml-2 px-6 py-2 rounded-full text-xl bg-[#6F2F91] hover:bg-[#763fbd] duration-300"
          >
            SignUp
          </button>
          <button
            onClick={()=>navigate("/login")}
          className="ml-2 px-6 py-2 rounded-full text-xl bg-[#6F2F91] hover:bg-[#763fbd] duration-300"
          >
            Already a user
          </button>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-[45%] h-[2px] bg-[#535353]"></div>
          <div className="mb-[2px]">or</div>
          <div className="w-[45%] h-[2px] bg-[#535353]"></div>
        </div>
        <div className="flex justify-center mb-2">
          <GoogleButton handler={signInWithGoogle} />
        </div>
        {/* google login */}
      </div>
    </div>
  );
}
export default SignUp;
