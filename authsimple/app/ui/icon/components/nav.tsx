import Link from "next/link"

export default function NavBar() {
    return (
          
<nav className="bg-gray-300 fixed w-full z-20 top-0 col-start-1  border-default">
  <div className="max-w-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        
        <span className="self-center text-xl text-black font-semibold whitespace-nowrap">
          AUTH REACT</span>
    </Link>
   
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
       
        <li>
          <Link href="/signup" className="block py-2 px-3 text-black rounded hover:bg-neutral-tertiary font-bold md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">SIGNUP</Link>
        </li>
        <li>
          <Link href="/login" className="block py-2 px-3 text-black  rounded hover:bg-neutral-tertiary font-bold md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">LOGIN</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  
    );
}