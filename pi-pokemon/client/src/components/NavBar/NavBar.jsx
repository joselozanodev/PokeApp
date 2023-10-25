import React from 'react'
import { Link } from 'react-router-dom'
import searchSVG from '../../assets/search-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { setPokemonSearch, setCurrentPage } from '../../redux/pokemonSlice'
import { useState } from 'react'
import './navbar.css'

const NavBar = ({onSearch}) => {
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const allPokemons = useSelector((state)=> state.pokemon.allPokemons)

    const handleLiveSearch = ({ target }) => {
        const searchValue = target.value.trim().toLowerCase();
        setName(searchValue);

        let filteredPokemons = [];

        if (searchValue === "") {
            filteredPokemons = allPokemons;
        } else {
            filteredPokemons = allPokemons.filter((pokemon) =>
                pokemon.pokemonName.toLowerCase().startsWith(searchValue)
            );
        }

        dispatch(setPokemonSearch(filteredPokemons));
        dispatch(setCurrentPage(1));
    };

  return (
    <>
        <div className='nav-container'>
            <Link to={"/"} className='pokeapp-landing'><h1 id='nav-title'>PokeApp</h1></Link>
            <div className='links'>
                <Link to={'/home'} className='link'>Home</Link>
                <Link to={'/create'} className='link'>Create</Link>
            </div>
            <div className='searchBar'>
                <input 
                type='text' 
                placeholder='Search Pokemon'
                name={name}
                value={name}
                onChange={handleLiveSearch}
                />
                <button className='search-btn' onClick={()=>{onSearch(name), setName('')}}><img src={searchSVG} alt="Search Button" className='search-svg' /></button>
            </div>
        </div>

    </>
  )
}

export default NavBar
