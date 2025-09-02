export class Wallet {
  constructor(
    public balance: number,
    public name: string,
    public userId: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public id?: string
  ) {}
}
