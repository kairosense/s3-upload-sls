import type { Application } from 'express'

export const bootstrap = (app: Application) => {
  /**
   * A synchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up any data,
   * run jobs, or perform some special logic.
   */

  return app
}
