
# IPL Auction App

The IPL Auction App PremierBid is a project that simulates the IPL player auction process. It allows users to take on different roles, such as an auction manager, team owner, or player, and participate in live auctions to build their IPL team. Designed with a mobile-first approach using React Native and a Node.js backend, this app provides a smooth experience for cricket enthusiasts and aspiring team managers.

## Run Locally

Clone the project

```bash
  git clone https://github.com/jitendra20661/Auction-Mobile-app.git

```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Update the .env file

```bash
  EXPO_PUBLIC_API_URL=http://<IP Address>:3000
  //make sure both devices are connected over the same network.
```

Start the Expo App

```bash
  npx expo start
```

Start the server

```bash
  cd api    //contains backend code
  nodemon server.js
```


## Download SQL file

Download the following .sql file and connect it to the backend
```bash
  IPL Auction app.sql
```
