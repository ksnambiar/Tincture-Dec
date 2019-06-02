# Tincture-Dec
Decentralised implementation for Tincture blockchain in javascript

Applying libp2p for decentralizing the tincture bockchain
Blockchain storage made persistent with leveldb storage storing each block after validation
Handlers are used to restrict direct access to the blockchain instance
statefull reloading supported

# Status
  under heavy developement  


# Functionalities working-
1. creates a new node file if no nodeinfo is present or else takes the present info and runs the node
2. peer discovery on start
3. added genesis block creation
4. leveldb for persistant storage
5. peer broadcast
6. handlers to filter changes to chain
7. handlers to handle incoming transaction(blockchain side)
8. proof of equality (works just like the democratic voting system)


# To run it-
1. clone the repository
2. go inside the folder and do "npm install" in the terminal
3. enter "node index.js" in the terminal
