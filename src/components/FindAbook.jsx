import { useState,useEffect } from "react";
import axios from "axios";



function SectionFindABook() {

  const [inputFindbook, setinputFindbook] = useState("");   // อันนี้เป็น event ปุ่ท 
  const [findbook, setfindBook] = useState([]); /// ใช้เก็บข้อมูลหนังสือที่ได้จาก API


  const handleFindBook = (event) => {
    setinputFindbook(event.target.value);
  };

  useEffect(() =>{
    if (inputFindbook) {
     getDataBook(inputFindbook);
    }
  }, [inputFindbook]);

  const getDataBook = async(text) => {
    try { 
   const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${text}`);
   setfindBook(response.data.items || []);
  } catch (error) {
    console.log(error)
  }
}
  return (
    <>
      <form> 
        <h1>Find a Book</h1>
        <label> Find  </label>
        <input
        type="text"
        value={inputFindbook}
        onChange={handleFindBook}
        />
        <ul>  
        {findbook.length > 0 ? (
            findbook.map((docs, index) => (
              <li key={index}>{docs.volumeInfo.title}</li>
            ))
          ) : (
            <li>ไม่พบข้อมูลที่ต้องการค้นหา</li>
          )}
        </ul>


      </form>
    </>
  );
}


export default SectionFindABook;