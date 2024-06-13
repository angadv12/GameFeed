import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return <>

    <main className=" bg-clip-content p-10 flex flex-row items-center justify-start bg-bg404 bg-no-repeat bg-cover bg-fixed bg-center min-h-screen">
      <div className="-ml-5 bg-slate-900 flex flex-col items-center py-10 pr-5 rounded-xl text-white">
        <p className="text-6xl font-semibold ">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight  sm:text-5xl">Page not found</h1>
        <p className=" font-bold py-5">Sorry, we couldn't find the page you're looking for.</p>
        <Link to='/' className="font-semibold border-2 border-white text-white rounded-lg px-2"> Go Home </Link>
      </div>
    </main>

  </>
}
export default NotFoundPage