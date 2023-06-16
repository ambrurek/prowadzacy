import React from "react";
import "./CustomModal.css";

const CustomModal = ({ title, isOpen, onClose, onSubmit, onTitleChange, eventTitle }) => {
  return (
    <div className={`custom-modal ${isOpen ? "open" : ""}`}>
      <div className="custom-modal-content">
        <h2>{title}</h2>
        <input type="text" value={eventTitle} onChange={onTitleChange} />
        <div className="custom-modal-actions">
          <button onClick={onClose}>Anuluj</button>
          <button onClick={onSubmit}>Zatwierdź</button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
