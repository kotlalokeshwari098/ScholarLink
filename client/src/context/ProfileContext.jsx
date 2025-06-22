import React from 'react'
import { createContext } from 'react'
import { useState,useEffect } from 'react';
import axiosInstance from "../api/axiosConfig";

const ProfileDataContext=createContext(null);

 const ProfileContextProvider = ({ children }) => {
   const [profile, setProfile] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
     const fetchProfileData = async () => {
       try {
         const token = localStorage.getItem("jwtToken");

         if (!token) {
           setError("You must be logged in to view your profile");
           setLoading(false);
           return;
         }

         const response = await axiosInstance.get("/auth/profile", {
           headers: { Authorization: `Bearer ${token}` },
         });

         setProfile(response.data.profile);
         console.log(response.data);
       } catch (error) {
         console.error("Error fetching profile data:", error);
         setError("Failed to load profile data.");
       } finally {
         setLoading(false);
       }
     };

     fetchProfileData();
   }, []);

   return (
     <ProfileDataContext.Provider
       value={{ profile, setProfile, loading, error }}
     >
       {children}
     </ProfileDataContext.Provider>
   );
 };


export { ProfileContextProvider, ProfileDataContext };