import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/users/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <Layout>

      <div
        className="container py-5"
        style={{ maxWidth: "450px" }}
      >

        <div className="card shadow">

          <div className="card-body">

            <h2 className="text-center mb-4">
              Login
            </h2>

            <form onSubmit={handleSubmit}>

              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                required
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                required
              />

              <button
                className="btn btn-primary w-100"
              >
                Login
              </button>

            </form>

          </div>

        </div>

      </div>

    </Layout>
  );
}

export default Login;