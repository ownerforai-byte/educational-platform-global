import { isProductionEnv } from "../config/env.js";

export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogContext {
  [key: string]: unknown;
}

class StructuredLogger {
  private isProd: boolean;

  constructor() {
    this.isProd = isProductionEnv();
  }

  private log(level: LogLevel, message: string, context?: LogContext) {
    const entry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...(context ? { context } : {}),
    };

    if (this.isProd) {
      const output = JSON.stringify(entry);
      if (level === "error") {
        console.error(output);
      } else if (level === "warn") {
        console.warn(output);
      } else {
        console.log(output);
      }
    } else {
      const prefix = `[${entry.timestamp}] [${level.toUpperCase()}]`;
      const contextStr = context ? `\n${JSON.stringify(context, null, 2)}` : "";
      if (level === "error") {
        console.error(`${prefix} ${message}${contextStr}`);
      } else if (level === "warn") {
        console.warn(`${prefix} ${message}${contextStr}`);
      } else if (level === "debug") {
        console.debug(`${prefix} ${message}${contextStr}`);
      } else {
        console.log(`${prefix} ${message}${contextStr}`);
      }
    }
  }

  debug(message: string, context?: LogContext) {
    if (!this.isProd) {
      this.log("debug", message, context);
    }
  }

  info(message: string, context?: LogContext) {
    this.log("info", message, context);
  }

  warn(message: string, context?: LogContext) {
    this.log("warn", message, context);
  }

  error(message: string, context?: LogContext) {
    this.log("error", message, context);
  }
}

export const logger = new StructuredLogger();
export default logger;
