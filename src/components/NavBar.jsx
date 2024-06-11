import React from "react";

function NavBar({children}) {
  return (
    <div className="  flex ">
      <div className=" fixed w-full bg-blue-400 bg-opacity-20 backdrop-blur-md shadow-md py-5 px-8">
        <div className=" flex justify-between items-center">
          <div className=" text-lg md:text-4xl font-bold text-blue-900">
            <a href="/">📚 Book Finder</a>
          </div>
          <div className="flex gap-5">
            <div className=" text-xs md:text-xl font-medium text-blue-900 px-3 py-2 md:px-5 md:py-3 border-2 border-blue-900 border-opacity-60 rounded-xl cursor-pointer hover:bg-blue-900 hover:text-white transition-all ease-linear">
              <a href="/bookshelf"> My Bookshelf</a>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-12 w-full">{children}</div>
    </div>
  );
}

export default NavBar;
