import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/portfolio", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPortfolio(res.data);
    } catch (error) {
      alert("Failed to load portfolio");
    }
  };

  const sellStock = async (stockId) => {
    const quantity = prompt("Enter quantity to sell");

    if (!quantity || Number(quantity) <= 0) return;

    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/orders/sell",
        {
          stockId,
          quantity: Number(quantity),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      fetchPortfolio();

    } catch (error) {
      alert(error.response?.data?.message || "Sell Failed");
    }
  };

  return (
    <Layout>

      <div className="container-fluid py-4">

        <h2 className="text-center mb-4">
          💼 My Portfolio
        </h2>

        <div className="table-responsive">

          <table className="table table-hover table-bordered">

            <thead className="table-dark">

              <tr>
                <th>Symbol</th>
                <th>Company</th>
                <th>Quantity</th>
                <th>Avg Price</th>
                <th>Current Price</th>
                <th>Sector</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {portfolio.map((item) => (

                <tr key={item._id}>

                  <td>{item.stock?.symbol}</td>

                  <td>{item.stock?.companyName}</td>

                  <td>{item.quantity}</td>

                  <td>${item.averagePrice.toFixed(2)}</td>

                  <td>${item.stock?.price}</td>

                  <td>{item.stock?.sector}</td>

                  <td>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => sellStock(item.stock._id)}
                    >
                      Sell
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </Layout>
  );
}

export default Portfolio;