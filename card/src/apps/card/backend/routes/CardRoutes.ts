import { Router } from 'express';
import container from '../config/dependency-injection';
import { BaseRouter } from '../../../../Contexts/Shared/infrastructure/api/BaseRouter';
import { ControllerAdapter } from '../../../../Contexts/Shared/infrastructure/api/ControllerAdapter';
import { MiddlewareAdapter } from '../../../../Contexts/Shared/infrastructure/api/MiddlewareAdapter';

export default class CardRoutes extends BaseRouter {
  protected BASE_PATH = '/card';

  protected handler(router: Router): void {
    this.get({
      router,
      route: ControllerAdapter.handle(container.get('Apps.controllers.FindCardGetController')),
      middlewares: [
        MiddlewareAdapter.handle(container.get('Apps.middlewares.CheckTokenHeaderMiddleware'))
      ],
      url: '/'
    });
  }
}
