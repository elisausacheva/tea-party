import React from "react";
import { Navbar, Container, Nav, Button, Dropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router"; // Обрати внимание: react-router-dom обычно, но у тебя react-router
import { UserApi } from "../../entities/user/UserApi";
import { setAccessToken } from "../../shared/lib/axiosInstance";
import { Coffee, LogIn, LogOut, User, Trash2, Leaf } from "lucide-react"; // Иконки

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
      console.error(error); // Лучше в консоль, чем алерт
    }
  };

  // const handleDelete = async () => {
  //   if(!window.confirm("Точно удалить аккаунт?")) return;
  //   try {
  //     await UserApi.delete(user.id);
  //     handleLogOut();
  //   } catch (error) {
  //     alert(error.message || "Ошибка при удалении");
  //   }
  // };

  return (
    <Navbar
      expand="lg"
      className="bg-primary-custom navbar-dark shadow-sm py-3"
    >
      <Container>
        <Navbar.Brand
          as={NavLink}
          to="/"
          className="d-flex align-items-center gap-2 text-accent fw-bold fs-4"
        >
          <Coffee size={28} /> TeaParty
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/alletest" className="text-light">
              Юзеры
            </Nav.Link>
          </Nav> */}

          <Nav className="ms-auto d-flex align-items-center gap-3">
            <Nav.Link as={NavLink} to="/teas" className="text-accent">
              <Leaf size={18} /> Все чаи
            </Nav.Link>
            {user.email ? (
              <>
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="outline-light"
                    id="dropdown-basic"
                    className="d-flex align-items-center gap-2 border-0"
                  >
                    <User size={20} />
                    <span>{user.name}</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={handleLogOut}
                      className="d-flex align-items-center gap-2"
                    >
                      <LogOut size={16} /> Выйти
                    </Dropdown.Item>
                    {/* <Dropdown.Divider />
                    <Dropdown.Item onClick={handleDelete} className="text-danger d-flex align-items-center gap-2">
                      <Trash2 size={16} /> Удалить аккаунт
                    </Dropdown.Item> */}
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              /* Кнопки для гостей */
              <div className="d-flex gap-3">
                <NavLink to="/login">
                  <Button className="btn-gold text-white rounded-pill px-4">
                    <LogIn size={18} /> Войти
                  </Button>
                </NavLink>
                <NavLink to="/register">
                  <Button className="btn-gold text-white rounded-pill px-4">
                    Регистрация
                  </Button>
                </NavLink>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
