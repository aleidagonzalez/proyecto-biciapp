import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.scss";
import LogoIMG from "../../img/logo.png";
export const Navbar = () => {
	const { actions, store } = useContext(Context);
	return (
		<nav className="navbar ">
			<Link to="/">
				<img className="img-logo mt-0" src={LogoIMG} />
			</Link>
			<div className="ml-auto">
				<div className="d-grid gap-2 d-md-block m-0 ">
					<Link to="/signup">
						<button type="button" className="btn btn-outline-warning font-weight-bold h1 m-2">
							Registro
						</button>
					</Link>
					{actions.getAccessToken() ? (
						<Link to="/">
							<button
								onClick={() => {
									actions.removeToken();
								}}
								className="btn btn-outline-warning font-weight-bold h1 m-2"
								type="button">
								Salir
							</button>
						</Link>
					) : (
						<Link to="/login">
							<button className="btn btn-outline-warning font-weight-bold h1 m-2" type="button">
								Entrar
							</button>
						</Link>
					)}

					<Link to="/profile">
						<button className="btn btn-outline-warning font-weight-bold h1 m-2" type="button">
							Perfil
						</button>
					</Link>
					<Link to="/activity">
						<button className="btn btn-outline-warning font-weight-bold h1 m-2" type="button">
							Actividades
						</button>
					</Link>
					<div className="container">
						{actions.isAdmin() ? (
							<p className="float-right">
								<Link to="/administ">
									<button className="btn btn-outline-warning font-weight-bold h1 m-2" type="button">
										Acceso Administrador
									</button>
								</Link>
							</p>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};
