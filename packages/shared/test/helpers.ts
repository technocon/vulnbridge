/**
 * Generic test helpers.
 */

/**
 * Wait for a promise to settle and return a tuple [error, result].
 * Like Go-style error handling for async tests.
 */
export async function expectAsync<T>(
  promise: Promise<T>,
): Promise<[Error | null, T | null]> {
  try {
    const result = await promise;
    return [null, result];
  } catch (err) {
    return [err as Error, null];
  }
}

/**
 * Build a paginated response envelope.
 */
export function paginatedResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number,
): { data: T[]; pagination: { page: number; limit: number; total: number } } {
  return {
    data,
    pagination: { page, limit, total },
  };
}

/**
 * Pause execution for `ms` milliseconds. Use sparingly.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}