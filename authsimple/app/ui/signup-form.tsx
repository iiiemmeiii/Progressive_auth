'use client'

import { signup } from "@/app/actions/auth";
import { useActionState } from "react";
export default function SignupForm() {

  const [state, action, pending] = useActionState(signup, undefined)
  console.log("state?.errors")

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <div>
            <p className="text-2xl text-yellow-500 font-black">SIGNUP</p>
          </div>
          <form action={action} className="max-w-sm mx-auto">
            <div className="mb-5">
              <label className="block mb-2.5 text-sm font-medium text-heading">Your email</label>
              <input type="email" name="email" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="name@flowbite.com" />
              <div className="">
                {state?.errors?.properties?.email?.errors?.[0] &&
                  <span className=" mt-1 text-red-500">{state?.errors?.properties?.email?.errors}</span>}
              </div>
            </div>
            <div className="mb-5">
              <label className="block mb-2.5 text-sm font-medium text-heading">Your password</label>
              <input type="password" name="password" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="••••••••" />
              <ul>
                {state?.errors?.properties?.email?.errors?.[0] &&
                  state?.errors?.properties?.password?.errors.map((e, i) => {
                    return (
                      <li className=" mt-1 text-red-500" key={i}>{e}</li>
                    )
                  })}
              </ul>
            </div>
            <label className="flex items-center mb-5">
              <input name="remember" type="checkbox" value="" className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft" required />
              <p className="ms-2 text-sm font-medium text-heading select-none">I agree with the <a href="#" className="text-fg-brand hover:underline">terms and conditions</a>.</p>
            </label>
            <button disabled={pending} type="submit" className="text-white bg-yellow-500 box-border border border-transparent hover:bg-black focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
              Submit</button>
          </form>


        </div>
      </main>
    </div>
  );
}
