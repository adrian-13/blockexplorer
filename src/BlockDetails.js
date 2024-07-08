import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaSearch,
  FaHashtag,
  FaKey,
  FaFingerprint,
  FaClock,
  FaCalendarAlt,
  FaUser,
  FaGasPump,
  FaExchangeAlt,
} from "react-icons/fa";
import "./Home.css"; // Ensure you are importing the correct CSS file
import logo from "../src/assets/ethereum_logo.png";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function BlockDetails() {
  const { blockNumber } = useParams();
  const [currentBlockTimestamp, setCurrentBlockTimestamp] = useState("");
  const [lastBlockTime, setLastBlockTime] = useState(0);
  const [lastMiner, setLastMiner] = useState("");
  const [gasUsed, setGasUsed] = useState(0);
  const [blockHash, setBlockHash] = useState("");
  const [nonce, setNonce] = useState("");
  const [gasLimit, setGasLimit] = useState("");
  const [transactions, setTransactionCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [showError, setShowError] = useState(false); // State to control error message visibility
  const timerRef = useRef(null); // Ref to store the timer ID
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getBlockNumberAndTimestamp() {
      try {
        const currentBlock = await alchemy.core.getBlock(parseInt(blockNumber));
        const previousBlock = await alchemy.core.getBlock(blockNumber - 1);
        setBlockHash(currentBlock.hash);
        setCurrentBlockTimestamp(
          new Date(currentBlock.timestamp * 1000).toLocaleString()
        );
        setLastBlockTime(currentBlock.timestamp - previousBlock.timestamp); // Time difference between latest block and previous block
      } catch (error) {
        console.error("Failed to fetch block number or timestamp:", error);
      } finally {
        setLoading(false);
      }
    }
    getBlockNumberAndTimestamp();
  }, [blockNumber]);

  useEffect(() => {
    async function getBlockDetails() {
      try {
        const latestBlockInfo = await alchemy.core.getBlockWithTransactions(
          parseInt(blockNumber)
        );
        // Gas used
        const gasUsed = parseInt(latestBlockInfo.gasUsed._hex);
        setGasUsed(gasUsed.toLocaleString());
        const gasLimit = parseInt(latestBlockInfo.gasLimit._hex);
        setGasLimit(gasLimit.toLocaleString()); // Gas Limit
        setLastMiner(latestBlockInfo.miner); // Minner
        setNonce(latestBlockInfo.nonce); // Nonce
        setTransactionCount(latestBlockInfo.transactions.length); // Number of transactions
      } catch (error) {
        console.error("Failed to fetch blocks miner.");
      } finally {
        setLoading(false);
      }
    }

    if (blockNumber) {
      getBlockDetails();
    }
  }, [blockNumber]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputSearch = () => {
    const input = inputValue.trim();

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
      {loading && (
        <div className="loading-container">
          <div class="loader"></div>
          <div className="loading-text">Loading...</div>
        </div>
      )}
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
        <h2>Block # {blockNumber}</h2>
        <div className="dashboard-content">
          {/* Block Information Group */}
          <div className="dashboard-group">
            <h3>Block Information</h3>
            <div className="dashboard-item">
              <FaHashtag className="icon" />
              <p>
                Block number: <span id="block-number-value">{blockNumber}</span>
              </p>
            </div>
            <div className="dashboard-item">
              <FaCalendarAlt className="icon" />
              <p>
                Timestamp:{" "}
                <span id="current-block-timestamp-value">
                  {currentBlockTimestamp}
                </span>
              </p>
            </div>
            <div className="dashboard-item">
              <FaFingerprint className="icon" />
              <p>
                Block hash: <span id="block-hash-value">{blockHash}</span>
              </p>
            </div>
          </div>
          {/* Mining Information Group */}
          <div className="dashboard-group">
            <h3>Mining Information</h3>
            <div className="dashboard-item">
              <FaUser className="icon" />
              <p>
                Miner: <span id="last-miner-value">{lastMiner}</span>
              </p>
            </div>
            <div className="dashboard-item">
              <FaClock className="icon" />
              <p>
                Time Since Last Block:{" "}
                <span id="block-interval-value">{lastBlockTime} seconds</span>
              </p>
            </div>
            <div className="dashboard-item">
              <FaKey className="icon" />
              <p>
                Nonce: <span id="nonce-value">{nonce}</span>
              </p>
            </div>
          </div>
          {/* Gas Information Group */}
          <div className="dashboard-group">
            <h3>Gas Information</h3>
            <div className="dashboard-item">
              <FaGasPump className="icon" />
              <p>
                Gas limit: <span id="gas-limit-value">{gasLimit}</span>
              </p>
            </div>
            <div className="dashboard-item">
              <FaGasPump className="icon" />
              <p>
                Gas used: <span id="gas-used-value">{gasUsed}</span>
              </p>
            </div>
          </div>
          {/* Transaction Information Group */}
          <div className="dashboard-group">
            <h3>Transaction Information</h3>
            <div className="dashboard-item">
              <FaExchangeAlt className="icon" />
              <p>
                Transactions:{" "}
                <Link
                  to={`/block/${blockNumber}/transactions`}
                  className="link"
                >
                  {" "}
                  <span id="transaction-count-value">
                    {transactions} transactions
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlockDetails;
