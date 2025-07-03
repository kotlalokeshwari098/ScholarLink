import { createContext, useEffect,useState } from "react";
import axiosInstance from "../api/axiosConfig";

const BookmarkContext=createContext(null)


function BookmarkProvider({children}) {
    const [bookmarks, setBookmarks] = useState([]);
    const token = localStorage.getItem("jwtToken");
   useEffect(() => {
    const fetchBookmarks=async()=>{
     try {
       let bookmarksData = await axiosInstance.get(
         "/auth/bookmark",
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         }
       );
      //  console.log(bookmarksData.data);
       setBookmarks(bookmarksData.data)
     } catch (err) {
       console.log(err.message);
     }
   }

   fetchBookmarks();
},[])
       
  return (
     <BookmarkContext.Provider value={{bookmarks,setBookmarks}}>
        {children}
     </BookmarkContext.Provider>
  )
}

export {BookmarkProvider, BookmarkContext}
