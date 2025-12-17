import React, { useState } from "react";
import { useNavigate } from "react-router";
import { setAccessToken } from "../../shared/lib/axiosInstance";
import UserValidator from "../../entities/user/User.validator";
import { UserApi } from "../../entities/user/UserApi";



const INITIAL_INPUTS_DATA = {
  name: "",
  email: "",
  password: "",
  isAdmin: true,
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
        navigate("/posts");
      }
    } catch (error) {
      console.log("+==++++======++=", error);
      alert(error.message);
    }
  };

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={onSubmitHandler}>
        <h2>Регистрация</h2>


        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Имя пользователя"
            autoFocus
            onChange={onChangeHandler}
            value={inputs.name}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={onChangeHandler}
            value={inputs.email}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            onChange={onChangeHandler}
            value={inputs.password}
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-btn">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}
