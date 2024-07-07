# Ethereum Insider

![Ethereum Logo](./src/assets/ethereum_logo.png)

## Project Description

**Ethereum Insider** is an advanced blockchain explorer for the Ethereum network. This project allows users to search and display details of the latest blocks and transactions on the Ethereum network. The project uses Alchemy SDK to fetch data from the Ethereum network and React to display this information.

Key features of the project include:
- Displaying the latest blocks and their details, including creation time, miners, gas used, and hashes.
- Ability to search for blocks, transactions, and addresses using a search field.
- Displaying transaction details, including sender, recipient, transaction value, gas consumed, and more.
- User-friendly interface adapted for mobile devices.

This project is still in development, and more features will be added soon.

### Project Origin

This project was created as an assignment for a course at **Alchemy University**, where students gain practical experience using the Alchemy SDK and developing decentralized applications.

## Installation and Running the Project

### Requirements

- Node.js (version 14.x or newer)
- npm or yarn
- Alchemy API key

### Installation

1. Clone this repository:

```bash
git clone https://github.com/yourusername/ethereum-insider.git
cd ethereum-insider
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a .env file in the root directory of the project and add your Alchemy API key:

```env
REACT_APP_ALCHEMY_API_KEY=your_alchemy_api_key
```

### Running the Project
After installing the dependencies and setting up the environment variables, start the application:

```bash
npm install
# or
yarn install
```

The application will run on http://localhost:3000.

### Project Structure
src/: Main source code of the application.
components/: React components used in the application.
assets/: Static files and images.
styles/: CSS files for styling the application.
App.js: Main application file.
index.js: Entry point of the application.
Home.js: Component for displaying the home page.
BlockDetails.js: Component for displaying block details.
BlockTransactions.js: Component for displaying transactions in a block.
TransactionDetails.js: Component for displaying transaction details.

### Contributing
Contributions are welcome! If you are interested in contributing to the project, please open a pull request or create an issue on GitHub.

