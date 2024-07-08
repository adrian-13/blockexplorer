import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { FaSearch, FaArrowLeft } from "react-icons/fa";
import "./BlockTransactions.css";
import logo from "../src/assets/ethereum_logo.png";
import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function BlockTransactions() {
  const { blockNumber } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [showError, setShowError] = useState(false); // State to control error message visibility
  const timerRef = useRef(null); // Ref to store the timer ID
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getBlockDetails() {
      try {
        const block = await alchemy.core.getBlockWithTransactions(
          parseInt(blockNumber)
        );
        if (block.transactions && Array.isArray(block.transactions)) {
          setTransactions(block.transactions);
        } else {
          setTransactions([]);
        }
      } catch (error) {
        console.error("Failed to fetch block transactions.", error);
      } finally {
        setLoading(false);
      }
    }

    if (blockNumber) {
      getBlockDetails();
    }
  }, [blockNumber]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputSearch = () => {
    const input = inputValue.trim();
    setErrorMessage(""); // Clear previous error message
    setShowError(false); // Hide error message initially

    if (isNumeric(input)) {
      window.location.href = `/block/${input}`;
    } else {
      if (input.length === 0) {
        setErrorMessage(
          "You did not enter any input. Please provide the required data and try again."
        );
        setShowError(true); // Show error message
      } else if (input.length === 42) {
        console.log("Address: ", input);
        // TODO
      } else if (input.length === 66) {
        console.log("Hash: ", input);
        window.location.href = `/block/${blockNumber}/transactions/${input}`;
      } else {
        setErrorMessage(
          "The entered format is incorrect. Please check your input and try the search again."
        );
        setShowError(true); // Show error message
      }
    }
    // Hide the error message after 3 seconds
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setShowError(false);
    }, 3000);
  };

  const isNumeric = (input) => {
    return /^\d+$/.test(input);
  };

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
        <div className="search-container">
          <div className="search-block">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="search-box"
              placeholder="Search by Address / Txn Hash / Block"
            />
            <button onClick={handleInputSearch}>
              <FaSearch className="icon" />
            </button>
          </div>
          {errorMessage && (
            <p className={`error-message ${showError ? "" : "hide"}`}>
              {errorMessage}
            </p>
          )}
        </div>
        <h2>Transactions for block #{blockNumber}</h2>
        <Link to={`/block/${blockNumber}`} className="back-link">
          <FaArrowLeft /> Back to Block Details
        </Link>
        <div className="dashboard-content">
          <div className="block-transactions">
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Hash</th>
                  <th>Block Number</th>
                  <th>From</th>
                  <th>To</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, index) => (
                  <tr key={tx.hash}>
                    <td>{index + 1}</td>
                    <td className="long-text">
                      <Link to={`/transaction/${tx.hash}`}>{tx.hash}</Link>
                    </td>
                    <td>{tx.blockNumber}</td>
                    <td className="long-text">{tx.from}</td>
                    <td className="long-text">{tx.to}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlockTransactions;
