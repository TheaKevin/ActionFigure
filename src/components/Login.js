import logo from "../assets/logo.png"
import { useEffect, useState } from "react"
import axios from "axios"
import musicBackground from "../assets/background.mp3"

export const Login = () => {
  useEffect(() => {
    document.getElementById("backgroundMusic").play().catch((error) => {
      document.addEventListener('click', () => {
        document.getElementById("backgroundMusic").play()
      }, { once: true })
    })
    document.getElementById("backgroundMusic").volume = 0.005
  })
  const [isLogin, setIsLogin] = useState(true)
  const [lastUserID, setLastUserID] = useState(0)
  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)

    if (isLogin) {
      const alertWrongInput = document.getElementById('alertWrongInput')

      axios.get("http://localhost:3001/users?email=" + formData.get("email") + "&password=" + formData.get("password"))
      .then((response) => {
        if (response.data.length !== 0) {
          localStorage.setItem("info", "true")
          localStorage.setItem("email", formData.get("email"))
          window.location.href = "/"
        } else {
          alertWrongInput.classList.remove("d-none");
        } 
      }). catch(function (error) {
        // alert("check your internet connection", error)
      })
    } else {
      fetch("http://localhost:3001/users?_sort=id&_order=desc&_limit=1")
        .then((response) => response.json())
        .then((json) => {
          setLastUserID(json.id + 1)
        });

      axios.post('http://localhost:3001/users', {
        id: lastUserID,
        nama: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password")
      })
      .then(function (response) {
        alert("User has been requested!")
      })
      .catch(function (error) {
        alert("Sign up failed!")
      })
      setIsLogin(true)
    }

  }
  const changeStatus = () => {
    setIsLogin(!isLogin)
  }
  return (
    <div>
      <audio id="backgroundMusic" loop autoPlay>
          <source src={musicBackground} type="audio/mp3"/>
      </audio>
      <div className="login-container">
        <div className="row justify-content-center">
          <div className="wrapper p-3">
            <div className="col">
              <div className="d-flex justify-content-center">
                <div>
                  <img src={logo}></img>
                </div>
                <div>
                  <h2>Login to</h2>
                  <h3>Action Figure</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-12 d-flex justify-content-center">
              <form onSubmit={handleLogin} className="p-2">
                  <div id="alertWrongInput" className="alert alert-danger d-none" role="alert">
                    Incorrect username or password.
                  </div>

                  <div className={isLogin ? "d-none" : "" +"input-group mb-4 mt-4"}>
                    <input type="text" className="input" name="username"/>
                    <label className="placeholder">Username</label>    
                  </div>

                  <div className="input-group mb-4 mt-4">
                    <input type="email" className="input" name="email"/>
                    <label className="placeholder">Email address</label>    
                  </div>

                  <div className="input-group mb-4">
                    <input type="password" className="input" name="password"/>
                    <label className="placeholder">Password</label>    
                  </div>

                  <div className="d-flex justify-content-around">
                    <button type="submit" className="btn btn-pertama w-50">
                      {isLogin ? "Sign in" : "Sign up"}
                    </button>
                  </div>
                  <p className='pt-3 or' data-testid="OR">OR</p>
                  <div className="d-flex justify-content-around">
                    <a onClick={() => changeStatus()} className="btn btn-outline-pertama w-50">
                    {isLogin ? "Sign up" : "Sign in"}
                    </a>
                  </div>
              </form>
            </div>
          </div>
        </div>
        <div className="santa">
          <ul className="santa__hat">
            <li className="hat__pompon"></li>
            <li className="hat__crown"></li>
            <li className="hat__banding"></li>
          </ul>
          <ul className="santa__head">
            <li className="head__hair"></li>
            <li className="head__face"></li>
            <li className="head__nose"></li>
            <li className="head__left-eye"></li>
            <li className="head__right-eye"></li>
            <li className="head__left-ear"></li>
            <li className="head__right-ear"></li>
            <li className="head__left-cheek"></li>
            <li className="head__right-cheek"></li>
            <li className="head__mustache">
              <ul className="mustache-wrap">
                <li className="mustache__top-left"></li>
                <li className="mustache__top-right"></li>
                <li className="mustache__left"></li>
                <li className="mustache__right"></li>
                <li className="mustache__bottom-left"></li>
                <li className="mustache__bottom-right"></li>
              </ul>
            </li>
          </ul>
          <ul className="santa__body">
            <li className="body__clothes"></li>
          </ul>
        </div>
      </div>
      <div className="snowflake">
          ❅
      </div>
      <div className="snowflake">
        ❅
      </div>
      <div className="snowflake">
        ❆
      </div>
      <div className="snowflake">
        ❄
      </div>
      <div className="snowflake">
        ❅
      </div>
      <div className="snowflake">
        ❆
      </div>
      <div className="snowflake">
        ❄
      </div>
      <div className="snowflake">
        ❅
      </div>
      <div className="snowflake">
        ❆
      </div>
      <div className="snowflake">
        ❄
      </div>
    </div>
  )
}