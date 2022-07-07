/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";

// class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.btnLogin = React.createRef();
//   }

//   render() {
//     return (
//       <div>
//         <h1>Hello from Login</h1>
//       </div>
//     );
//   }
// }

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleLogin = () => {
    console.log("Username: ", username);
    console.log("Password: ", password);
  };

  const handleTogglePassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-content row">
          <div className="col-12 login-text">Login</div>
          <div className="col-12 form-group login-input">
            <label className="">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your username"
              value={username}
              spellCheck={false}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="col-12 form-group  login-input">
            <label className="">Password</label>
            <div className="password-group">
              <input
                type={isShowPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={() => handleTogglePassword()}>
                <i
                  class={isShowPassword ? "far fa-eye" : "far fa-eye-slash"}
                ></i>
              </span>
            </div>
          </div>
          <div className="col-12 ">
            <button className="btn-login" onClick={() => handleLogin()}>
              Login
            </button>
          </div>
          <div className="col-12 ">
            <span className="forgot-password">
              Forgot Password your password?
            </span>
          </div>

          <div className="col-12 text-center mt-5">
            <span className="text-other-login">Or Login with:</span>
          </div>

          <div className="col-12 social-login">
            <a href="" className="">
              <i className="fab fa-google-plus-g icon-google"></i>
            </a>
            <a href="" className="">
              <i className="fab fa-facebook-f icon-facebook"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// REDUX
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
