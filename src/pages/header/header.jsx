import React, { useState } from "react";
import "./header.scss";
import logo from "../../assets/pokemonLogo.png";
import Modal from "../modal/modal";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="header">
      <div className="header-img">
        <img src={logo} alt="Logo" />
      </div>
      <div className="btn-create">
        <button className="create" onClick={handleModalOpen}>
          Create
        </button>
      </div>
      <Modal isOpen={isOpen} onClose={handleModalClose} />
    </div>
  );
};

export default Header;
