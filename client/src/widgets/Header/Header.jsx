import React from 'react'
import { NavLink, useNavigate } from "react-router";
import { setAccessToken } from "../../shared/lib/axiosInstance";
import { UserApi } from "../../entities/user/UserApi";
import './Header.css'

export default function Header({ user, setUser }) {
  const navigate = useNavigate();


  const handleLogOut = async () => {
    try {
      const response = await UserApi.logOut();
      if (response.statusCode === 200) {
        setUser({});
        setAccessToken("");
        navigate("/");
      }
    } catch (error) {
      alert(error.message || "Ошибка при выходе");
    }
  };


  const handleDelete = async () => {
    try {
      await UserApi.delete(user.id)
      handleLogOut();
    } catch (error) {
      console.log(error)
      alert(error.message || "Ошибка при elfktybb");
    }
  }

  

  return (
    <div>
      <>
        {user.name ? (
          <>
            <NavLink
              to="/auth"
              className={({ isActive }) =>
                `auth-link ${isActive ? "auth-link_active" : ""}`
              }
            >
              {`Привет,  ${user.name}!`}
            </NavLink>

            <NavLink
              to="/alletest"
              className={({ isActive }) =>
                `auth-link ${isActive ? "auth-link_active" : ""}`
              }
            >
              <button>Пользователu</button>
            </NavLink>

            <button onClick={handleLogOut}>Выход</button>

            <button onClick={handleDelete}>удалить аккаунт</button>
            <NavLink
              to="/posts"
              className={({ isActive }) =>
                `auth-link ${isActive ? "auth-link_active" : ""}`
              }
            >
              <button> ВСЕ POSTы</button>
            </NavLink>
            <NavLink
              to="/post"
              className={({ isActive }) =>
                `auth-link ${isActive ? "auth-link_active" : ""}`
              }
            >
              <button> МОИ POSTы</button>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `auth-link ${isActive ? "auth-link_active" : ""}`
              }
            >
              <button>Зарегистрироваться</button>
            </NavLink>

            <NavLink
              to="/login"
              className={({ isActive }) =>
                `auth-link ${isActive ? "auth-link_active" : ""}`
              }
            >
              <button>Вход</button>
            </NavLink>

            <NavLink
              to="/auth"
              className={({ isActive }) =>
                `auth-link ${isActive ? "auth-link_active" : ""}`
              }
            >
              Привет, Красавчик!
            </NavLink>
          </>
        )}
      </>
    </div>
  );  
  }
  
  




