# rskbank

## Project Resources
- Covalent APi
- MoC Public Rest API

## Project Flow

![Rsbank-flow](https://user-images.githubusercontent.com/26589426/136893052-c3e32500-a1bd-42df-a325-2c5d6a1e0fb7.png)

## Project Description
### Get Data MoC and Rif
contract_address moc_exchange = 0x6aCb83bB0281FB847b43cf7dd5e2766BFDF49038.
get the data with endpoint /v1/{chain_id}/events/address/{address}/ from covalnet API and get the detail with endpoint /v1/{chain_id}/transaction_v2/{tx_hash}/
to get the price of token use the MoC Rest Api to convert btc and bpro (on closing day price) to usd.
example tx = 0x42d712176f8b90eb122e071cbf86de8b76ae75d24eab22eeed759625e9ae8e2a
<img width="1181" alt="Screenshot 2021-10-12 at 11 54 05" src="https://user-images.githubusercontent.com/26589426/136893735-1218b2b7-9773-4e12-ba30-41c4e27db642.png">
to determine it is 'mint' or 'redeem', if the token transfer from wallet address user to 0x0000000000000000000000000000000000000000 it means 'redeem' transaction and vice versa

### Get Data Rsk Token Bridge
contract address rsk token bridge = 0x9d11937E2179dC5270Aa86A3f8143232D6DA0E69, the process to get the data is the same as above.
example tx = 0x5c3247876e0e70773e36604eb6140017b191c168859bcfa718a8424bb96d7c34
<img width="1243" alt="Screenshot 2021-10-12 at 12 00 24" src="https://user-images.githubusercontent.com/26589426/136894328-70357025-0093-445c-9410-5da567bd0c6a.png">
for this token transfer transaction we will get the return token and collected fee. with index 4 and 6 from above image

### Get Data Sovryn Bridge
contract address babelfish aggregator = 0x1440d19436bEeaF8517896bffB957a88EC95a00F the process to get the data is the same as above.
example tx= 0x3599a92a8c2e9ac90833d849ac588a9916dcd0aa8e599757e73f5b78ce8b96cd
<img width="1219" alt="Screenshot 2021-10-12 at 12 03 50" src="https://user-images.githubusercontent.com/26589426/136894661-e747cb17-3ff4-43d0-b22b-604c1378d8cf.png">
to get the collected fee with the return amount, i will get it from index 5 and 7

## Tools and Library
- vue (this repo)
- python flask [backend](https://github.com/akbaridria/rskbank-backend)
- python [crawler](https://github.com/akbaridria/rskbank-crawler)
