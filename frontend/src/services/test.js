const axios = require("axios");

axios.post("https://team-task-manager-production-b123.up.railway.app/api/auth/login", {
  email: "test@gmail.com",
  password: "123456"
})
.then(res => console.log(res.data))
.catch(err => console.log(err.response?.data || err.message))