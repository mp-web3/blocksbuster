const express = require("express");
const app = express();
const port = 4000; // Use the port of your choice

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
