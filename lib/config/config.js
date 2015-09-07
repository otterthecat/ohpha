module.exports = {
  "port": process.env.PORT || 3000,

  "socket_origin": "http://localhost:3000",

  "bulb_board": {
    "id": process.env.YODA_ID,
    "token": process.env.YODA_TOKEN
  },

  "pullup_board": {
    "id": process.env.YODA_ID,
    "token": process.env.YODA_TOKEN
  }
};