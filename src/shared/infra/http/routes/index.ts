import { Router } from "express";

import { partiesRoutes } from "./parties.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/user", usersRoutes);
router.use("/party", partiesRoutes);

export { router };
