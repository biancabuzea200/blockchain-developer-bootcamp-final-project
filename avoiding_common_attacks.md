# Avoiding Common Attacks

## SWC-103 (Floating pragma)

Specific compiler pragma `0.8.0` used in contracts to avoid accidental bug inclusion through outdated compiler versions.

## SWC-120 Weak Sources of Randomness from Chain Attributes
Instead of using weak sources of randomness such as 'block.timestamp', 'block.difficulty', we have used an external trusted source of randomness using oracles (Chainlink here)

## SWC-131 (Presence of unused variables)

Even though unused variables are allowed in Solidity, it is best practice to be avoided as they can cause an increase in computation/cause code noise and decrease readability


## Proper Use of Require, Assert and Revert

Use `require` statements throughout for validation of inputs, external call returns and variables before state changes.
