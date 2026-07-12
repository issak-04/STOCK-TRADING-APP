import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import API from "../services/api";

function Dashboard() {
  const [profile, setProfile] = useState({});
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const profileRes = await API.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const transactionRes = await API.get("/transactions/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(profileRes.data);
      setTransactions(transactionRes.data);

    } catch (error) {
      console.log(error);
    }
  };

  const portfolioValue = transactions.reduce(
    (total, item) => total + item.price,
    0
  );

  return (
    <Layout>

      <div className="container-fluid py-4">

        <h2 className="text-center mb-5">
          📊 Dashboard
        </h2>

        <div className="row g-4">

          <div className="col-lg-3 col-md-6">
            <div className="card shadow text-center h-100">
              <div className="card-body">
                <h5>💰 Wallet Balance</h5>
                <h2 className="text-primary">
                  ${profile.balance || 0}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card shadow text-center h-100">
              <div className="card-body">
                <h5>💼 Portfolio Value</h5>
                <h2 className="text-success">
                  ${portfolioValue}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card shadow text-center h-100">
              <div className="card-body">
                <h5>📦 Stocks Bought</h5>
                <h2 className="text-warning">
                  {transactions.length}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card shadow text-center h-100">
              <div className="card-body">
                <h5>📜 Transactions</h5>
                <h2 className="text-danger">
                  {transactions.length}
                </h2>
              </div>
            </div>
          </div>

        </div>

        <div className="text-center mt-5">

          <Link
            to="/stocks"
            className="btn btn-primary me-3"
          >
            View Stocks
          </Link>

          <Link
            to="/portfolio"
            className="btn btn-success me-3"
          >
            Portfolio
          </Link>

          <Link
            to="/transactions"
            className="btn btn-warning"
          >
            Transactions
          </Link>

        </div>

        <div className="mt-5">

          <h3>Recent Activity</h3>

          {transactions.length === 0 ? (
            <div className="alert alert-info">
              No transactions available.
            </div>
          ) : (
            <table className="table table-bordered table-hover mt-3">

              <thead className="table-dark">
                <tr>
                  <th>Stock</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>

              <tbody>

                {transactions.slice(0, 5).map((item) => (
                  <tr key={item._id}>
                    <td>{item.stock?.symbol}</td>
                    <td>{item.type}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                  </tr>
                ))}

              </tbody>

            </table>
          )}

        </div>

      </div>

    </Layout>
  );
}

export default Dashboard;