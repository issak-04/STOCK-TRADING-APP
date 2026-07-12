import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import API from "../services/api";

function AddStock() {
  const navigate = useNavigate();

  const [stock, setStock] = useState({
    symbol: "",
    companyName: "",
    price: "",
    availableQuantity: "",
    sector: "",
  });

  const handleChange = (e) => {
    setStock({
      ...stock,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await API.post("/stocks", stock, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message);

      navigate("/stocks");

    } catch (error) {
      alert(error.response?.data?.message || "Failed to Add Stock");
    }
  };

  return (
    <Layout>

      <div className="container py-5">

        <div className="card shadow mx-auto" style={{ maxWidth: "600px" }}>

          <div className="card-header bg-success text-white">

            <h3 className="mb-0">
              ➕ Add New Stock
            </h3>

          </div>

          <div className="card-body">

            <form onSubmit={handleSubmit}>

              <input
                className="form-control mb-3"
                placeholder="Stock Symbol"
                name="symbol"
                onChange={handleChange}
                required
              />

              <input
                className="form-control mb-3"
                placeholder="Company Name"
                name="companyName"
                onChange={handleChange}
                required
              />

              <input
                type="number"
                className="form-control mb-3"
                placeholder="Price"
                name="price"
                onChange={handleChange}
                required
              />

              <input
                type="number"
                className="form-control mb-3"
                placeholder="Available Quantity"
                name="availableQuantity"
                onChange={handleChange}
                required
              />

              <input
                className="form-control mb-3"
                placeholder="Sector"
                name="sector"
                onChange={handleChange}
                required
              />

              <button
                className="btn btn-success w-100"
              >
                Add Stock
              </button>

            </form>

          </div>

        </div>

      </div>

    </Layout>
  );
}

export default AddStock;