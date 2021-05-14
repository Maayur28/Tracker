import React, { useState } from "react";
import "./login.css";
import { Modal } from "react-bootstrap";
import { Formik, useField } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = (props) => {
  const [passShow, setpassShow] = useState(false);
  const [show, setShow] = useState(true);
  const [errorOccur, seterrorOccur] = useState();
  const [forget, setforget] = useState(false);
  const handleClose = () => {
    setShow(false);
    props.handleLoginLaunch(false);
  };
  const launchRegister = () => {
    setShow(false);
    props.handleLoginLaunch(true);
  };
  const handleLoginStatus = (val) => {
    setShow(false);
    props.handleisLogin(val);
  };
  const launchforgetPass = () => {
    setShow(false);
    setforget(true);
  };
  const CustomInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <div className="login-inputDiv">
          <input {...field} {...props} className="login-input" />
          <i
            className={label === "Email" ? "fas fa-envelope" : "fas fa-lock"}
          ></i>
          {label === "Password" ? (
            <i
              className={
                passShow
                  ? "login-passwordEye fas fa-eye-slash"
                  : "login-passwordEye fas fa-eye"
              }
              onClick={() => setpassShow(!passShow)}
            ></i>
          ) : null}
          <label className="login-label" htmlFor={props.name}>
            {label}
          </label>
          {label !== "Password" && !meta.error && (
            <div className="text-muted emailNeverShare">
              We'll never share your email with anyone else.
            </div>
          )}
          <div className="login-inputfieldError">
            {meta.touched && meta.error ? meta.error : null}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Body>
          <i className="login-cross fas fa-times" onClick={handleClose}></i>
          <div className="login-heading">
            <img className="login-logo" src="/favilogo.png" alt="logo" />
            <h2 className="login-title">Welcome Back</h2>
          </div>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={Yup.object({
              username: Yup.string()
                .email("Invalid Email")
                .required("Please enter email"),
              password: Yup.string()
                .min(8, "Password is too short")
                .required("Please enter password"),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              seterrorOccur();
              // fetch("https://mayur28user.herokuapp.com/login", {
              fetch("http://localhost:1111/login", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
              })
                .then((response) => {
                  if (response.status >= 200 && response.status <= 299) {
                    return response.json();
                  } else {
                    return response.text().then((text) => {
                      throw new Error(text);
                    });
                  }
                })
                .then((datarec) => {
                  localStorage.setItem("x-auth-token", datarec.authToken);
                  datarec &&
                  toast.dark('Login Successful', {
                    position: "bottom-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    });
                  resetForm();
                  setSubmitting(false);
                  handleLoginStatus(true);
                })
                .catch((err) => {
                  setSubmitting(false);
                  seterrorOccur(err.message);
                });
            }}
          >
            {(formprops) => (
              <form onSubmit={formprops.handleSubmit} autoComplete="on">
                <div className="login-form">
                  <CustomInput
                    type="email"
                    name="username"
                    id="username"
                    placeholder="example@gmail.com"
                    label="Email"
                    onChange={formprops.handleChange}
                    autoComplete="on"
                  />
                  <CustomInput
                    type={passShow ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="a2b2c3d4e5"
                    label="Password"
                    onChange={formprops.handleChange}
                    autoComplete="on"
                  />
                  <div className="register-buttonDiv">
                    <Button variant="dark" type="submit" block>
                      {formprops.isSubmitting ? (
                        <span
                          style={{ marginRight: "5px" }}
                          className="spinner-grow spinner-grow-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : null}
                      Login
                    </Button>
                  </div>
                  {errorOccur ? (
                    <div
                      style={{
                        width: "88%",
                        marginTop: "10px",
                        marginLeft: "10px",
                        textAlign: "center",
                      }}
                      className="alert alert-danger"
                      role="alert"
                    >
                      {errorOccur}
                    </div>
                  ) : null}
                  <div className="login-forgetButton">
                    <button
                      type="button"
                      className="login-forget login-buttoncommon"
                      onClick={launchforgetPass}
                    >
                      Forget Password?
                    </button>
                    <button
                      type="button"
                      className="login-register login-buttoncommon"
                      onClick={launchRegister}
                    >
                      New user?<span> Register</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
      {/* {forget ? (
          <ForgetPass handleForgetlaunch={handleClose}/>
        ) : null} */}
    </>
  );
};

export default Login;
