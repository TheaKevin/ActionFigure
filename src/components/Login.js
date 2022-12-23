import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate()
  const handleLogin = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget)
    const wronguseralert = document.getElementById('wrongusername')

    if (formData.get("email") == "user" && formData.get("password") == "user") {
      localStorage.setItem("info", "true")
      localStorage.setItem("email", formData.get("email"))
      window.location.href = "/"
    }

    else {
      wronguseralert.classList.remove("d-none");
    }
  }
  return (
    <>
      <div className="text-center">
        <h2>Login</h2>
        <h3>Action Figure</h3>
      </div>
      <div className="login-container">
        <form onSubmit={handleLogin}>
            <div id="wrongusername" class="alert alert-danger d-none" role="alert">
              Incorrect username or password.
            </div>
            <div class="input-group mb-3">
              <input type="text" class="input" name="email"/>
              <label class="placeholder">Email</label>    
            </div>

            <div class="input-group">
              <input type="password" class="input" name="password"/>
              <label class="placeholder">Password</label>    
            </div>

          <div className="my-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label ms-2" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
            </p>
            <button type="submit" className="btn btn-primary">
              Masuk
            </button>
          </div>
          <p className='or'>OR</p>
          <a href="/sign-up" className="btn btn-primary w-100">Sign up</a>
        </form>
      </div>
    </>
  )
}