import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { UpdateSubscriptionPlanController } from "../controllers/admin/updateSubscriptionPlanController";
import { FetchSubscriptionPlanController } from "../controllers/admin/fetchSubscriptionPlanController";

const router = Router();

const diContainer = new DIContainer();

// Inject dependencies into the Controller

const fetchSubscriptionPlanController = new FetchSubscriptionPlanController(
  diContainer.fetchSubscriptionPlanUseCase()
);

const updateSubscriptionPlanController = new UpdateSubscriptionPlanController(
  diContainer.updateSubscriptionPlanUseCase()
);

/////////////////////////////////////

router.get("/fetchsubscriptionplan", fetchSubscriptionPlanController.fetchData);
router.put("/updatesubscriptionplan", updateSubscriptionPlanController.update);

export { router as adminRoutes };
