import { makeHttpGetRequest } from "./baseService";
import { ApiUsersUrl } from "./../constants/api";

export async function apiGetUsers() {
  const response = await makeHttpGetRequest(ApiUsersUrl);

  return response.data;
}
