import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from "reactstrap";
import classnames from "classnames";
import "../../styles/profile.scss";

export const Profile = () => {
	// const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const [bike, setBike] = useState(null);
	const [bikes, setBikes] = useState(null);
	const [name, setName] = useState(null);
	const [bType, setBType] = useState(null);
	const [gears, setGears] = useState(null);
	const [wheelInches, setWheelInches] = useState(null);
	const { actions } = useContext(Context);
	const [message, setMessage] = useState("");
	const [messageBike, setMessageBike] = useState("");

	const [activeTab, setActiveTab] = useState("1");
	const toggle = tab => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	const history = useHistory();

	useEffect(() => {
		let accessToken = actions.getAccessToken();
		if (!accessToken) {
			history.push("/login");
			return;
		}
		fetch(process.env.BACKEND_URL + "/api/profile", {
			method: "GET",
			headers: {
				"content-Type": "application/json",
				Authorization: "Bearer " + actions.getAccessToken()
			}
		})
			.then(response => response.json())
			.then(responseJson => setUser(responseJson));

		fetch(process.env.BACKEND_URL + "/api/user/bikes/", {
			method: "GET",
			headers: {
				"content-Type": "application/json",
				Authorization: "Bearer " + actions.getAccessToken()
			}
		})
			.then(response => response.json())
			.then(responseJson => setBike(responseJson));
	}, []);

	function update(event) {
		event.preventDefault();
		fetch(process.env.BACKEND_URL + "/api/profile", {
			method: "PUT",
			headers: {
				"content-Type": "application/json",
				Authorization: "Bearer " + actions.getAccessToken()
			},
			body: JSON.stringify(user)
		})
			.then(response => response.json())
			.then(responseJson => setUser(responseJson));

		setMessage("Perfil guardado correctamente!");
	}

	function bikeUpdate(event) {
		event.preventDefault();
		fetch(process.env.BACKEND_URL + "/api/new_bike", {
			method: "POST",
			headers: {
				"content-Type": "application/json",
				Authorization: "Bearer " + actions.getAccessToken()
			},
			body: JSON.stringify({
				b_type: bType,
				name: name,
				wheel_inches: wheelInches,
				gears: gears
			})
		})
			.then(response => {
				if (response.status == 200) {
					return response.json();
				} else {
					throw Error("No se ha guardado");
				}
			})
			.then(responseJson => {
				setBike(responseJson);
				setMessageBike("Bici guardada correctamente!");
			})
			.catch(error => setMessage(error.message));
	}

	if (!user) {
		return <h1>Loading user....</h1>;
	}
	if (!bike) {
		return <h1>Loading bikes....</h1>;
	}

	return (
		<>
			<Nav tabs>
				<NavItem>
					<NavLink
						className={classnames({ active: activeTab === "1" })}
						onClick={() => {
							toggle("1");
						}}>
						Tab1
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						className={classnames({ active: activeTab === "2" })}
						onClick={() => {
							toggle("2");
						}}>
						More Tabs
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						className={classnames({ active: activeTab === "3" })}
						onClick={() => {
							toggle("3");
						}}>
						More Tabs
					</NavLink>
				</NavItem>
			</Nav>
			<TabContent activeTab={activeTab}>
				<TabPane tabId="1">
					<Row>
						<Col sm="12">
							<h4>Tab 1 Contents</h4>
							{/* aqui pegar codigo contenido profile */}
						</Col>
					</Row>
				</TabPane>
				<TabPane tabId="2">
					<Row>
						<Col sm="12">aqui va el contenido 2</Col>
					</Row>
				</TabPane>
				<TabPane tabId="3">
					<Row>
						<Col sm="12">aqui va el contenido 3</Col>
					</Row>
				</TabPane>
			</TabContent>
			<div id="backgrd" className="content-center ">
				<div className="profile_body container-fluid row " width="100%">
					<div className="container py-4">
						<div className="row justify-content-center">
							<div className="card col-md-10 col-md-6 pt-2">
								<div className="card-header h4">
									<ul className="nav nav-tabs card-heather-tabs">
										<li className="nav-item active">
											<a className="nav-link h4" aria-current="page" href="#profile">
												Perfil
											</a>
										</li>
										<li className="nav-item">
											<a className="nav-link h-4" href="#bikeAdd">
												Añadir bici
											</a>
										</li>
										<li className="nav-item">
											<a className="nav-link" href="#allBikes">
												Tus bicis
											</a>
										</li>
									</ul>
								</div>
								<div className="card-body tab-content ">
									<div id="profile" className="tab-pane active">
										<div className="card-header  h4">Perfil de usuario</div>
										<div className="card-body ">
											{message ? <h5>{message}</h5> : ""}
											<form className="row g-3 ">
												<div className="col-6">
													<label htmlFor="inputEmail4" className="form-label">
														Email
													</label>
													<input
														type="email"
														className="form-control"
														id="inputEmail4"
														defaultValue={user.email}
														onChange={event => {
															setUser({ ...user, email: event.target.value });
														}}
													/>
												</div>
												<div className="col-6">
													<label htmlFor="inputPassword4" className="form-label">
														Contraseña
													</label>
													<input
														type="password"
														className="form-control"
														id="inputPassword4"
														defaultValue={user.password}
														onChange={event => {
															setUser({ ...user, password: event.target.value });
														}}
													/>
												</div>
												<div className="col-6">
													<label className="form-label">Nombre</label>
													<input
														type="text"
														className="form-control"
														placeholder="Nombre"
														aria-label="First name"
														defaultValue={user.name}
														onChange={event => {
															setUser({ ...user, name: event.target.value });
														}}
													/>
												</div>
												<div className="col-6">
													<label className="form-label">Apellidos</label>
													<input
														type="text"
														className="form-control"
														placeholder="Apellidos"
														aria-label="Last name"
														defaultValue={user.surname}
														onChange={event => {
															setUser({ ...user, surname: event.target.value });
														}}
													/>
												</div>
												<div className="col-6">
													<label className="form-label">Usuario</label>
													<input
														type="text"
														className="form-control"
														placeholder="Nombre a mostrar"
														aria-label="First name"
														defaultValue={user.nick_name}
														onChange={event => {
															setUser({ ...user, nick_name: event.target.value });
														}}
													/>
												</div>
												<div className="col-6">
													<label className="form-label">Edad</label>
													<input
														type="text"
														className="form-control"
														placeholder="edad"
														aria-label="First name"
														defaultValue={user.age}
														onChange={event => {
															setUser({ ...user, age: event.target.value });
														}}
													/>
												</div>
												<div className="col-6">
													<label htmlFor="inputAddress" className="form-label">
														dirección
													</label>
													<input
														type="text"
														className="form-control"
														id="inputAddress"
														placeholder="Calle , num"
														defaultValue={user.address1}
														onChange={event => {
															setUser({ ...user, address1: event.target.value });
														}}
													/>
												</div>
												<div className="col-6">
													<label htmlFor="inputAddress" className="form-label">
														detalles de dirección
													</label>
													<input
														type="text"
														className="form-control"
														id="inputAddress"
														placeholder="piso, escalera, puerta"
														defaultValue={user.address2}
														onChange={event => {
															setUser({ ...user, address2: event.target.value });
														}}
													/>
												</div>
												<div className="col-6">
													<label htmlFor="inputCity" className="form-label">
														Ciudad
													</label>
													<input
														type="text"
														className="form-control"
														id="inputCity"
														defaultValue={user.city}
														onChange={event => {
															setUser({ ...user, city: event.target.value });
														}}
													/>
												</div>
												<div className="col-6">
													<label htmlFor="inputZip" className="form-label">
														Codigo postal
													</label>
													<input
														type="text"
														className="form-control"
														id="inputZip"
														defaultValue={user.postal_code}
														onChange={event => {
															setUser({ ...user, postal_code: event.target.value });
														}}
													/>
												</div>
												<div className="col-12">
													<button
														type="submit"
														className="btn btn-primary m-2"
														onClick={update}>
														Guardar datos
													</button>
													{"  "}
													<button type="submit" className="btn btn-primary">
														Borrar
													</button>
												</div>
											</form>
										</div>
									</div>
									<div id="bikeAdd" className="tab-pane">
										<div className="card-header h4">Añadir una bici</div>
										<div className="card-body py-5">
											{messageBike ? <h5>{messageBike}</h5> : ""}
											<form className=" row g-3  col-md-10 " id="bikes">
												<div className="col-md-6">
													<label htmlFor="b_type" className="form-label">
														Tipo de bici
													</label>
													<select
														type="text"
														placeholder="seleccionar tipo de bici"
														className="form-control "
														defaultValue={bike ? bike.b_type : ""}
														onChange={event => {
															setBType(event.target.value);
														}}>
														<option value="sin seleccionar">escoger una opción </option>
														<option value="MTB">MTB</option>
														<option value="Carretera">Carretera</option>
														<option value="paseo">paseo</option>
													</select>
												</div>
												<div className="col-md-6">
													<label className="form-label">Nombre de la bici</label>
													<input
														type="text"
														className="form-control"
														placeholder="Nombre"
														aria-label="First name"
														defaultValue={bike.name}
														onChange={event => {
															setName(event.target.value);
														}}
													/>
												</div>
												<div className="col-md-6">
													<label htmlFor="wheel_inches" className="form-label">
														diametro de rueda
													</label>
													<select
														type="text"
														placeholder="diametro de rueda"
														className="form-control"
														defaultValue={bike ? bike.wheel_inches : ""}
														onChange={event => {
															setWheelInches(event.target.value);
														}}>
														<option value="sin seleccionar">escoger una opción </option>
														<option value="28+">28 pulgadas o más</option>
														<option value="20-27">20 a 27 pulgadas</option>
														<option value="19-">menos de 20 pulgadas</option>
													</select>
												</div>
												<div className="col-md-6">
													<label htmlFor="gears" className="form-label">
														marchas
													</label>
													<select
														type="text"
														placeholder="marchas de la bici"
														className="form-control"
														defaultValue={bike ? bike.gears : ""}
														onChange={event => {
															setGears(event.target.value);
														}}>
														<option value="sin seleccionar">escoger una opción </option>
														<option value="30+">30 marchas o mas</option>
														<option value="15+">15 a 29 marchas</option>
														<option value="-15">menos de 15 marchas</option>
													</select>
												</div>
												<div className="col-12 m-2">
													<button
														type="submit"
														className="btn btn-primary"
														onClick={bikeUpdate}>
														Guardar bici
													</button>
													{"  "}
													<button type="submit" className="btn btn-primary">
														Borrar
													</button>
												</div>
											</form>
										</div>
									</div>
									<div id="allBikes" className="tab-pane">
										<div className="card-header h4">Mis bicicletas</div>
										<div className="card-body py-5">
											{messageBike ? <h5>{messageBike}</h5> : ""}
											<form className=" row g-3  col-md-10 " id="bikes">
												<div className="col-md-6">
													<label htmlFor="b_type" className="form-label">
														Tipo de bici
													</label>
													<select
														type="text"
														placeholder="seleccionar tipo de bici"
														className="form-control "
														defaultValue={bike ? bike.b_type : ""}
														onChange={event => {
															setBType(event.target.value);
														}}>
														<option value="sin seleccionar">escoger una opción </option>
														<option value="MTB">MTB</option>
														<option value="Carretera">Carretera</option>
														<option value="paseo">paseo</option>
													</select>
												</div>
												<div className="col-md-6">
													<label className="form-label">Le has puesto nombre?</label>
													<input
														type="text"
														className="form-control"
														placeholder="Nombre"
														aria-label="First name"
														defaultValue={bike.name}
														onChange={event => {
															setName(event.target.value);
														}}
													/>
												</div>
												<div className="col-md-6">
													<label htmlFor="wheel_inches" className="form-label">
														diametro de rueda
													</label>
													<select
														type="text"
														placeholder="diametro de rueda"
														className="form-control"
														defaultValue={bike ? bike.wheel_inches : ""}
														onChange={event => {
															setWheelInches(event.target.value);
														}}>
														<option value="sin seleccionar">escoger una opción </option>
														<option value="28+">28 pulgadas o más</option>
														<option value="20-27">20 a 27 pulgadas</option>
														<option value="19-">menos de 20 pulgadas</option>
													</select>
												</div>
												<div className="col-md-6">
													<label htmlFor="gears" className="form-label">
														marchas
													</label>
													<select
														type="text"
														placeholder="marchas de la bici"
														className="form-control"
														defaultValue={bike ? bike.gears : ""}
														onChange={event => {
															setGears(event.target.value);
														}}>
														<option value="sin seleccionar">escoger una opción </option>
														<option value="30+">30 marchas o mas</option>
														<option value="15+">15 a 29 marchas</option>
														<option value="-15">menos de 15 marchas</option>
													</select>
												</div>
												<div className="col-12 m-2">
													<button
														type="submit"
														className="btn btn-primary"
														onClick={bikeUpdate}>
														home
													</button>
													{"  "}
													<button type="submit" className="btn btn-primary">
														Borrar
													</button>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
				<Tab eventKey="home" title="Home">
					<Sonnet />
				</Tab>
				<Tab eventKey="profile" title="Profile">
					<Sonnet />
				</Tab>
				<Tab eventKey="contact" title="Contact" disabled>
					<Sonnet />
				</Tab>
			</Tabs> */}
		</>
	);
};
