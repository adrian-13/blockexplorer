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
    document.title = 'Ethereum Insider';
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

  return (import { Alchemy, Network, Utils } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./Home.css";
import logo from "../src/assets/ethereum_logo.png";
import Loading from "../src/Loading.js";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function TransactionDetails() {
  const { transactionHash } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTransactionDetails() {
      try {
        console.log(`Fetching details for transaction hash: ${transactionHash}`);
        const txDetails = await alchemy.core.getTransaction(transactionHash);
        console.log("Transaction details:", txDetails);
        setTransaction(txDetails);
      } catch (error) {
        console.error("Failed to fetch transaction details", error);
        setError("Failed to fetch transaction details. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    if (transactionHash) {
      fetchTransactionDetails();
    }
  }, [transactionHash]);

  // Convert BigNumber values to string for display
  const value = transaction?.value ? Utils.formatUnits(transaction.value, "ether") : "N/A";
  const gas = transaction?.gas ? transaction.gas.toString() : "N/A";
  const gasPrice = transaction?.gasPrice ? Utils.formatUnits(transaction.gasPrice, "gwei") : "N/A";

  return (
    <div className="home">
      {loading ? (
        <Loading />
      ) : (
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
          {error ? (
            <div className="error-message">{error}</div>
          ) : transaction ? (
            <>
              <Link to={`/block/${transaction.blockNumber}/transactions`} className="back-link">
                <FaArrowLeft /> Back to Transactions
              </Link>
              <h2>Transaction Details</h2>
              <div className="transaction-details">
                <p><strong>Transaction Hash:</strong> {transaction.hash}</p>
                <p><strong>Block Number:</strong> {transaction.blockNumber}</p>
                <p><strong>Transaction Index:</strong> {transaction.transactionIndex}</p>
                <p><strong>Confirmations:</strong> {transaction.confirmations}</p>
                <p><strong>From:</strong> {transaction.from}</p>
                <p><strong>To:</strong> {transaction.to}</p>
                <p><strong>Value:</strong> {value} ETH</p>
                <p><strong>Gas:</strong> {gas}</p>
                <p><strong>Gas Price:</strong> {gasPrice} Gwei</p>
                <p><strong>Nonce:</strong> {transaction.nonce}</p>
                <p><strong>Chain Id:</strong> {transaction.chainId}</p>
                <p><strong>Data:</strong> {transaction.data}</p>
              </div>
            </>
          ) : (
            <div>No transaction found.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default TransactionDetails;

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
