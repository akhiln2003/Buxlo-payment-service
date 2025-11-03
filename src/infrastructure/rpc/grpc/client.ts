import {
  UpdateAvailabilityRequest,
  UpdateAvailabilityResponse,
  UpdateSubscriptionRequest,
  UpdateSubscriptionResponse,
} from "@buxlo/common";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.join(
  __dirname,
  "../../../../node_modules/@buxlo/common/src/protos/payment.proto"
);

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const paymentProto = (grpc.loadPackageDefinition(packageDefinition) as any)
  .payment;

export const client = new paymentProto.BookingService(
  process.env.GRPC_SERVER || "buxlo-booking:50052",
  grpc.credentials.createInsecure()
);

export const subscriptionClient = new paymentProto.SubscriptionService(
  process.env.GRPC_SUBSCRIPTION_SERVER || "buxlo-user:50052",
  grpc.credentials.createInsecure()
);
export const updateAvailability = (
  updateData: UpdateAvailabilityRequest
): Promise<UpdateAvailabilityResponse> => {
  return new Promise((res, rej) => {
    const deadline = new Date(Date.now() + 5000); // 5s deadline

    client.UpdateAvailability(
      updateData,
      { deadline },
      (error: any, response: any) => {
        if (error) {
          console.error("gRPC Error:", error);
          return rej(error);
        }
        console.log("gRPC Response:", response);
        res(response);
      }
    );
  });
};

export const updateSubscription = (
  updateData: UpdateSubscriptionRequest
): Promise<UpdateSubscriptionResponse> => {
  return new Promise((res, rej) => {
    subscriptionClient.UpdateSubscription(
      updateData,
      (error: any, response: any) => {
        if (error) {
          console.error("gRPC Error:", error);
          return rej(error);
        }
        console.log("gRPC Response:", response);
        res(response);
      }
    );
  });
};
