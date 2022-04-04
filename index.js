const app = require("./server");
// app.listen(5000, () => {
//   console.log("Server has started!");
// });
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});