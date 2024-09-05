import React, { useState, useEffect } from "react";
import "./modal.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  NewPokemon,
  UpdatedPokemon,
  fetchPokemonList,
  fetchPokemonObj,
} from "../../redux/action";

const Modal = ({ isOpen, onClose, currentItem, id }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [breed, setBreed] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const pokemonObj = useSelector((state) => state.pokemon.pokemonObj);

  useEffect(() => {
    if (id) {
      dispatch(fetchPokemonObj(id));
    }
  }, [id, dispatch]);

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
      setImagePreview(null);
    }
  }, [currentItem]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
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

    dispatch(fetchPokemonList());
    window.location.reload();
    onClose();
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

    const obj = {
      title,
      description,
      breed,
      image: imageBase64,
    };
    console.log(obj);
    if (currentItem && currentItem._id) {
      dispatch(UpdatedPokemon(obj, currentItem._id));
      dispatch(fetchPokemonList());
    }
    window.location.reload();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        <h2>{currentItem ? "Edit Pokemon" : "Create Pokemon"}</h2>
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
            <input type="file" onChange={handleFileChange} />
            {/* {imagePreview && (
              <img src={imagePreview} alt="Preview" className="image-preview" />
            )} */}
          </label>
          <button
            type="submit"
            onClick={currentItem ? handleUpdate : handleCreate}
          >
            {currentItem ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
