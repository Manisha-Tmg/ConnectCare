import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./User/Pages/HomePage";
import AboutUs from "./User/Pages/Aboutus";
import Blogmain from "./User/Pages/Blogmain";
import BlogDetail from "./User/Pages/BlogDetails";
import Login from "./User/Pages/login";
import Signup from "./User/Pages/signup";
import { Toaster } from "react-hot-toast";
import Profile from "./User/Pages/profile";
import ChangePassword from "./User/Pages/Changepassword";
import BookingDetails from "./User/Pages/MyBookings";
import Addcaretaker from "./Adminpage/Pages/Addcaretaker";
import AdminLogin from "./Adminpage/Pages/AdminLogin";
import BookCaretakerdetails from "./User/Pages/BookCaretakerViewDetails";
import BookingFormPreview from "./User/Pages/Booking";
import Details from "./User/Pages/Details";
import Admindash from "./Adminpage/Pages/Admindash";
import CaretakerPanel from "./Adminpage/Pages/Caretaker";
import CaretakerDetails from "./Adminpage/Pages/CaretakerDetails";
import UserPanel from "./Adminpage/Pages/User";
import UserDetails from "./Adminpage/Pages/UserDetails.jsx";
import Adduser from "./Adminpage/Pages/Useradd.jsx";
import TotalBookingPanel from "./Adminpage/Pages/TotalBooking.jsx";
import CaretakerDashboard from "./Caretaker/Pages/CaretakerDashboard.jsx";
import CaretakerProfile from "./Caretaker/Pages/CaretakerProfile.jsx";
import CaretakerLogin from "./Caretaker/Pages/CaretakerLogin.jsx";
import CaretakerBookingPortal from "./Caretaker/Pages/Caretakermybooking.jsx";
import CaretakerSignup from "./Caretaker/Pages/Caretakersignup.jsx";
import CaretakerChangepassword from "./Caretaker/Pages/CaretakerChangepassword.jsx";
import Forgotpassword from "./User/Pages/Forgotpassword.jsx";
import ResetPassword from "./User/Pages/ResetPassword.jsx";
import CaretakerForgotPassword from "./Caretaker/Components/CaretakerForgotPassword.jsx";
import CaretakerResetPasswordComponent from "./Caretaker/Components/CaretakerResetPasswordComponent.jsx";

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
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/caretaker" element={<BookCaretakerdetails />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/notification" element={< />} /> */}
        <Route path="/BookCaretaker/:id" element={<BookingFormPreview />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/caretakerDetails/:id" element={<Details />} />
        <Route
          path="/booking-details/:booking_id"
          element={<BookingDetails />}
        />

        {/* Caretaker */}
        <Route path="/login/caretaker" element={<CaretakerLogin />} />
        <Route path="/dashboard/:id" element={<CaretakerDashboard />} />
        <Route path="/caretaker/register" element={<CaretakerSignup />} />
        <Route path="/booking/" element={<CaretakerBookingPortal />} />
        <Route path="/caretaker/profile" element={<CaretakerProfile />} />
        <Route
          path="/caretaker/forgot-passwords"
          element={<CaretakerForgotPassword />}
        />
        <Route
          path="/reset-passwords"
          element={<CaretakerResetPasswordComponent />}
        />
        <Route
          path="/caretaker/changepassword/:id"
          element={<CaretakerChangepassword />}
        />

        {/* Admin */}
        <Route path="/admin/login/" element={<AdminLogin />} />
        <Route path="/admin/Addcaretaker" element={<Addcaretaker />} />
        <Route path="/admin/Adduser" element={<Adduser />} />
        <Route path="/admin/Dashboard" element={<Admindash />} />
        <Route path="/admin/Users" element={<UserPanel />} />
        <Route path="/admin/Caretaker" element={<CaretakerPanel />} />
        <Route path="/admin/bookings" element={<TotalBookingPanel />} />
        <Route path="/caretakers/:id" element={<CaretakerDetails />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
