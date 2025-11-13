export class Subscription {
  constructor(
    public price: number,
    public offer: number,
    public type: string,
    public duration: number,
    public createdAt?: Date,
    public updatedAt?: Date,
    public isDeleted: boolean = false,
    public id?: string
  ) {}
}
