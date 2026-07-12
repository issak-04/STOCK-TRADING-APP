import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      const res = await API.post("/users/register", formData);

      alert(res.data.message);

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <Layout>

      <div className="container py-5">

        <div
          className="card shadow mx-auto"
          style={{ maxWidth: "450px" }}
        >

          <div className="card-body">

            <h2 className="text-center mb-4">
              Register
            </h2>

            <form onSubmit={handleSubmit}>

              <input
                className="form-control mb-3"
                placeholder="Full Name"
                name="name"
                onChange={handleChange}
                required
              />

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
                className="btn btn-success w-100"
              >
                Register
              </button>

            </form>

          </div>

        </div>

      </div>

    </Layout>
  );
}

export default Register;