import { UseCaseResponse } from '../../domain/UseCaseResponse';
import { HttpResponseBody } from '../../domain/HttpResponse';

export class HttpResponseMapper {
  static run<T extends UseCaseResponse>(response: T): HttpResponseBody {
    const { count, totalPages, page, limit, data } = response;
    return {
      data,
      count,
      totalPages,
      limit,
      page,
    };
  }
}
