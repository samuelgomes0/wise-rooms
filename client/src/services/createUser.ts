import { CreateUserDTO } from "@/types";
import axios from "axios";

export async function createUser({ name, email, password }: CreateUserDTO) {
  const requestOptions = {
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URL}/users`,
    headers: { "Content-Type": "application/json" },
    data: {
      name,
      email,
      password,
    },
  };

  console.log(requestOptions);

  const { data } = await axios.request(requestOptions);

  return data;
}
