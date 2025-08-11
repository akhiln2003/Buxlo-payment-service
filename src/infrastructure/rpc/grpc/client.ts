import { UpdateAvailabilityRequest, UpdateAvailabilityResponse } from "@buxlo/common";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.join(
  __dirname,
  "../../../../node_modules/@buxlo/common/src/protos/booking.proto"
);

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const bookingProto = (grpc.loadPackageDefinition(packageDefinition) as any).payment;

export const client = new bookingProto.BookingService(
  process.env.GRPC_SERVER || "buxlo-booking:50052",
  grpc.credentials.createInsecure()
);

export const updateAvailability = (
  updateData: UpdateAvailabilityRequest
): Promise<UpdateAvailabilityResponse> => {
  return new Promise((res, rej) => {
    client.UpdateAvailability(updateData, (error: any, response: any) => {
      if (error) {
        console.error("gRPC Error:", error);
        return rej(error);
      }
      console.log("gRPC Response:", response);
      res(response);
    });
  });
};
