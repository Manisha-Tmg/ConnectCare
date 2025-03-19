import React from "react";
import "../../css/task.css";
import CaretakerSidebar from "../../../components/side";
import Previous from "../../../components/Previous";

const Tasks = () => {
  return (
    <div className="dashboard-container">
      <CaretakerSidebar />
      <div className="tasks">
        <h2>
          <Previous /> Today's Tasks
        </h2>
        <ul>
          <li>1. Give medicine to Mr. Smith at 10:00 AM</li>
          <li>2. Prepare lunch for Ms. Jane at 12:30 PM</li>
          <li>3. Accompany Mr. Brown for a walk at 3:00 PM</li>
        </ul>
      </div>
    </div>
  );
};

export default Tasks;
