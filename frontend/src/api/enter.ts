import axios from "axios";
import humps from "humps";

export interface EnterRequest {
  snsId: string;
  point: number;
}

export async function Enter({
  snsId,
  point
}: EnterRequest):Promise<string> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/enter`;

  return axios
    .post(apiUrl, {
      snsId,
      point
    })
    .then((res) => {
      return res.data = humps.camelizeKeys(res.data) as typeof res.data;
    })
    .catch((err) => {
      throw err;
    });
};