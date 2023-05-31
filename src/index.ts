import { config } from "dotenv";
import { createApp } from "./utils/createApp";

config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

async function main() {
  try {
    const app = createApp();

    app.listen(PORT, () => {
      console.log(`Running on Port ${PORT}`);
    });

    return app;
  } catch (error) {
    console.log(error);
  }
}

const app = main();

module.exports = app;

