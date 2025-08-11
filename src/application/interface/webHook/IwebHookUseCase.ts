
export interface IwebHookUseCase {
  execute(
    body: Buffer | string,
    sig: string | string[] | undefined,
    stripeSecret: string
  ): Promise<void>;
}
