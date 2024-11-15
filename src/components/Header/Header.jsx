import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <nav className="bg-gray-500 text-white p-3 flex flex-wrap justify-between m-1.2rem">
        <h2 className="text-3xl font-bold ml-1 uppercase">zappy cart</h2>
        <p className=" text-3xl justify-center items-center capitalize hover:text-amber-500">
          <Link to="./">home</Link>
        </p>
        <ul className="flex flex-wrap gap-6 text-3xl capitalize mr-1 ">
          <li className="hover:text-amber-500">
            <Link to="./sign up">sign up</Link>
          </li>
          <li className="hover:text-amber-500">
            <Link to="./login">login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
