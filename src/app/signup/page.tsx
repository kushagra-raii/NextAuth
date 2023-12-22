"use client";

import React , {useEffect}from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignUpPage = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, checked, type } = event.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user)
      console.log(response.data);
      router.push("/login");
    } catch (error: any) {
      console.error(error.message);
    } finally{
      setLoading(false);
    }
    
  };
  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
        setButtonDisabled(false);
    } else {
        setButtonDisabled(true);
    }
}, [user]);

  return (
    <div className=" text-white flex flex-col justify-center items-center gap-4">
      <h1 className=" font-bold text-3xl">{loading ? "processing" : "Signup"}</h1>
      <div className="flex flex-col justify-center w-1/3 gap-2" >
        <label htmlFor="username">Username</label>
        <input
          className=" rounded-md p-2 text-black"
        name="username"

          type="text"
          id="username"
          placeholder="username"
          onChange={changeHandler}
          value={user.username}
        />
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

        <button  onClick={onSignup} className={`border rounded-lg mt-5 py-3 ${buttonDisabled ? 'text-gray-400' : 'text-white'}`}>
          Sign Up
        </button>

      </div>
      <Link className="underline" href="/login">Visit login page</Link>

    </div>
  );
};

export default SignUpPage;
