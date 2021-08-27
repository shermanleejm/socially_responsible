const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve(__dirname, 'Contract.sol');
const source = fs.readFileSync(contractPath, 'UTF-8');

export const compiled = solc.compile(
  JSON.stringify({
    language: 'Solidity',
    sources: {
      'Contract.sol': {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['evm', 'bytecode'],
        },
      },
    },
  })
);
