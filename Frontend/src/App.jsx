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
import Dashboard from "./User/Pages/Caretaker/Dashboard";
import Notifiation from "./User/Pages/Caretaker/Notification";
import AdminLogin from "./User/Pages/Admin/AdminLogin";
import Profile from "./User/Pages/profile";
import ChangePassword from "./User/Pages/Changepassword";
import BookingDetails from "./User/Pages/MyBookings";
import CaretakerProfile from "./User/Pages/Caretaker/CaretakerProfile";
import CaretakerBookingPortal from "./User/Pages/Caretaker/Caretakermybooking";
import BookCaretakerViewDetails from "./User/Pages/BookCaretakerViewDetails";
import Contact from "./User/Pages/Contact";

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
        <Route path="/Caretakerview" element={<BookCaretakerViewDetails />} />
        <Route path="/viewDetails" element={<Contact />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route
          path="/booking-details/:booking_id"
          element={<BookingDetails />}
        />
        {/* Caretaker */}
        <Route path="/login/caretaker" element={<CaretakerLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/viewDetails" element={<BookCaretakerViewDetails />} />
        <Route path="/booking/" element={<CaretakerBookingPortal />} />
        <Route path="/notification" element={<Notifiation />} />
        <Route path="/caretaker/profile" element={<CaretakerProfile />} />
        {/* <Route path="/caretaker/mybooking/:id" element={<BookingDetails />} /> */}
        {/* Admin */}
        <Route path="/login/admin" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
