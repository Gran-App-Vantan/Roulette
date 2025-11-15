import axios from "axios";
import humps from "humps";

export type StartTimeResponse = 
  | {
    success: true;
    startTime: string;
  }
  | {
    success: false;
  }

export async function StartTime():Promise<StartTimeResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/start_time`;

  return axios
    .get(apiUrl)
    .then((res) => {
      return res.data = humps.camelizeKeys(res.data) as typeof res.data;
    })
    .catch((err) => {
      throw err;
    });
};