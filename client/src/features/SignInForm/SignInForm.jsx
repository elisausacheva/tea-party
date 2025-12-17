import React, { useState } from "react";

import { UserApi } from "../../entities/user/UserApi";

import { setAccessToken } from "../../shared/lib/axiosInstance";
import { useNavigate } from "react-router";
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
    <form className="signin-form" onSubmit={onSubmitHandler}>
      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Email пользователя"
          value={inputs.email}
          onChange={onChangeHandler}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Пароль пользователя"
          value={inputs.password}
          onChange={onChangeHandler}
          required
        />
      </div>
      <button type="submit">Войти</button>
    </form>
  );
}
