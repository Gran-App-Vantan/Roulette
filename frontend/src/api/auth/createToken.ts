import axios from "axios";
import hums from "humps";

export type CreateTokenResponse = 
  | {
    success: true;
    message: string;
    data: {
      token: string;
      gameType: "IndianPoker" | "Roulette" | "Slot" | "Blackjack",
    }
  }

export async function CreateToken():Promise<CreateTokenResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}`
}