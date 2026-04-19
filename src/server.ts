import "dotenv/config";
import app from "./app";
import { PORT } from "./config/constants";

app.listen(PORT || 8080, () => console.log(`Server running at port ${PORT}`));
