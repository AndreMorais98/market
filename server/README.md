# Self Hosted Server

## Create a file .env in the server root and configure it
```
MORALIS_API_KEY = Your Moralis API Key
PORT = 1337 (Default)
MASTER_KEY = Moralis Master Key
APPLICATION_ID = Application ID (Moralis too)
SERVER_URL = 'http://localhost:1337/server' (Default)
CLOUD_PATH = './build/cloud/main.js'
DATABASE_URI = Mongo Database URL
USE_STREAMS = true or false
STREAMS_WEBHOOK_URL = 
```

## Start Server
After that configuration, just run this commands follow by this order:

- yarn install
- yarn build
- yarn dev