# L402: Monetize your API

## Description
This workshop will explain the L402 protocol and its applications. We'll also play with a demo to understand how to monetize APIs using the L402 protocol and Lightning Network.

## Workshop Plan

1. **Return on Lightning**
   - Overview of the Lightning Network and its benefits.
   
2. **Introduce the L402 Protocol**
   - Explanation of the L402 protocol.
   - [L402 Protocol Documentation](https://docs.lightning.engineering/the-lightning-network/l402)
   
3. **The Role Lightning Plays in This**
	- Discuss how the Lightning Network supports the L402 protocol.
	- How is it different from other solutions?
   
4. **Why We Use Macaroon?**
   - Understanding Macaroons and their importance in secure API access.
   
5. **Configure the Server Part**
   - Set up the server using the [LSAT project](https://github.com/Byzantium-ETS/lsat).
   
6. **Demo with the Test Web Client**
   - Hands-on demonstration using the test web client to interact with the API.
   
7. **Exploring Hidden Features with the CLI Demo Client**
   - Use the CLI demo client to explore additional features.

## Dependencies
- **Go** (Go programming language)

## Preparation Instructions for Attendees

1. **Install Go**:
   - Download and install Go from the [official Go website](https://golang.org/dl/).

2. **Clone the LSAT repositories**:

#### lsat-workshop
 ```sh
git clone https://github.com/Byzantium-ETS/lsat-workshop.git
```
#### lsat (backend)
```sh
git clone https://github.com/Byzantium-ETS/lsat.git
```

3. **Review the L402 Protocol Documentation**:
   - Familiarize yourself with the L402 protocol by reading the [L402 documentation](https://docs.lightning.engineering/the-lightning-network/l402).

## Running the Demo

1. **Start the Server**:
	- Navigate to the cloned LSAT repository and start the server.
```sh
cd lsat
go run server/main.go
```

2. **Open the Web Client**:
	- Open `index.html` in your web browser to view the web client interface.

3. **Interact with the API**:
   - Use the provided buttons in the web client to interact with the API and observe the responses.

> If the requests fail, check in the `script.js` if the url is the same as in the server.