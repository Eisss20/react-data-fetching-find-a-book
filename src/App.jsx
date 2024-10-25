import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [inputText, setInputText] = useState("");
  const [book, setBook] = useState([]);

  const handleInput = (event) => {
    setInputText(event.target.value);
  };

  useEffect(() => {
    const data = async () => {
      if (inputText) {
        try {
          const result = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${inputText}`
          );
          const booktitle = result.data.items.map(
            (item) => item.volumeInfo.title
          );
          setBook(booktitle);
        } catch (error) {
          console.log(error);
        }
      } else {
        setBook([]);
      }
    };
    data();
  }, [inputText]);

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <form>
        <div className="input-container">
          <label>
            <input
              id="book-input"
              type="text"
              value={inputText}
              onChange={handleInput}
            />
          </label>
        </div>
        <br />
        <ul>
          {book.map((title, index) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
