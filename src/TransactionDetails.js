import { Alchemy, Network, Utils } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./Home.css";
import logo from "../src/assets/ethereum_logo.png";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function TransactionDetails() {
  const { transactionHash } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactionDetails() {
      try {
        console.log(
          `Fetching details for transaction hash: ${transactionHash}`
        );
        const txDetails = await alchemy.core.getTransaction(transactionHash);
        console.log("Transaction details:", txDetails);
        setTransaction(txDetails);
      } catch (error) {
        console.error("Failed to fetch transaction details", error);
      } finally {
        setLoading(false);
      }
    }

    if (transactionHash) {
      fetchTransactionDetails();
    }
  }, [transactionHash]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!transaction) {
    return <div>Transaction not found</div>;
  }

  // Convert BigNumber values to string for display
  const value = transaction.value
    ? Utils.formatUnits(transaction.value, "ether")
    : "N/A";
  const gas = transaction.gas ? transaction.gas.toString() : "N/A";
  const gasPrice = transaction.gasPrice
    ? Utils.formatUnits(transaction.gasPrice, "gwei")
    : "N/A";

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
        <Link
          to={`/block/${transaction.blockNumber}/transactions`}
          className="back-link"
        >
          <FaArrowLeft /> Back to Transactions
        </Link>
        <h2>Transaction Details</h2>
        <div className="transaction-details">
          <p>
            <strong>Transaction Hash:</strong> {transaction.hash}
          </p>
          <p>
            <strong>Block Number:</strong> {transaction.blockNumber}
          </p>
          <p>
            <strong>Transaction Index:</strong> {transaction.transactionIndex}
          </p>
          <p>
            <strong>Confirmations:</strong> {transaction.confirmations}
          </p>
          <p>
            <strong>From:</strong> {transaction.from}
          </p>
          <p>
            <strong>To:</strong> {transaction.to}
          </p>
          <p>
            <strong>Value:</strong> {value} ETH
          </p>
          <p>
            <strong>Gas:</strong> {gas}
          </p>
          <p>
            <strong>Gas Price:</strong> {gasPrice} Gwei
          </p>
          <p>
            <strong>Nonce:</strong> {transaction.nonce}
          </p>
          <p>
            <strong>Chain Id:</strong> {transaction.chainId}
          </p>
          <p>
            <strong>Data:</strong> {transaction.data}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TransactionDetails;
