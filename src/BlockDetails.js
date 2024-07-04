import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alchemy, Network } from "alchemy-sdk";
import "./BlockDetails.css";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function BlockDetails() {
  const { blockNumber } = useParams();
  const [blockWithTransactions, setBlockWithTransactions] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    async function fetchBlockWithTransactions() {
      try {
        const block = await alchemy.core.getBlockWithTransactions(
          parseInt(blockNumber, 10)
        );
        setBlockWithTransactions(block);
        setSelectedTransaction(null);
      } catch (error) {
        console.error("Failed to fetch block with transactions:", error);
      }
    }

    fetchBlockWithTransactions();
  }, [blockNumber]);

  const handleTransactionClick = async (hash, index) => {
    if (selectedTransaction && selectedTransaction.hash === hash) {
      setSelectedTransaction(null);
    } else {
      try {
        const transaction = await alchemy.core.getTransaction(hash);
        setSelectedTransaction({ ...transaction, index });
      } catch (error) {
        console.error("Failed to fetch transaction details:", error);
      }
    }
  };

  return (
    <div className="block-details-page">
      <h2>Block Number: {blockNumber}</h2>
      {blockWithTransactions && (
        <div className="transactions">
          <h3>Transakcie bloku {blockNumber}:</h3>
          <div className="transactions-container">
            <ul className="transactions-list">
              {blockWithTransactions.transactions.map((tx, index) => (
                <li key={tx.hash}>
                  <span className="transaction-index">{index + 1}.</span>
                  <button
                    onClick={() => handleTransactionClick(tx.hash, index + 1)}
                  >
                    <span className="transaction-hash">{tx.hash}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {selectedTransaction && (
            <div className="transaction-details">
              <h3>Transaction {selectedTransaction.index} Details:</h3>
              <pre>{JSON.stringify(selectedTransaction, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BlockDetails;
