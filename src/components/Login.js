import logo from "../assets/logo.png"
import { useState } from "react"
import axios from "axios"

export const Login = () => {
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
    <>
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
                    <a onClick={() => changeStatus()} className="btn btn-pertama w-50">
                    {isLogin ? "Sign up" : "Sign in"}
                    </a>
                  </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}