import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { ZodValidationException } from "nestjs-zod";
import type { Response } from "express";
import { z } from "zod";

@Catch(ZodValidationException)
export class ZodExceptionFilter implements ExceptionFilter {
  catch(exception: ZodValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status = 400;

    const zerr = (exception.getZodError?.() ?? undefined) as z.ZodError | undefined;
    const flat = zerr?.flatten
      ? zerr.flatten()
      : { fieldErrors: {} as Record<string, unknown>, formErrors: [] as string[] };

    const details: Record<string, string[]> = {};
    for (const [field, msgs] of Object.entries(flat.fieldErrors)) {
      const arr = Array.isArray(msgs) ? (msgs.filter(Boolean) as string[]) : [];
      if (arr.length) details[field] = arr;
    }

    const message = flat.formErrors[0] ?? Object.values(details)[0]?.[0] ?? "Dados inválidos";

    res.status(status).json({
      statusCode: status,
      error: "Bad Request",
      message,
      details,
    });
  }
}
