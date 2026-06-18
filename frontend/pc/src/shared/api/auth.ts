import type { User } from "@/models/user";
import request from "../request";

export function login(data: {email: string, password: string}) {
  return request.post<User>('/auth/login', data)
}