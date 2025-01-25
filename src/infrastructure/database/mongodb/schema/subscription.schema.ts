import mongoose from "mongoose";

interface SubscriptionAttr {
  _id: string;
  price: number;
  offer:number;
  type: string;

}

interface SubscriptionDoc extends mongoose.Document {
  _id: string;
  price: number;
  offer:number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Model with a custom build method
interface MentorModel extends mongoose.Model<SubscriptionDoc> {
  build(attributes: SubscriptionAttr): SubscriptionDoc;
}

const advSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    }, 
    offer:{
    type:Number,
    required:true
    
  }
    
  },
 
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

// Attach the `build` Subscription to the schema's static methods
advSchema.statics.build = (attrs: SubscriptionAttr) => {
  return new SubscriptionSchema(attrs); // Return a new adv instance
};

const SubscriptionSchema = mongoose.model<SubscriptionDoc, MentorModel>(
  "Subscription",
  advSchema
);

export { SubscriptionSchema };
