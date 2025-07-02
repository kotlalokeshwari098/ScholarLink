import React from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/HomePage";
import ScholarShipList from "./pages/ScholarShipList";
// import ScholarLayout from './layouts/ScholarLayout';
import ScholarShipInfo from "./pages/ScholarShipInfo";
import ScholarShipCompatibility from "./pages/ScholarShipCompatability";
import AboutUs from "./pages/AboutUs";
import BookMark from "./pages/BookMark";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/DashBoard";
import { BookmarkProvider } from "./context/BookmarkContext";
import { Outlet } from "react-router-dom";
import EditProfile from "./pages/EditProfile";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import CompatibilityCheck from "./components/CompatibilityCheck";
import UserProtectWrapper from "./pages/UserProtecterWrapper";
import MainProfile from "./pages/MainProfile";
import { ProfileContextProvider } from "./context/ProfileContext";

const BookmarkProviderWrapper = () => (
  <BookmarkProvider>
    <Outlet />
  </BookmarkProvider>
);
const ProfileProviderWrapper=()=>(
   <ProfileContextProvider>
     <Outlet/>
   </ProfileContextProvider>
)

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/scholarshiplist" element={<ScholarShipList />} />
      <Route path="/scholarshiplist/:name" element={<ScholarShipInfo />} />
      {/* <Route path="/compatibility-check" element={<CompatibilityCheck />} /> */}

      <Route path="/about" element={<AboutUs />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route element={<BookmarkProviderWrapper />}>
        <Route
          path="/dashboard"
          element={
            <UserProtectWrapper>
              <DashBoard />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/bookmark"
          element={
            <UserProtectWrapper>
              <BookMark />
            </UserProtectWrapper>
          }
        />
      </Route>
      <Route element={<ProfileProviderWrapper />}>
        <Route
          path="/compatibility-test"
          element={
            <UserProtectWrapper>
              <ScholarShipCompatibility />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/compatibility-test/:id"
          element={
            <UserProtectWrapper>
              <ScholarShipCompatibility />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/mainprofile"
          element={
            <UserProtectWrapper>
              <MainProfile />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/editprofile"
          element={
            <UserProtectWrapper>
              <EditProfile />
            </UserProtectWrapper>
          }
        />
      </Route>

      <Route path="/logout" element={<Logout />} />
    </Route>
  )
);
function App() {
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
