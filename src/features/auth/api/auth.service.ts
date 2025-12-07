import axios from "axios";
import { LoginPayload } from "../types";

export const loginApi = (data: LoginPayload) =>
  axios.post("/login", data);