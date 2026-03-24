'use client'
import { useActionState, useState } from "react";
import { EyeClosedIcon, EyeIcon } from "./icon/utils";
import { login } from "../actions/auth";

import Link from "next/link";
export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined)

  const [isVis, setIsVis] = useState(false)
  function handleChangeVisible() {
    setIsVis(visible => !visible)
  }
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <div>
            <p className="text-2xl text-blue-800 font-black">LOGIN</p>
          </div>
          <form action={action} className="max-w-sm mx-auto">
            <div className="mb-5">
              <label className="block mb-2.5 text-sm font-medium text-heading">Your email</label>
              <input type="email" name="email" suppressHydrationWarning className="bg-neutral-secondary-medium border 
              border-default-medium text-heading text-sm rounded-base focus:ring-brand 
              focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="name@mail.com"  />
              <div className="">
                {state?.errors?.properties?.email?.errors?.[0] &&
                  <span className=" mt-1 text-red-500">{state?.errors?.properties?.email?.errors[0]}</span>}
              </div>
            </div>
            <div className="mb-5">
              <label className="block mb-2.5 text-sm font-medium text-heading">Your password</label>
              <input type={!isVis ? "password" : "text"} name="password"
                className="bg-neutral-secondary-medium border 
                border-default-medium text-heading text-sm rounded-base focus:ring-brand 
                focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="" suppressHydrationWarning/>
              <span onClick={handleChangeVisible} className="">
                {!isVis ? <EyeClosedIcon /> : <EyeIcon className="text-blue-800" />}
              </span>
              <div className="">
                {state?.errors?.properties?.password?.errors?.[0] &&
                  <span className=" mt-1 text-red-500">{state?.errors?.properties?.password?.errors[0]}</span>}
              </div>
            </div>

            
            <button type="submit" disabled={pending} className="text-white bg-blue-800 box-border border border-transparent hover:bg-black focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Submit</button>
          </form>
          <span className="text-gray-500" >
            Do not have an account ?
            <Link className="text-yellow-500 font-black " href="/signup"> SIGNUP</Link>
          </span>

        </div>
      </main>
    </div>
  );
}
