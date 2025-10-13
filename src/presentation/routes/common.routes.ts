import multer from "multer";
import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { FetchWalletController } from "../controllers/common/fetchWallet.controller";
import { UpdateWalletController } from "../controllers/common/updateWallet.controller";
import { CreateWalletController } from "../controllers/common/createWallet.controller";
import { FetchSubscriptionPlanController } from "../controllers/common/fetchSubscriptionPlan.controller";
import { CreateCheckoutSessionController } from "../controllers/common/createBookingCheckoutSession.controller";
import {
  validateReqBody,
  validateReqParams,
  validateReqQueryParams,
} from "@buxlo/common";
import { FetchOnePaymentController } from "../controllers/common/fetchOnePayment.controller";
import { CreateSubscriptionCheckoutSessionController } from "../controllers/common/createSubscriptonCheckoutSession.controller";
import { UpdateBookingPaymetController } from "../controllers/common/updateBookingPaymet.controller";
import { UpdateSubscriptionPaymetController } from "../controllers/common/updateSubscriptionPaymet.controller";
import { FetchSubscriptionPlanByIdController } from "../controllers/common/fetchSubscriptionPlanById.controller";
import { FetchBookingsPaymetController } from "../controllers/common/fetchBookingsPaymet.controller";
import { fetchSubscriptionplanByIdDto } from "../dto/common/fetchSubscriptionplanById.dto";
import {
  createCheckoutSessionBodyDto,
  createCheckoutSessionParamsDto,
} from "../dto/common/createCheckoutSession.dto";
import { fetchOnePaymentDto } from "../dto/common/fetchOnePaymet.dto";
import { updatePaymentDto } from "../dto/common/updatepaymet.dto";
import { fetchBookingsDto } from "../dto/common/fetchBookings.dto";
import { fetchPaymentHistoryDto } from "../dto/common/fetchPaymentHistory.dto";
import { FetchPaymetHistorysController } from "../controllers/common/fetchPaymetHistorys.controller";
import { addPaymentHistoryDto } from "../dto/common/addpaymenthistory.dto";
import { AddPaymentHistoryControler } from "../controllers/common/addPaymentHistory.controller";
import { UploadBankStatementController } from "../controllers/common/uploadBankStatement.controller";
import { uploadbankstatementDto } from "../dto/common/uploadbankstatement.dto";
import { cancelBookingsDto } from "../dto/common/cancelBookings.dto";
import { CancelBookingsPaymetController } from "../controllers/common/cancelBookingsPaymet.controller";

export class CommonRouter {
  private _router: Router;
  private _diContainer: DIContainer;
  private _upload = multer({ storage: multer.memoryStorage() });
  private _createWalletController!: CreateWalletController;
  private _fetchWalletController!: FetchWalletController;
  private _updateWalletController!: UpdateWalletController;
  private _fetchSubscriptionPlanController!: FetchSubscriptionPlanController;
  private _fetchSubscriptionPlanByIdController!: FetchSubscriptionPlanByIdController;
  private _createCheckoutSessionController!: CreateCheckoutSessionController;
  private _createSubscriptonCheckoutSessionController!: CreateSubscriptionCheckoutSessionController;
  private _fetchOnePaymetController!: FetchOnePaymentController;
  private _updateSubscriptionPaymetController!: UpdateSubscriptionPaymetController;
  private _updateBookingPaymetController!: UpdateBookingPaymetController;
  private _fetchBookingsPaymetController!: FetchBookingsPaymetController;
  private _cancelBookingsPaymetController!: CancelBookingsPaymetController;
  private _fetchPaymetHistorysController!: FetchPaymetHistorysController;
  private _addPaymetHistoryControler!: AddPaymentHistoryControler;
  private _uploadBankStatementController!: UploadBankStatementController;

  constructor() {
    this._router = Router();
    this._diContainer = new DIContainer();
    this._initializeControllers();
    this._initializeRoutes();
  }

  private _initializeControllers(): void {
    this._createWalletController = new CreateWalletController(
      this._diContainer.createWalletUseCase()
    );
    this._fetchWalletController = new FetchWalletController(
      this._diContainer.fetchWalletUseCase()
    );
    this._updateWalletController = new UpdateWalletController(
      this._diContainer.updateWalletUseCase()
    );
    this._fetchSubscriptionPlanController = new FetchSubscriptionPlanController(
      this._diContainer.fetchSubscriptionPlanUseCase()
    );
    this._fetchSubscriptionPlanByIdController =
      new FetchSubscriptionPlanByIdController(
        this._diContainer.fetchSubscriptionPlanByIdUseCase()
      );

    this._createCheckoutSessionController = new CreateCheckoutSessionController(
      this._diContainer.createBookingCheckoutSessionUseCase()
    );
    this._createSubscriptonCheckoutSessionController =
      new CreateSubscriptionCheckoutSessionController(
        this._diContainer.createSubscriptionCheckoutSessionUseCase()
      );
    this._fetchOnePaymetController = new FetchOnePaymentController(
      this._diContainer.fetchOnePaymentUseCase()
    );

    this._updateSubscriptionPaymetController =
      new UpdateSubscriptionPaymetController(
        this._diContainer.updateSubscriptionPaymetUseCase()
      );
    this._updateBookingPaymetController = new UpdateBookingPaymetController(
      this._diContainer.updateBookingPaymetUseCase()
    );

    this._fetchBookingsPaymetController = new FetchBookingsPaymetController(
      this._diContainer.fetchBookingsPaymetUseCase()
    );

    this._cancelBookingsPaymetController = new CancelBookingsPaymetController(
      this._diContainer.cancelBookingsPaymetUseCase()
    );
    this._fetchPaymetHistorysController = new FetchPaymetHistorysController(
      this._diContainer.fetchPaymetHistorysUseCase()
    );
    this._addPaymetHistoryControler = new AddPaymentHistoryControler(
      this._diContainer.addPaymentHistoryUseCase()
    );
    this._uploadBankStatementController = new UploadBankStatementController(
      this._diContainer.uploadBankStatementUseCase()
    );
  }

  private _initializeRoutes(): void {
    this._router.post("/createwallet", this._createWalletController.create);
    this._router.get("/fetchwallet", this._fetchWalletController.fetch);
    this._router.patch(
      "/updatewalletname/:id/:name",
      this._updateWalletController.update
    );
    this._router.get(
      "/fetchsubscriptionplan",
      this._fetchSubscriptionPlanController.fetchData
    );
    this._router.get(
      "/fetchsubscriptionplanbyid/:id",
      validateReqParams(fetchSubscriptionplanByIdDto),
      this._fetchSubscriptionPlanByIdController.fetchData
    );
    this._router.post(
      "/createbookingcheckoutsession/:userId/:type",
      validateReqParams(createCheckoutSessionParamsDto),
      validateReqBody(createCheckoutSessionBodyDto),
      this._createCheckoutSessionController.create
    );
    this._router.post(
      "/createsubscriptioncheckoutsession/:userId/:type",
      validateReqParams(createCheckoutSessionParamsDto),
      this._createSubscriptonCheckoutSessionController.create
    );
    this._router.get(
      "/fetchonepaymet/:id",
      validateReqParams(fetchOnePaymentDto),
      this._fetchOnePaymetController.fetch
    );

    this._router.post(
      "/updatesubscriptionpaymet/:id",
      validateReqParams(updatePaymentDto),
      this._updateSubscriptionPaymetController.update
    );
    this._router.post(
      "/updatesubbookingpaymet/:id",
      validateReqParams(updatePaymentDto),
      this._updateBookingPaymetController.update
    );

    this._router.get(
      "/fetchbookings",
      validateReqQueryParams(fetchBookingsDto),
      this._fetchBookingsPaymetController.fetch
    );

    this._router.patch(
      "/cancelbooking/:id",
      validateReqParams(cancelBookingsDto),
      this._cancelBookingsPaymetController.cancel
    );

    this._router.get(
      "/fetchpaymenthistory",
      validateReqQueryParams(fetchPaymentHistoryDto),
      this._fetchPaymetHistorysController.fetch
    );
    this._router.post(
      "/addpaymenthistory",
      validateReqBody(addPaymentHistoryDto),
      this._addPaymetHistoryControler.add
    );
    this._router.post(
      "/uploadbankstatement",
      this._upload.single("bankStatement"),
      validateReqQueryParams(uploadbankstatementDto),
      this._uploadBankStatementController.upload
    );
  }

  public getRouter(): Router {
    return this._router;
  }
}
