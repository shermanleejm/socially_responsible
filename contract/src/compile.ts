import path from 'path';
import fs from 'fs';
const solc = require('solc');

const contractPath = path.resolve(__dirname, 'Contract.sol');
const source = fs.readFileSync(contractPath, 'utf8');

const compiled = solc.compile(
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

fs.writeFile('Contract.json', compiled, function (err) {
  if (err) throw err;
});
