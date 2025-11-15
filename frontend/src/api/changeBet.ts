import axios from "axios";
import Cookies from "js-cookie";
import humps from "humps";

export interface ChangeBetRequest {
  bets: [
    {
      stake: string;
      betPlace: string;
    }
  ]
}

export type ChangeBetResponse = 
  | {
    success: true;
    message: string;
  }
  | {
    success: false;
    message: string;
  }

export async function ChangeBet(bets: ChangeBetRequest):Promise<ChangeBetResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/change-bet`;
  const authToken = Cookies.get("authToken");

  return axios
    .post(apiUrl, {bets}, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json"
      }
    })
    .then((res) => {
      return res.data = humps.camelizeKeys(res.data) as typeof res.data;
    })
    .catch((err) => {
      throw err;
    });
};