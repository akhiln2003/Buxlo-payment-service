export class Subscription {
  constructor(
    public price: number,
    public offer: number,
    public type: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public id?: string
  ) {}
}
