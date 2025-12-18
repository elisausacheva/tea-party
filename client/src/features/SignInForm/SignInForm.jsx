import React, { useState } from "react";
import { Container, Card, Form, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from "react-router";
import { UserApi } from "../../entities/user/UserApi";
import { setAccessToken } from "../../shared/lib/axiosInstance";
import { Leaf } from 'lucide-react';
// import "./SignInForm.css";

const INITIAL_INPUTS_DATA = {
  email: "",
  password: "",
};

export default function SignInForm({ setUser }) {
  const [inputs, setInputs] = useState(INITIAL_INPUTS_DATA);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await UserApi.login(inputs);
      console.log(response);

      if (response.error) return alert(response.error);

      if (response.statusCode === 200) {
        console.log(response.data.accessToken, response.data.accessToken);
        setUser(response.data.user);
        setAccessToken(response.data.accessToken);

        setInputs(INITIAL_INPUTS_DATA);
        navigate("/posts");
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card className="shadow-lg border-0" style={{ maxWidth: '450px', width: '100%', borderRadius: '15px' }}>
        <Card.Body className="p-5">
          
          {/* Заголовок */}
          <div className="text-center mb-4">
            <div className="mb-2 text-accent">
                {/* Золотой листик */}
                <Leaf size={40} color="#D4AF37" />
            </div>
            <h2 style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>Вход</h2>
            <p className="text-muted">С возвращением!</p>
          </div>

          <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: 'var(--color-secondary)' }}>Email</Form.Label>
              <Form.Control 
                type="email" 
                name="email"
                placeholder="example@mail.ru"
                value={inputs.email}
                onChange={onChangeHandler}
                required
                style={{ borderColor: 'var(--color-secondary)' }}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label style={{ color: 'var(--color-secondary)' }}>Пароль</Form.Label>
              <Form.Control 
                type="password" 
                name="password"
                placeholder="********"
                value={inputs.password}
                onChange={onChangeHandler}
                required
                style={{ borderColor: 'var(--color-secondary)' }}
              />
            </Form.Group>

            {/* {error && <div className="alert alert-danger py-2">{error}</div>} */}

            {/* Золотая кнопка с твоим классом */}
            <Button 
              type="submit" 
              className="w-100 btn-gold py-2 mb-3 rounded-pill"
            >
              Войти
            </Button>
          </Form>

          {/* Ссылка на регистрацию */}
          <div className="text-center mt-3 pt-3 border-top">
            <span className="text-muted me-2">Нет аккаунта?</span>
            <NavLink 
              to="/register" 
              style={{ color: 'var(--color-primary)', fontWeight: 'bold', textDecoration: 'none' }}
            >
              Создать аккаунт
            </NavLink>
          </div>

        </Card.Body>
      </Card>
    </Container>
  );
}
