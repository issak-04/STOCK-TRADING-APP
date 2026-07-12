import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");



  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged Out Successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid px-4">

        <Link className="navbar-brand" to="/">
          📈 SB Stocks
        </Link>

        <div className="navbar-nav ms-auto">

          <Link className="nav-link" to="/">
            Home
          </Link>

          {token && (
            <>
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>

              {role === "admin" && (
               <Link className="nav-link" to="/add-stock">
                 Add Stock
              </Link>
            )}

              <Link className="nav-link" to="/stocks">
                Stocks
              </Link>

              <Link className="nav-link" to="/portfolio">
                Portfolio
              </Link>

              <Link className="nav-link" to="/transactions">
                Transactions
              </Link>

              <Link className="nav-link" to="/profile">
                Profile
              </Link>

              <button
                className="btn btn-danger ms-3"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}

          {!token && (
            <>
              <Link className="nav-link" to="/login">
                Login
              </Link>

              <Link className="nav-link" to="/register">
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;