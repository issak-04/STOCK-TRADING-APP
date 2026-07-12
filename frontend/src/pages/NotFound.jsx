import { Link } from "react-router-dom";
import Layout from "../components/Layout";

function NotFound() {
  return (
    <Layout>

      <div className="container text-center py-5">

        <h1 className="display-1">
          404
        </h1>

        <h3>
          Page Not Found
        </h3>

        <Link
          to="/"
          className="btn btn-primary mt-4"
        >
          Go Home
        </Link>

      </div>

    </Layout>
  );
}

export default NotFound;