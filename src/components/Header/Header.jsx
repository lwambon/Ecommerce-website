import { Link } from "react-router-dom"

function Header() {
  return (
    <div>
    <nav className="bg-gray-500 text-white p-3 flex flex-wrap justify-between m-1.2rem">
        <h2 className="text-3xl font-bold ml-1 uppercase">zappy cart</h2>
        <p className=" text-2xl justify-center items-center capitalize"><Link to="./">home</Link></p>
        <ul className="flex flex-wrap gap-4 text-2xl capitalize mr-1">
            <li><Link to="./sign up">sign up</Link></li>
            <li><Link to="./login">login</Link></li>
        </ul>
    </nav>
    </div>
  )
}

export default Header