import React from "react";
import { useState } from "react";
import { UserApi } from "../../entities/user/UserApi";
import { setAccessToken } from "../../shared/lib/axiosInstance";
import UserValidator from "../../entities/user/User.validator";
import { NavLink, useNavigate } from "react-router";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Leaf } from "lucide-react";

const INITIAL_INPUTS_DATA = {
  name: "",
  email: "",
  password: "",
  isAdmin: false, // !!!!
};

export default function SignUpForm({ setUser }) {
  const [inputs, setInputs] = useState(INITIAL_INPUTS_DATA);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const { isValid, error } = UserValidator.validate(inputs);
    if (!isValid) return alert(error);
    try {
      const newUser = {
        ...inputs,
      };

      const {
        statusCode,
        data,
        error: responseError,
      } = await UserApi.register(newUser);

      if (responseError) return alert(responseError);
      if (statusCode === 200) {
        console.log(data);

        setAccessToken(data.accessToken);
        setUser(data.user);
        setInputs(INITIAL_INPUTS_DATA);
        navigate("/");
      }
    } catch (error) {
      // console.log("+==++++======++=", error);
      alert(error.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <Card
        className="shadow-lg border-0"
        style={{ maxWidth: "450px", width: "100%", borderRadius: "15px" }}
      >
        <Card.Body className="p-5">
          <div className="text-center mb-4">
            <div className="mb-2 text-accent">
              <Leaf size={40} color="#D4AF37" />
            </div>
            <h2 style={{ color: "var(--color-primary)", fontWeight: "bold" }}>
              Регистрация
            </h2>
            <p className="text-muted">Добро пожаловать в чайный клуб!</p>
          </div>

          <Form onSubmit={onSubmitHandler}>
            {/* Поле Имя */}
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "var(--color-secondary)" }}>
                Имя
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Ваше имя"
                value={inputs.name}
                onChange={onChangeHandler}
                style={{ borderColor: "var(--color-secondary)" }}
              />
            </Form.Group>

            {/* Поле Email */}
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "var(--color-secondary)" }}>
                Email
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="example@mail.ru"
                value={inputs.email}
                onChange={onChangeHandler}
                style={{ borderColor: "var(--color-secondary)" }}
              />
            </Form.Group>

            {/* Поле Пароль */}
            <Form.Group className="mb-4">
              <Form.Label style={{ color: "var(--color-secondary)" }}>
                Пароль
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="********"
                value={inputs.password}
                onChange={onChangeHandler}
                style={{ borderColor: "var(--color-secondary)" }}
              />
            </Form.Group>

            {/* {error && <div className="alert alert-danger py-2">{error}</div>} */}

            <Button
              type="submit"
              className="w-100 btn-gold py-2 mb-3 rounded-pill"
            >
              Зарегистрироваться
            </Button>
          </Form>

          <div className="text-center mt-3 pt-3 border-top">
            <span className="text-muted me-2">Уже есть аккаунт?</span>
            <NavLink
              to="/login"
              style={{
                color: "var(--color-primary)",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Войти
            </NavLink>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
