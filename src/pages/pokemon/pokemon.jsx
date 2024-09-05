import React, { useEffect, useState } from "react";
import "./pokemon.scss";
import Header from "../header/header";
import Modal from "../modal/modal";
import { fetchPokemonList, removePokemon } from "../../redux/action";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PokemonPage = (props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  useEffect(() => {
    props.loadPokemon();
  }, []);

  const handleEdit = (item, id) => {
    setCurrentItem(item);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Do you really want to delete this item?"
    );
    if (confirmDelete) {
      props.removePokemon(id);
      props.loadPokemon();
      toast.success("Item deleted successfully!");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return props.pokemon.loading ? (
    <div>
      <h2>Loading......</h2>
    </div>
  ) : props.pokemon.errMessage ? (
    <div>
      <h2>{props.pokemon.errMessage}</h2>
    </div>
  ) : (
    <div className="pokemon-card-page">
      <Header />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        currentItem={currentItem}
      />
      <div className="pokemon-cardss">
        {props.pokemon.pokemonlist.data &&
          props.pokemon.pokemonlist.data.map((item) => (
            <div className="pokemon-main-card" key={item._id}>
              <img className="pokemon-img" src={item.image} alt={item.title} />
              <h1 className="pokemon-heading">{item.title}</h1>
              <h3 className="pokemon-breed">{item.breed}</h3>
              <p className="pokemon-para">{item.description}</p>
              <div className="pokemon-btn">
                <button
                  className="edit-btn btn-style"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn btn-style"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
      <ToastContainer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  pokemon: state.pokemon,
});

const mapDispatchToProps = (dispatch) => ({
  loadPokemon: () => dispatch(fetchPokemonList()),
  removePokemon: (id) => dispatch(removePokemon(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PokemonPage);
