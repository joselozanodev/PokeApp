import React from "react";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { setOrder, setFilter, setCurrentPage } from "../../redux/pokemonSlice";
import Card from "../cards/card";

const Home = () => {
  const pokemons = useSelector((state) => state.pokemon.pokedex);
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.pokemon.currentPage);
  const pokemonsPerPage = useSelector((state) => state.pokemon.pokemonsPerPage);
  const types = useSelector((state) => state.pokemon.types);

  const handleOrder = ({ target }) => {
    const order = target.getAttribute("value");
    dispatch(setOrder(order));
    dispatch(setCurrentPage(1));
    const activeElement = document.querySelector("#order li.active");
    if (activeElement) {
      activeElement.classList.remove("active");
    }
    target.classList.add("active");
  };

  const handleFilter = ({ target }) => {
    const filter = target.getAttribute("value");
    dispatch(setFilter(filter));
    dispatch(setCurrentPage(1));
    const activeElement = document.querySelector("#filter li.active");
    if (activeElement) {
      activeElement.classList.remove("active");
    }
    target.classList.add("active");
  };

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const startIndex = (currentPage - 1) * pokemonsPerPage;
  const endIndex = startIndex + pokemonsPerPage;
  const maximum = Math.ceil(pokemons.length / pokemonsPerPage);

  return (
    <>
    <div className="filter-container">
      <ul id="filter" onClick={handleFilter}>
        <li value="all">All</li>
        <li value="db">Created Pokemons</li>
        <li value="api">Existing Pokemons</li>
        {
          types.map((type, index) => {
            return (
              <li key={index} value={`type: ${type}`}>{type}</li>
            )
          })
        }
      </ul>
    </div>
      <div id="order">
        <p className="order-placeholder">Order by <img src="https://www.svgrepo.com/download/27797/right-arrow.svg" className="dropdown-arrow"/></p>
        <div className="order-list">
        <ul  onClick={handleOrder} id="ul-order">
          <li value="a-z">A - Z</li>
          <li value="z-a">Z - A</li>
          <li value="attack-asc">Higher Attack</li>
          <li value="attack-desc">Lower Attack</li>
        </ul>
        </div>
      </div>

      <div className="pagination-container">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="prev"
        >
          {"<<"}
        </button>

        {Array.from({ length: maximum }, (_, index) => {
          //[1, 2, 3, 4, 5]
          //  ^  ^  ^  ^  ^
          // 1  2  3  4  5
          const pageNumber = index + 1;
          return (
            <button
              key={index}
              onClick={() => handlePageChange(pageNumber)}
              className={
                "pagination-item" +
                (pageNumber === currentPage ? "-active" : "")
              } // if pageNumber === page, add "active" class to the button
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === maximum}
          className="next"
        >
          {">>"}
        </button>
      </div>
      <div className="card-container-father">
        {pokemons
          .slice(startIndex, endIndex)
          .map(
            (
              {
                pokemonId,
                pokemonName,
                pokemonTypes,
                pokemonAbilities,
                pokemonStats,
                pokemonSprite,
                pokemonWeight,
                pokemonHeight,
                pokemonMoves,
                pokemonCreated,
              },
              index
            ) => {
              return (
                <Card
                  key={index}
                  id={pokemonId}
                  name={pokemonName}
                  types={pokemonTypes}
                  abilities={pokemonAbilities}
                  stats={pokemonStats}
                  sprite={pokemonSprite}
                  weight={pokemonWeight}
                  height={pokemonHeight}
                  moves={pokemonMoves}
                  created={pokemonCreated}
                />
              );
            }
          )}
      </div>
    </>
  );
};

export default Home;
