import app from "./app";
import { AppDataSource } from "./DataSource";

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!")

    app.listen(3000, () => {
      console.log("Server is running in PORT: 3000")
    })
  })
  .catch((error) => {
    console.log(error)
  })