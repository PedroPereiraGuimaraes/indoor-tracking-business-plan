const MAX_RETRIES = 3;
const INITIAL_DELAY_MS = 2000;

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function callWithRetry<T>(
  fn: () => Promise<T>,
  retries = MAX_RETRIES,
  delayMs = INITIAL_DELAY_MS
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;

    console.warn(
      `Tentativa falhou. Tentando novamente em ${delayMs}ms... Restam ${retries} tentativas. Erro:`,
      error
    );
    await delay(delayMs);

    return callWithRetry(fn, retries - 1, delayMs * 2);
  }
}
