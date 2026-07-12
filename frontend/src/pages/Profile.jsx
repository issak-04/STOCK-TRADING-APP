import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

function Profile() {

  const [user, setUser] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);

    } catch (error) {

      alert("Failed to load profile");

    }

  };

  return (
    <Layout>

      <div className="container py-5">

        <div
          className="card shadow mx-auto"
          style={{ maxWidth: "600px" }}
        >

          <div className="card-header bg-primary text-white">

            <h3 className="mb-0">
              👤 My Profile
            </h3>

          </div>

          <div className="card-body">

            <p><strong>Name:</strong> {user.name}</p>

            <p><strong>Email:</strong> {user.email}</p>

            <p><strong>Role:</strong> {user.role}</p>

            <p><strong>Balance:</strong> ${user.balance}</p>

          </div>

        </div>

      </div>

    </Layout>
  );
}

export default Profile;