import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
    const { logout, isAuth } = useContext(AuthContext);
    return (
        <nav className="light-blue">
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo ml-15">
                    TaskF
                </Link>
                {isAuth ? (
                    <ul id="nav-mobile" className="right">
                        <li>
                            <Link to="/" onClick={logout}>
                                Log out
                            </Link>
                        </li>
                    </ul>
                ) : (
                    <ul id="nav-mobile" className="right">
                        <li>
                            <Link to="/">Войти</Link>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Header;
