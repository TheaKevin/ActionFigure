import logo from "../assets/logo.png"

export const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget)
    const alertWrongInput = document.getElementById('alertWrongInput')

    if (formData.get("email") == "julyus@andreas.com" && formData.get("password") == "j") {
      localStorage.setItem("info", "true")
      localStorage.setItem("email", formData.get("email"))
      window.location.href = "/"
    }

    else {
      alertWrongInput.classList.remove("d-none");
    }
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
                  <div className="input-group mb-4 mt-4">
                    <input type="email" className="input" name="email"/>
                    <label className="placeholder">Email address</label>    
                  </div>

                  <div className="input-group mb-4">
                    <input type="password" className="input" name="password"/>
                    <label className="placeholder">Password</label>    
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-pertama w-50">
                      Sign in
                    </button>
                  </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}