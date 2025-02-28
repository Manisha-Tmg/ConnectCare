import AdminDashboard from "./Pages/Home";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Caretakermanagement from "./Pages/Caretakermanagement ";
import Usermanagement from "./Pages/Usermanagement";
import BookingManagement from "./Pages/BookingManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/Dashboard" element={<AdminDashboard />} />
        <Route path="/admin/Caretaker" element={<Caretakermanagement />} />
        <Route path="/admin/User" element={<Usermanagement />} />
        <Route path="/admin/Booking" element={<BookingManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
