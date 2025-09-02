
export interface IWebHookUseCase {
  execute(
    body: Buffer | string,
    sig: string | string[] | undefined,
    stripeSecret: string
  ): Promise<void>;
}
