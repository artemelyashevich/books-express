import { Send } from "express-serve-static-core"

export interface ResponseBody<ResBody> extends Express.Response {
    json: Send<ResBody, this>;
  }