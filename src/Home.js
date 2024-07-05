import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState, useRef } from "react";
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
import "./Home.css";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function Home() {
  const [blockNumber, setBlockNumber] = useState("");
  const [currentBlockTimestamp, setCurrentBlockTimestamp] = useState("");
  const [lastBlockTime, setLastBlockTime] = useState(0);
  const [lastMiner, setLastMiner] = useState("");
  const [gasUsed, setGasUsed] = useState(0);
  const [blockHash, setBlockHash] = useState("");
  const [nonce, setNonce] = useState("");
  const [gasLimit, setGasLimit] = useState("");
  const [transactions, setTransactionCount] = useState(0);
  const previousBlockNumberRef = useRef("");

  useEffect(() => {
    async function getBlockNumberAndTimestamp() {
      try {
        const latestBlockNumber = await alchemy.core.getBlockNumber();
        const latestBlock = await alchemy.core.getBlock(latestBlockNumber);
        const previousBlock = await alchemy.core.getBlock(
          latestBlockNumber - 1
        );

        previousBlockNumberRef.current = blockNumber;
        setBlockNumber(latestBlockNumber);
        setBlockHash(latestBlock.hash);
        setCurrentBlockTimestamp(
          new Date(latestBlock.timestamp * 1000).toLocaleString()
        );
        setLastBlockTime(latestBlock.timestamp - previousBlock.timestamp); // Time difference between latest block and previous block
      } catch (error) {
        console.error("Failed to fetch block number or timestamp:", error);
      }
    }

    getBlockNumberAndTimestamp();

    const interval = setInterval(getBlockNumberAndTimestamp, 1000); // Update every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [blockNumber]);

  useEffect(() => {
    async function getMiner() {
      try {
        const latestBlockInfo = await alchemy.core.getBlockWithTransactions(
          blockNumber
        );

        setGasUsed(parseInt(latestBlockInfo.gasUsed._hex)); // Gas used
        setGasLimit(parseInt(latestBlockInfo.gasLimit._hex)); // Gas Limit
        setLastMiner(latestBlockInfo.miner); // Minner
        setNonce(latestBlockInfo.nonce); // Nonce
        setTransactionCount(latestBlockInfo.transactions.length); // Number of transactions
      } catch (error) {
        console.error("Failed to fetch blocks miner.");
      }
    }

    if (blockNumber) {
      getMiner();
    }
  }, [blockNumber]);

  useEffect(() => {
    if (
      blockNumber !== previousBlockNumberRef.current &&
      blockNumber > previousBlockNumberRef.current
    ) {
      // Přidání animace při zvýšení čísla bloku
      const elements = [
        document.getElementById("block-number-value"),
        document.getElementById("last-block-time-value"),
        document.getElementById("current-block-timestamp-value"),
        document.getElementById("gas-used-value"),
        document.getElementById("last-miner-value"),
        document.getElementById("block-hash-value"),
      ];

      elements.forEach((element) => {
        if (element) {
          element.classList.add("blink");
          setTimeout(() => element.classList.remove("blink"), 500);
        }
      });
    }
  }, [
    blockNumber,
    lastBlockTime,
    currentBlockTimestamp,
    gasUsed,
    lastMiner,
    blockHash,
  ]);

  return (
    <div className="home">
      <div className="search-container">
        <h1>The Ethereum Blockchain Explorer</h1>
        <div className="search-block">
          <input
            type="number"
            placeholder="Search by Address / Txn Hash / Block"
            onChange={(e) => setBlockNumber(e.target.value)}
          />
          <button onClick={() => {}}>
            <FaSearch className="icon" />
          </button>
        </div>
      </div>
      <div className="dashboard">
        <h2>Latest Block Information</h2>
        <div className="dashboard-content">
          <div className="dashboard-item">
            <FaHashtag className="icon" />
            <p>
              Block number: <span id="block-number-value">{blockNumber}</span>
            </p>
          </div>
          <div className="dashboard-item">
            <FaFingerprint className="icon" />
            <p>
              Block hash: <span id="block-hash-value">{blockHash}</span>
            </p>
          </div>
          <div className="dashboard-item">
            <FaKey className="icon" />
            <p>
              Nonce: <span id="block-hash-value">{nonce}</span>
            </p>
          </div>
          <div className="dashboard-item">
            <FaClock className="icon" />
            <p>
              Block interval:{" "}
              <span id="last-block-time-value">{lastBlockTime} seconds</span>
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
            <FaGasPump className="icon" />
            <p>
              Gas limit: <span id="block-hash-value">{gasLimit}</span>
            </p>
          </div>
          <div className="dashboard-item">
            <FaGasPump className="icon" />
            <p>
              Gas used: <span id="gas-used-value">{gasUsed}</span>
            </p>
          </div>
          <div className="dashboard-item">
            <FaUser className="icon" />
            <p>
              Miner: <span id="last-miner-value">{lastMiner}</span>
            </p>
          </div>
          <div className="dashboard-item">
            <FaExchangeAlt className="icon" />
            <p>
              Transactions:{" "}
              <span id="last-miner-value">{transactions} transactions</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
