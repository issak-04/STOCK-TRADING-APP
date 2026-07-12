import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

function Stocks() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const res = await API.get("/stocks");
      setStocks(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load stocks");
    }
  };

  const buyStock = async (stockId) => {
    const quantity = prompt("Enter quantity to buy:");

    if (!quantity || Number(quantity) <= 0) return;

    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/orders/buy",
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

      fetchStocks();

    } catch (error) {
      alert(error.response?.data?.message || "Purchase Failed");
    }
  };

  return (
    <Layout>

      <div className="container-fluid py-4">

        <h2 className="text-center mb-4">
          📈 Available Stocks
        </h2>

        <div className="table-responsive">

          <table className="table table-hover table-bordered align-middle">

            <thead className="table-dark">
              <tr>
                <th>Symbol</th>
                <th>Company</th>
                <th>Price ($)</th>
                <th>Available</th>
                <th>Sector</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>

              {stocks.map((stock) => (
                <tr key={stock._id}>

                  <td>
                    <strong>{stock.symbol}</strong>
                  </td>

                  <td>{stock.companyName}</td>

                  <td>${stock.price}</td>

                  <td>{stock.availableQuantity}</td>

                  <td>{stock.sector}</td>

                  <td className="text-center">

                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => buyStock(stock._id)}
                    >
                      Buy
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

        {stocks.length === 0 && (
          <div className="alert alert-warning mt-3">
            No Stocks Available
          </div>
        )}

      </div>

    </Layout>
  );
}

export default Stocks;