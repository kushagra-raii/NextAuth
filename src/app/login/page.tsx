"use client";

import React, {useEffect} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { log } from "console";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
      email: "",
      password: "",
     
  })
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [login,setLogin] = React.useState(false);


  const onLogin = async () => {
      try {
          setLoading(true);
          const response = await axios.post("/api/users/login", user);
          setLogin(true);

          console.log("Login success", response.data);
          // toast.success("Login success");
          router.push("/profile");
      } catch (error:any) {
          console.log("Login failed", error.message);


          // toast.error(error.message);
      } finally{
        
      setLoading(false);
      }
  }

  useEffect(() => {
      if(user.email.length > 0 && user.password.length > 0) {
          setButtonDisabled(false);
      } else{
          setButtonDisabled(true);
      }
  }, [user]);


  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, checked, type } = event.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

 

  return (
    <div className=" text-white flex flex-col justify-center items-center gap-4">
      <h1 className=" font-bold text-3xl">{loading ? "Processing" : "Login"}</h1>
      <p className=" text-green-500">{login ? "Logged In" : "" }</p>
      <div className="flex flex-col justify-center w-1/3 gap-2" >
        
        <label htmlFor="email">Email</label>
        <input
          className=" rounded-md p-2 text-black"
          name="email"
          type="email"
          id="email"
          placeholder="email"
          onChange={changeHandler}
          value={user.email}
        />
        <label htmlFor="password">Password</label>
        <input
          className=" rounded-md p-2 text-black"
          name="password"
          type="password"
          id="password"
          placeholder="password"
          onChange={changeHandler}
          value={user.password}
        />

        <button onClick={onLogin} className="border rounded-lg mt-5 py-3">
          Login
        </button>
      </div>
      <Link className=" underline" href="/signup">Visit Signup page</Link>

    </div>
  );
};

export default LoginPage;
