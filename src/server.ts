import app from "./app";
import { AppDataSource } from "./data-source";

const PORT: number = 3000;
const RunningMSG: string = `Server is running on port ${PORT}.`;

AppDataSource.initialize()
  .then(() => {
    console.log("Database is connected");
    app.listen(PORT, () => console.log(RunningMSG));
  })
  .catch((error) => console.log(error));
