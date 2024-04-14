import './Navbar.css';
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
} from 'react-icons/bs';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { logout, reset } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate('/login');
  };
  return (
    <nav id="nav">
      <Link to="/">ReactGram</Link>
      <form id="search-form">
        <BsSearch />
        <input type="text" placeholder="Pesquisar..." />
      </form>
      <ul id="nav-links">
        {auth ? (
          <>
            {user && (
              <li>
                <li>
                  <NavLink to={`/user/${user._id}`}>
                    <BsFillCameraFill />
                  </NavLink>
                </li>
              </li>
            )}
            <li>
              <NavLink to="/">
                <BsHouseDoorFill />
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile">
                <BsFillPersonFill />
              </NavLink>
            </li>
            <li>
              <span role="button" onClick={handleLogout}>
                Sair
              </span>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/register">Cadastrar</NavLink>
            </li>
            <li>
              <NavLink to="/login">Entrar</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
