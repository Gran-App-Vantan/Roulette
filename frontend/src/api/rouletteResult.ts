import axios from "axios";

export async function RouletteResult(req: string):Promise<string> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/roulette_result`;

  return axios
    .post(apiUrl, req)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};