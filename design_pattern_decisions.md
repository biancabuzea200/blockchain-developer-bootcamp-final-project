# Design Pattern Decisions

## Inheritance and Interfaces

- `Entrance` contract inherits from `Ownable` and `VRFConsumerBase`

## Oracle

- `Entrance` uses Chainlink VRF oracle to randomly generate a number

## Access Control Design Patterns

- `Ownable` design pattern is used to only allow the owner to set blackList status