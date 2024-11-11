import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Alchemy, Network } from "alchemy-sdk";
import "./Home.css"; // Pridajte CSS štýly pre vzhľad
import Loading from "../src/Loading.js";
import logo from "../src/assets/ethereum_logo.png";
import {
  FaArrowLeft,
  FaHashtag,
  FaFingerprint,
  FaCalendarAlt
} from "react-icons/fa";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function AddressDetails() {
  const { address } = useParams();
  const [balance, setBalance] = useState("");
  const [transactionCount, setTransactionCount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAddressData() {
      try {
        const balance = await alchemy.core.getBalance(address);
        const txCount = await alchemy.core.getTransactionCount(address);
        
        setBalance(balance / 1e18 + " ETH"); // Konverzia na ETH
        setTransactionCount(txCount);
      } catch (error) {
        setError("Failed to fetch address data.");
        console.error("Error fetching address data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAddressData();
  }, [address]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="home">
      <div className="dashboard">
        <div className="header">
          <Link to="/" className="title-link">
            <h1 className="title">Ethereum Insider</h1>
          </Link>
          <Link to="/" className="title-link">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
        </div>
        <p className="subtitle">The Ethereum Blockchain Explorer</p>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Link to="/" className="back-link">
              <FaArrowLeft /> Back to home
            </Link>

            <h2>Address Details</h2>
        <div className="dashboard-content">
          {/* Block Information Group */}
          <div className="dashboard-group">
            <div className="dashboard-item">
              <FaHashtag className="icon" />
              <p>
                Address: <span id="block-number-value">{address}</span>
              </p>
            </div>
            <div className="dashboard-item">
              <FaCalendarAlt className="icon" />
              <p>
              Balance:{" "}
                <span id="current-block-timestamp-value">
                  {balance}
                </span>
              </p>
            </div>
            <div className="dashboard-item">
              <FaFingerprint className="icon" />
              <p>
                Transaction Count: <span id="block-hash-value">{transactionCount}</span>
              </p>
            </div>
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AddressDetails;
