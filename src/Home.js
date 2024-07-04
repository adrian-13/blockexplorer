import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import {
  FaSearch,
  FaHashtag,
  FaClock,
  FaCalendarAlt,
  FaUser,
  FaGasPump,
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

  useEffect(() => {
    async function getBlockNumberAndTimestamp() {
      try {
        const latestBlockNumber = await alchemy.core.getBlockNumber();
        const latestBlock = await alchemy.core.getBlock(latestBlockNumber);
        const previousBlock = await alchemy.core.getBlock(
          latestBlockNumber - 1
        );

        setBlockNumber(latestBlockNumber);
        setCurrentBlockTimestamp(
          new Date(latestBlock.timestamp * 1000).toLocaleString()
        );
        setLastBlockTime(latestBlock.timestamp - previousBlock.timestamp); // Time difference between latest block and previous block

        // Přidání animace při aktualizaci hodnot
        const elements = [
          document.getElementById("block-number-value"),
          document.getElementById("last-block-time-value"),
          document.getElementById("current-block-timestamp-value"),
          document.getElementById("gas-used-value"),
          document.getElementById("last-miner-value"),
        ];

        elements.forEach((element) => {
          element.classList.add("blink");
          setTimeout(() => element.classList.remove("blink"), 500);
        });
      } catch (error) {
        console.error("Failed to fetch block number or timestamp:", error);
      }
    }

    getBlockNumberAndTimestamp();

    const interval = setInterval(getBlockNumberAndTimestamp, 10000); // Update every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    async function getMiner() {
      try {
        const latestBlockInfo = await alchemy.core.getBlockWithTransactions(
          blockNumber
        );
        const gas = parseInt(latestBlockInfo.gasUsed._hex);
        setGasUsed(gas);
        setLastMiner(latestBlockInfo.miner);
      } catch (error) {
        console.error("Failed to fetch blocks miner.");
      }
    }

    getMiner();
  }, [blockNumber]);

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
              Block number:<br></br>{" "}
              <span id="block-number-value">{blockNumber}</span>
            </p>
          </div>
          <div className="dashboard-item">
            <FaClock className="icon" />
            <p>
              Time:<br></br>{" "}
              <span id="last-block-time-value">{lastBlockTime} seconds</span>
            </p>
          </div>
          <div className="dashboard-item">
            <FaCalendarAlt className="icon" />
            <p>
              Timestamp:<br></br>{" "}
              <span id="current-block-timestamp-value">
                {currentBlockTimestamp}
              </span>
            </p>
          </div>
          <div className="dashboard-item">
            <FaGasPump className="icon" />
            <p>
              Gas used:<br></br> <span id="gas-used-value">{gasUsed}</span>
            </p>
          </div>
          <div className="dashboard-item">
            <FaUser className="icon" />
            <p>
              Miner:<br></br> <span id="last-miner-value">{lastMiner}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
