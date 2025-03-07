import React from "react";
import { ToastContainer, toast } from "react-toastify";

const Tostify = () => {
  const notify = () => toast("Wow so easy!");

  return (
    <div>
      <button onClick={notify}>Notify!</button>
      <ToastContainer />
    </div>
  );
};

export default Tostify;
