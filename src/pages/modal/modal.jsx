import React, { useState, useEffect } from "react";
import "./modal.scss";
import { useDispatch } from "react-redux";
import { NewPokemon , UpdatedPokemon, fetchPokemonList } from "../../redux/action"; 

const Modal = ({ isOpen, onClose, currentItem }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [breed, setBreed] = useState("");
  const [image, setImage] = useState(null); 
  const [imagePreview, setImagePreview] = useState(null); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentItem) {
      setTitle(currentItem.title);
      setDescription(currentItem.description);
      setBreed(currentItem.breed);
      setImagePreview(currentItem.image); 
    } else {
      setTitle("");
      setDescription("");
      setBreed("");
      setImage(null); 
      setImagePreview(null); // Reset preview
    }
  }, [currentItem]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    // Convert the file to a Base64 string for preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCreate = async () => {
    let imageBase64 = null;
    if (image) {
      const reader = new FileReader();
      imageBase64 = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(image);
      });
    }

    const obj = {
      title,
      description,
      breed,
      image: imageBase64,
    };

    dispatch(NewPokemon(obj)); 
    onClose();
    dispatch(fetchPokemonList()); // Optionally refetch data

  };

  const handleUpdate = async () => {
    let imageBase64 = null;
    if (image) {
      const reader = new FileReader();
      imageBase64 = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(image);
      });
    }
console.log(currentItem._id)
    const obj = {
      id: currentItem.id,
      title,
      description,
      breed,
      image: imageBase64,
    };
    dispatch(UpdatedPokemon(obj , currentItem._id)); 
    onClose();
    dispatch(fetchPokemonList()); 

  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        <h2>{currentItem ? "Edit Item" : "Create Item"}</h2>
        <div className="modal-form">
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            Breed:
            <input
              type="text"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            />
          </label>
          <label>
            Image:
            <input
              type="file"
              onChange={handleFileChange}
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="image-preview" />
            )}
          </label>
          <button type="submit" onClick={currentItem ? handleUpdate : handleCreate}>
            {currentItem ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
