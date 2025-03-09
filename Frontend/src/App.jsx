import React from "react";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./User/Pages/HomePage";
import AboutUs from "./User/Pages/Aboutus";
import BookCaretaker from "./User/Pages/BookCaretaker";
import Blogmain from "./User/Pages/Blogmain";
import SettingsPage from "./User/Pages/Setting";
import BlogDetail from "./User/Pages/BlogDetails";
import Login from "./User/Pages/login";
import Signup from "./User/Pages/signup";
import { Toaster } from "react-hot-toast";
import CaretakerLogin from "./User/Pages/Caretaker/CaretakerLogin";
import CaretakerBookingPortal from "./User/Pages/Caretaker/Booking";
import Dashboard from "./User/Pages/Caretaker/Dashboard";
import Tasks from "./User/Pages/Caretaker/task";
import Notifiation from "./User/Pages/Caretaker/Notification";
import AdminLogin from "./User/Pages/Admin/AdminLogin";
import Profile from "./User/Pages/profile";
import ChangePassword from "./User/Pages/Changepassword";
import BookingDetails from "./User/Pages/MyBookings";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        {/* User */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/blog" element={<Blogmain />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/user/:id" element={<Profile />} />
        <Route path="/bookcaretaker" element={<BookCaretaker />} />
        <Route path="/setting" element={<SettingsPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/booking-details" element={<BookingDetails />} />

        {/* Caretaker */}
        <Route path="/login/caretaker" element={<CaretakerLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/task" element={<Tasks />} />
        <Route path="/booking" element={<CaretakerBookingPortal />} />
        <Route path="/notification" element={<Notifiation />} />

        {/* Admin */}
        <Route path="/login/admin" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
