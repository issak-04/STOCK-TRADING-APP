import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

function Transactions() {

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/transactions/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTransactions(res.data);

    } catch (error) {

      alert("Failed to load transactions");

    }

  };

  return (
    <Layout>

      <div className="container-fluid py-4">

        <h2 className="text-center mb-4">
          📜 Transaction History
        </h2>

        <div className="table-responsive">

          <table className="table table-bordered table-hover">

            <thead className="table-dark">

              <tr>
                <th>Stock</th>
                <th>Company</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Date</th>
              </tr>

            </thead>

            <tbody>

              {transactions.map((item) => (

                <tr key={item._id}>

                  <td>{item.stock?.symbol}</td>

                  <td>{item.stock?.companyName}</td>

                  <td>{item.type}</td>

                  <td>{item.quantity}</td>

                  <td>${item.price}</td>

                  <td>
                    {new Date(item.createdAt).toLocaleDateString()}
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

export default Transactions;