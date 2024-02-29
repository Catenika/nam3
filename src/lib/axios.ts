import axios from 'axios';

const instance = axios.create({
  baseURL: "https://namada-explorer-api.stakepool.dev.br/node/",
});

export default instance;
