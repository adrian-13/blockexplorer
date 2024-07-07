import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { FaSearch, FaArrowLeft } from "react-icons/fa";
import "./BlockTransactions.css";
import logo from "../src/assets/ethereum_logo.png";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function BlockTransactions() {
  const [blockNumberInput, setBlockNumberInput] = useState(""); // State for user input
  const { blockNumber } = useParams();
  const [transactions, setTransactions] = useState([]);
  const history = useHistory();

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
      }
    }

    if (blockNumber) {
      getBlockDetails();
    }
  }, [blockNumber]);

  const handleSearch = () => {
    if (blockNumberInput) {
      history.push(`/block/${blockNumberInput}`);
    }
  };

  return (
    <div className="home">
      <div className="dashboard">
        <div className="header">
          <Link to="/" className="title-link">
            <h1 className="title">Ethereum Insider</h1>
          </Link>
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <p className="subtitle">The Ethereum Blockchain Explorer</p>
        <div className="search-container">
          <div className="search-block">
            <input
              type="number"
              placeholder="Search by Address / Txn Hash / Block"
              onChange={(e) => setBlockNumberInput(e.target.value)}
            />
            <button onClick={handleSearch}>
              <FaSearch className="icon" />
            </button>
          </div>
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
