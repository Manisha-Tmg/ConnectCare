// import React, { useEffect, useState } from "react";
// import "../../css/Blog.css";
// // import Caregibving from "../../assets/Caregibving.jpg";
// // import elderlycare from "../../assets/elderlycare.jpg";
// // import homehealth from "../../assets/home health.jpg";
// import { useNavigate } from "react-router-dom";
// import Previous from "../../components/Previous";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
// import { API } from "../../../env";

// const Details = () => {
//   const navigate = useNavigate();
//   const [caretakers, setCaretakers] = useState([]);

//   useEffect(() => {
//     const fetchCaretakers = async () => {
//       try {
//         const res = await fetch(`${API}api/caretakers/`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         const data = await res.json();
//         setCaretakers(data);
//       } catch (error) {}
//     };
//     fetchCaretakers();
//   }, []);

//   return (
//     <div>
//       <Header />
//       <div className="blog-container">
//         <div className="blog-header">
//           <h1>
//             <Previous />
//             Caretakers
//           </h1>
//           {/* <p>Insights and updates on caregiving and wellness.</p> */}
//         </div>

//         <div className="blog-grid">
//           {caretakers.map((caretaker) => (
//             <div key={caretaker.id} className="blog-card">
//               <img
//                 src={caretaker.image_url}
//                 alt={caretaker.name}
//                 className="blog-image"
//               />
//               <div className="blog-content">
//                 <h2>Name: {caretaker.name}</h2>
//                 <p className="blog-excerpt">
//                   Hourly Rate: {caretaker.hourly_rate}
//                 </p>
//                 <p className="blog-excerpt">
//                   Speciality: {caretaker.specialty}
//                 </p>
//                 <p className="blog-excerpt">Number: {caretaker.phone}</p>{" "}
//                 <p className="blog-excerpt">
//                   Status:
//                   {caretaker.is_available ? "Available" : "Not Available"}
//                 </p>
//                 <button
//                   className="blog-button"
//                   onClick={() =>
//                     navigate(`/details/${caretaker.id}`, { state: caretaker })
//                   }
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Details;
