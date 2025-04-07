import React from "react";
import "../Css/UpdateCaretaker.css";

const UpdateCaretaker = () => {
  const handleStatusChange = async (id, currentStatus) => {
    const token = Cookies.get("accessToken");

    try {
      const response = await fetch(
        `${API}api/caretakers/${id}/change-status/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ is_active: !currentStatus }),
        }
      );

      if (response.ok) {
        const updatedCaretakers = caretakers.map((ct) =>
          ct.id === id ? { ...ct, is_active: !currentStatus } : ct
        );
        setcaretakers(updatedCaretakers);
      } else {
        console.log("Failed to update status");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return <div>UpdateCaretaker</div>;
};

export default UpdateCaretaker;
