import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./User/Pages/HomePage";
import AboutUs from "./User/Pages/Aboutus";
import Tasks from "./User/Pages/task";
import BookCaretaker from "./User/Pages/BookCaretaker";
import Blogmain from "./User/Pages/Blogmain";
import SettingsPage from "./User/Pages/Setting";
import BlogDetail from "./User/Pages/BlogDetails";
import Dashboard from "./User/Pages/Dashboard";
import Notifiation from "./User/Pages/Notification";
import CaretakerBookingPortal from "./User/Pages/Booking";
import CaretakerLogin from "./User/Pages/CaretakerLogin";
import Login from "./User/Pages/login";
import AdminLogin from "./User/Pages/AdminLogin";
import Signup from "./User/Pages/signup";
import { Toaster } from "react-hot-toast";

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
        <Route path="/bookcaretaker" element={<BookCaretaker />} />
        <Route path="/setting" element={<SettingsPage />} />

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
