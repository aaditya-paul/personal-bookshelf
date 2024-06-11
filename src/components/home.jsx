import React, {useEffect, useState, useCallback, useRef} from "react";
import debounce from "lodash.debounce"; // if using lodash

function Home() {
  const [response, setResponse] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [querySearch, setQuerySearch] = useState("");
  const [bookshelf, setBookshelf] = useState([]);
  const debouncedFetchBooksRef = useRef(null);
  useEffect(() => {
    const savedBookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    setBookshelf(savedBookshelf);
  }, []);

  const addToBookshelf = (book) => {
    const existingBookshelf =
      JSON.parse(localStorage.getItem("bookshelf")) || [];
    const isBookAlreadyInBookshelf = existingBookshelf.some(
      (b) => b.key === book.key
    );

    if (!isBookAlreadyInBookshelf) {
      const updatedBookshelf = [...existingBookshelf, book];
      localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
      setBookshelf(updatedBookshelf);
      alert("Book added to your bookshelf.");
    } else {
      alert("This book is already in your bookshelf.");
    }
  };
  const fetchBooks = (searchQuery) => {
    setIsLoading(true);
    setError(false);

    fetch(
      `https://openlibrary.org/search.json?q=${searchQuery}&limit=10&page=1`
    )
      .then((response) => response.json())
      .then((data) => {
        setResponse(data.docs);
        setQuerySearch(searchQuery);

        // setError(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(true);
      })
      .finally(() => setIsLoading(false));
  };

  // Debounce fetchBooks function
  useEffect(() => {
    debouncedFetchBooksRef.current = debounce(
      (searchQuery) => fetchBooks(searchQuery),
      500
    );
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (debouncedFetchBooksRef.current) {
      debouncedFetchBooksRef.current(value);
    }
  };

  return (
    <div className="pt-12 p-5 md:p-24 flex flex-col gap-5 md:gap-12 w-full ">
      <div className="font-bold text-xl md:text-4xl text-blue-600">
        Search Books :
      </div>
      <div className="flex flex-col gap-5 md:justify-center md:items-center ">
        <input
          type="text"
          placeholder="Search for books"
          onChange={handleInputChange}
          className="w-[70vw] text-xs  md:text-xl p-3 md:py-4 md:px-5 border-2 border-blue-400 rounded-xl outline-none "
          value={query}
        />
        {isLoading && (
          <div className="col-span-4 row-span-2 flex md:justify-center md:items-center text-lg md:text-3xl text-blue-400 font-bold">
            Loading...
          </div>
        )}
        {error && (
          <div className="col-span-4 row-span-2 flex md:justify-center md:items-center text-lg md:text-3xl text-blue-400 font-bold">
            Failed to fetch data, please try again later.
          </div>
        )}
      </div>
      {query === "" && (
        <div className=" flex md:justify-center md:items-center md:self-center text-lg md:text-3xl text-blue-400 font-bold">
          Search for books to display here 🤓
        </div>
      )}
      {query !== "" && (
        <div className="  text-lg md:text-3xl text-blue-400 font-bold">
          Search results for "{querySearch}"
        </div>
      )}
      <div className="grid lg:grid-cols-3 lg:grid-rows-2 md:grid-cols-2 md:grid-rows-5  grid-cols-1 grid-rows-10  gap-5">
        {response.map((item) => {
          const isBookAlreadyInBookshelf = bookshelf.some(
            (b) => b.key === item.key
          );
          return (
            <div key={item.key} className="min-h-[300px]">
              <div className="flex flex-col justify-evenly gap-2 bg-blue-300 bg-opacity-20 p-5 min-w-[300px] h-full rounded-md shadow-lg">
                <div className="flex gap-1 flex-col">
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
                  className={`flex gap-1 justify-center p-3 m-2 ${
                    isBookAlreadyInBookshelf
                      ? "border-green-400"
                      : "border-blue-400"
                  } border-2 rounded-lg cursor-pointer ${
                    isBookAlreadyInBookshelf
                      ? "hover:bg-green-400"
                      : "hover:bg-blue-400"
                  }  transition-all ease-linear hover:text-white`}
                  onClick={() => addToBookshelf(item)}
                >
                  <div>
                    {isBookAlreadyInBookshelf
                      ? "Added to Bookshelf"
                      : "Add to BookShelf"}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
