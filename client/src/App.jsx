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
import ScholarShipCompatibility from "./pages/ScholarShipCompatablility";
import AboutUs from "./pages/AboutUs";
import BookMark from "./pages/BookMark";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/DashBoard";
import { BookmarkProvider } from "./context/BookmarkContext";
import { Outlet } from "react-router-dom";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import CompatibilityCheck from "./components/CompatibilityCheck";
import UserProtectWrapper from "./pages/UserProtecterWrapper";

const BookmarkProviderWrapper = () => (
  <BookmarkProvider>
    <Outlet />
  </BookmarkProvider>
);

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/scholarshiplist" element={<ScholarShipList />} />
      <Route path="/scholarshiplist/:name" element={<ScholarShipInfo />} />
      <Route path="/compatibility-check" element={<CompatibilityCheck />} />
      <Route
        path="/compatibility-test"
        element={
          <UserProtectWrapper>
            <ScholarShipCompatibility />
          </UserProtectWrapper>
        }
      />
      <Route
        path="/compatibility-test/:id/:name"
        element={
          <UserProtectWrapper>
            <ScholarShipCompatibility />
          </UserProtectWrapper>
        }
      />
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
      <Route path="/profile" element={<Profile />} />
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
