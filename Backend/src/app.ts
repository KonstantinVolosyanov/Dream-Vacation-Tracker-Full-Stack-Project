import express from "express";
import expressFileUpload from "express-fileupload";
import cors from "cors";
import appConfig from "./2-utils/app-config";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import authRouts from "./6-routes/auth-routes";
import userRoutes from "./6-routes/user-routes";
import adminRoutes from "./6-routes/admin-routes";


const server = express();


server.use(cors());
server.use(express.json());
server.use(expressFileUpload());
server.use("/api", authRouts);
server.use("/api", userRoutes);
server.use("/api", adminRoutes);
server.use(routeNotFound);
server.use(catchAll);


server.listen(appConfig.port, () => console.log(`Listening on http://localhost:${appConfig.port}`));
