import axios from "axios";
import humps from "humps";
import { User } from "./types";

export interface UserAllResponse {
  user: User[];
}

export async function UserALl():Promise<UserAllResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/user_all`;

  return axios
    .get(apiUrl)
    .then((res) => {
      return res.data = humps.camelizeKeys(res.data) as typeof res.data;
    })
    .catch((err) => {
      throw err;
    });
};