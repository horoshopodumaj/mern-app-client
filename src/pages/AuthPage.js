import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";
import { useMessage } from "../hooks/message.hook";
import { usersAPI } from "../api/api";

const AuthPage = () => {
    const message = useMessage();
    const [type, setType] = useState(true);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
        loginDate: "",
    });

    const { login, updateIsLogin } = useContext(AuthContext);

    const changeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
            loginDate: moment().format("lll"),
        });
    };

    const loginHandler = async () => {
        setLoading(true);
        try {
            await usersAPI.login(form).then((data) => {
                login(data.token, data.userId);
                updateIsLogin(data.isLogin);
            });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            message(error.response.data.message);
        }
    };

    const preventDefault = (event) => {
        event.preventDefault();
    };

    return (
        <div className="row">
            <div className="col s12 m8 l6 offset-m2 offset-l3">
                <h1 className="txt-cnt">Таблица пользователей</h1>
                <div className="card cyan lighten-5">
                    <form onSubmit={preventDefault}>
                        <div className="card-content black-text">
                            <span className="card-title ">Войти в аккаунт</span>
                            <div>
                                <div className="input-field">
                                    <input
                                        onChange={changeHandler}
                                        id="email"
                                        type="email"
                                        name="email"
                                    />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="input-field">
                                    <input
                                        onChange={changeHandler}
                                        id="password"
                                        type={type ? "password" : "text"}
                                        name="password"
                                    />
                                    <label htmlFor="password">Password</label>
                                    <i
                                        onClick={() => setType(!type)}
                                        className="icon material-icons">
                                        {type ? "visibility" : "visibility_off"}
                                    </i>
                                </div>
                            </div>
                        </div>
                        <div className="card-action">
                            <button
                                onClick={loginHandler}
                                disabled={loading}
                                className="btn yellow lighten-4 black-text mr-10 button">
                                Войти
                            </button>
                            <Link
                                to="/registration"
                                className="btn teal accent-2 black-text button">
                                Нет аккаунта?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
