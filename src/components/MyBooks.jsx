import React, {useState, useEffect} from "react";
import NavBar from "./NavBar";

const MyBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books from local storage
    const storedBooks = JSON.parse(localStorage.getItem("bookshelf")) || [];
    setBooks(storedBooks);
  }, []);

  const removeBook = (book) => {
    const updatedBooks = books.filter((item) => item.key !== book.key);
    localStorage.setItem("bookshelf", JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
  };
  const clearBookshelf = () => {
    localStorage.removeItem("bookshelf");
    setBooks([]);
  };
  return (
    <NavBar>
      <div className="pt-12 p-5 md:p-24 flex flex-col gap-5 md:gap-12 w-full">
        <div
          className="flex w-fit  gap-1 justify-center p-3  border-blue-400 border-2 rounded-lg cursor-pointer hover:bg-blue-400 transition-all ease-linear hover:text-white"
          onClick={() => clearBookshelf()}
        >
          <div>Clear All</div>
        </div>
        <div className="font-bold text-xl md:text-4xl text-blue-600">
          My Books :
        </div>
        <div className="grid lg:grid-cols-3 lg:grid-rows-2 md:grid-cols-2 md:grid-rows-5  grid-cols-1 grid-rows-10  gap-5">
          {books.map((item, index) => {
            return (
              <div key={item.key} className="min-h-[300px]">
                <div className="flex flex-col justify-evenly gap-2 bg-blue-300 bg-opacity-20 p-5 min-w-[300px] h-full rounded-md shadow-lg">
                  <div className="flex flex-col gap-1 flex-col">
                    <div className="font-medium text-lg text-blue-500">
                      Title:
                    </div>
                    <div className="text-lg font-normal text-blue-400">
                      {item.title}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="font-medium text-lg text-blue-500">
                      Author:
                    </div>
                    <div className="text-lg font-normal text-blue-400">
                      {item.author_name?.join(", ")}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="font-medium text-lg text-blue-500">
                      Published:
                    </div>
                    <div className="text-lg font-normal text-blue-400">
                      {item.first_publish_year}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="font-medium text-lg text-blue-500">
                      Edition Count:
                    </div>
                    <div className="text-lg font-normal text-blue-400">
                      {item.edition_count}
                    </div>
                  </div>
                  <div
                    className="flex gap-1 justify-center p-3 m-2 border-blue-400 border-2 rounded-lg cursor-pointer hover:bg-blue-400 transition-all ease-linear hover:text-white"
                    onClick={() => removeBook(item)}
                  >
                    <div>Remove Book</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </NavBar>
  );
};

export default MyBooks;
