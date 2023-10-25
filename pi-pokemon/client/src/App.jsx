import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Landing from "./components/LandingPage/Landing";
import Home from "./components/home/Home";
import NavBar from "./components/NavBar/NavBar";
import Detail from "./components/Detail/Detail";
import Form from "./components/form/Form";
import { useDispatch, useSelector} from "react-redux";
import { setPokemonList, setPokemonSearch, setTypes } from "./redux/pokemonSlice";
import Error from "./components/NotFound/Error";
import UpdateForm from "./components/form/UpdateForm";

function Loading() {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((dots) => (dots + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="loading-container">
      <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/029b8bd9-cb5a-41e4-9c7e-ee516face9bb/dayo3ow-7ac86c31-8b2b-4810-89f2-e6134caf1f2d.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzAyOWI4YmQ5LWNiNWEtNDFlNC05YzdlLWVlNTE2ZmFjZTliYlwvZGF5bzNvdy03YWM4NmMzMS04YjJiLTQ4MTAtODlmMi1lNjEzNGNhZjFmMmQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ooubhxjHp9PIMhVxvCFHziI6pxDAS8glXPWenUeomWs" alt="pokeball" className="loading-image" />
      <h1 className="loading-title">Loading{'.'.repeat(dots)}</h1>
    </div>
  );
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const pokemons = useSelector((state) => state.pokemon.pokedex);
  const allPokemons = useSelector((state) => state.pokemon.allPokemons);
  const types = useSelector((state) => state.pokemon.types);

  const onClickSearch = async (name) => {
    const pokeName = name.toLowerCase();
    try {
      const response = await axios(
        `http://localhost:3001/pokemon/search?name=${pokeName}`
      );
      navigate(`/detail/${response.data.id}`);
      dispatch(setPokemonSearch(allPokemons));
    } catch (error) {
      alert("Pokemon not found");
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const responsePokemons = await axios.get("http://localhost:3001/pokemon");
        const responseTypes = await axios.get("http://localhost:3001/types");
        if(types){
          dispatch(setTypes(responseTypes.data));
        }

        if (pokemons.length === 0) {
          dispatch(setPokemonList(responsePokemons.data));

        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {location.pathname !== "/" ? <NavBar onSearch={onClickSearch} /> : null}

          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/create" element={<Form />} />
            <Route path="/edit/:name" element={<UpdateForm />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
