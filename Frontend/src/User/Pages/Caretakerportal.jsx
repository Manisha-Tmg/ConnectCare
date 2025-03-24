// // import React, { useState } from "react";
// import {
//   User,
//   Phone,
//   Mail,
//   MapPin,
//   Calendar,
//   Clock,
//   Star,
//   ArrowLeft,
//   Briefcase,
// } from "lucide-react";
// import Header from "../components/Header";
// import "../css/CaretakerCard.css";

// const CaretakerDetailView = () => {
//   const [isViewMode, setIsViewMode] = useState(true);

//   // Sample caretaker data
//   const caretaker = {
//     id: 1,
//     name: "Sarah Johnson",
//     avatar: "/api/placeholder/150/150",
//     rating: 4.8,
//     reviews: 127,
//     experience: "5+ years",
//     phone: "+1 (555) 123-4567",
//     email: "sarah.johnson@example.com",
//     address: "123 Care Street, Healthville, CA 94103",
//     specialties: ["Elder Care", "Medication Management", "Physical Therapy"],
//     availability: [
//       { day: "Monday", hours: "9:00 AM - 5:00 PM" },
//       { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
//       { day: "Friday", hours: "10:00 AM - 6:00 PM" },
//     ],
//     bio: "Sarah is a certified caretaker with over 5 years of experience in elder care. She specializes in medication management and physical therapy assistance. Sarah is known for her patient-centered approach and warm personality.",
//   };

//   const handleBackClick = () => {
//     // In a real app, this would navigate back to the caretaker list
//     console.log("Navigating back to caretaker list");
//   };

//   return (
//     <div>
//       {" "}
//       <Header />
//       <div className="caretaker-page">
//         <header className="page-header">
//           <div className="header-container">
//             <button onClick={handleBackClick} className="back-button">
//               <ArrowLeft size={20} />
//             </button>
//             <h1 className="header-title">Caretaker Details</h1>
//           </div>
//         </header>
//         {/* Main Content */}
//         <main className="main-content">
//           <div className="caretaker-container">
//             {/* Profile Header */}
//             <div className="profile-header">
//               <div className="profile-container">
//                 <img
//                   src={caretaker.avatar}
//                   alt={caretaker.name}
//                   className="profile-avatar"
//                 />
//                 <div className="profile-info">
//                   <h2 className="profile-name">{caretaker.name}</h2>
//                   <div className="profile-stats">
//                     <Star className="rating-star" size={16} />
//                     <span className="rating-text">
//                       {caretaker.rating} ({caretaker.reviews} reviews)
//                     </span>
//                   </div>
//                   <div className="experience-badge">
//                     <Briefcase size={16} />
//                     <span className="experience-text">
//                       {caretaker.experience} experience
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Details Content */}
//             <div className="content-wrapper">
//               <div className="content-grid">
//                 {/* Left Column */}
//                 <div className="content-column">
//                   <h3 className="section-title">Contact Information</h3>
//                   <div className="contact-list">
//                     <div className="contact-item">
//                       <Phone size={18} className="contact-icon" />
//                       <span className="contact-text">{caretaker.phone}</span>
//                     </div>
//                     <div className="contact-item">
//                       <Mail size={18} className="contact-icon" />
//                       <span className="contact-text">{caretaker.email}</span>
//                     </div>
//                     <div className="contact-item">
//                       <MapPin size={18} className="contact-icon" />
//                       <span className="contact-text">{caretaker.address}</span>
//                     </div>
//                   </div>

//                   <h3 className="section-title">Specialties</h3>
//                   <div className="specialties-container">
//                     {caretaker.specialties.map((specialty, index) => (
//                       <span key={index} className="specialty-tag">
//                         {specialty}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Right Column */}
//                 <div className="content-column">
//                   <h3 className="section-title">Availability</h3>
//                   <div className="availability-list">
//                     {caretaker.availability.map((slot, index) => (
//                       <div key={index} className="availability-slot">
//                         <Calendar size={18} className="contact-icon" />
//                         <span className="day-label">{slot.day}:</span>
//                         <Clock size={18} className="contact-icon" />
//                         <span className="hours-text">{slot.hours}</span>
//                       </div>
//                     ))}
//                   </div>

//                   <h3 className="section-title">Actions</h3>
//                   <div className="action-buttons">
//                     <button className="schedule-button">
//                       Schedule Appointment
//                     </button>
//                     <button className="message-button">Message</button>
//                   </div>
//                 </div>
//               </div>

//               {/* Biography Section */}
//               <div className="bio-section">
//                 <h3 className="section-title">Biography</h3>
//                 <p className="bio-text">{caretaker.bio}</p>
//               </div>
//             </div>
//           </div>
//         </main>
//         {/* Footer */}
//         {/* <footer className="page-footer">
//         <div className="footer-content">
//           © 2025 Caretaker Connect - All rights reserved
//         </div>
//       </footer> */}
//       </div>
//     </div>
//   );
// };

// export default CaretakerDetailView;
// import React, { useState } from "react";
// import CaretakerCard from "./CaretakerCard";
// import CaretakerDetailView from "../Caretakerportal";
// import "../css/CaretakerList.css";

// const CaretakerListPage = () => {
//   const [selectedCaretakerId, setSelectedCaretakerId] = useState(null);

//   // Sample list of caretakers
//   const caretakers = [
//     {
//       id: 1,
//       name: "Sarah Johnson",
//       avatar: "/api/placeholder/150/150",
//       rating: 4.8,
//       reviews: 127,
//       experience: "5+ years",
//       address: "Healthville, CA",
//       specialties: ["Elder Care", "Medication Management"],
//       hourlyRate: "$25-30",
//       availability: true,
//     },
//     {
//       id: 2,
//       name: "John Smith",
//       avatar: "/api/placeholder/150/150",
//       rating: 4.5,
//       reviews: 98,
//       experience: "3+ years",
//       address: "Wellness City, NY",
//       specialties: ["Companionship", "Mobility Support"],
//       hourlyRate: "$20-25",
//       availability: false,
//     },
//   ];

//   const handleViewDetails = (caretakerId) => {
//     setSelectedCaretakerId(caretakerId);
//   };

//   return (
//     <div className="caretakers-grid">
//       <h1 className="caretakers-heading">Available Caretakers</h1>

//       {selectedCaretakerId ? (
//         // Show detailed view when a caretaker is selected
//         <CaretakerDetailView
//           caretakerId={selectedCaretakerId}
//           onBack={() => setSelectedCaretakerId(null)}
//         />
//       ) : (
//         // Show grid of cards when no caretaker is selected
//         <div className="caretakers-grid">
//           {caretakers.map((caretaker) => (
//             <CaretakerCard
//               key={caretaker.id}
//               caretaker={caretaker}
//               onViewDetails={handleViewDetails}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CaretakerListPage;
