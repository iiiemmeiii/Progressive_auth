
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <span className="text-green-700">
            PROFILE

          </span>
          <div>
            <form action="/auth/signout" method="post">
              <button className="text-white bg-red-800 box-border border border-transparent
              hover:bg-black focus:ring-4 focus:ring-brand-medium 
                shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
                type="submit">
                SIGNOUT
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
