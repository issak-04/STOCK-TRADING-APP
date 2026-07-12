import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

function Home() {
  const token = localStorage.getItem("token");
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const res = await API.get("/stocks");
      setStocks(res.data.slice(0, 4));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid py-5">

        {/* Hero Section */}

        <div className="text-center">

          <h1 className="display-3 fw-bold">
            📈 SB Stocks
          </h1>

          <h3 className="mt-3">
            Practice Stock Trading with Virtual Money
          </h3>

          <p className="lead mt-3">
            Learn stock trading without risking real money.
          </p>

          {!token ? (
            <div className="mt-4">
              <Link
                to="/login"
                className="btn btn-primary btn-lg me-3"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn btn-success btn-lg"
              >
                Register
              </Link>
            </div>
          ) : (
            <>
              <h4 className="text-success mt-4">
                ✅ Welcome Back, Trader!
              </h4>

              <div className="mt-4">

                <Link
                  to="/dashboard"
                  className="btn btn-primary me-3"
                >
                  Dashboard
                </Link>

                <Link
                  to="/stocks"
                  className="btn btn-success me-3"
                >
                  Stocks
                </Link>

                <Link
                  to="/portfolio"
                  className="btn btn-warning"
                >
                  Portfolio
                </Link>

              </div>
            </>
          )}

        </div>

        {/* Featured Stocks */}

        <div className="mt-5">

          <h2 className="text-center mb-4">
            🔥 Featured Stocks
          </h2>

          <div className="row">

            {stocks.map((stock) => (

              <div className="col-lg-3 col-md-6 mb-4" key={stock._id}>

                <div className="card shadow h-100">

                  <div className="card-body text-center">

                    <h4>{stock.symbol}</h4>

                    <h6 className="text-muted">
                      {stock.companyName}
                    </h6>

                    <hr />

                    <h5 className="text-success">
                      ${stock.price}
                    </h5>

                    <p>
                      <strong>Sector:</strong> {stock.sector}
                    </p>

                    <p>
                      <strong>Available:</strong>{" "}
                      {stock.availableQuantity}
                    </p>

                    <Link
                      to="/stocks"
                      className="btn btn-primary"
                    >
                      Buy Stock
                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

          <div className="text-center mt-3">

            <Link
              to="/stocks"
              className="btn btn-outline-dark btn-lg"
            >
              View All Stocks
            </Link>

          </div>

        </div>

        {/* Features */}

        <div className="mt-5">

          <h2 className="text-center mb-5">
            Why Choose SB Stocks?
          </h2>

          <div className="row">

            <div className="col-md-3 mb-4">
              <div className="card shadow h-100 text-center">
                <div className="card-body">
                  <h1>💰</h1>
                  <h5>Virtual Trading</h5>
                  <p>
                    Practice with virtual money before investing real funds.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="card shadow h-100 text-center">
                <div className="card-body">
                  <h1>📈</h1>
                  <h5>Market Prices</h5>
                  <p>
                    View available stock prices and market sectors.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="card shadow h-100 text-center">
                <div className="card-body">
                  <h1>💼</h1>
                  <h5>Portfolio</h5>
                  <p>
                    Track your investments and manage your holdings easily.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="card shadow h-100 text-center">
                <div className="card-body">
                  <h1>🔒</h1>
                  <h5>Secure Login</h5>
                  <p>
                    JWT authentication keeps your account protected.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default Home;