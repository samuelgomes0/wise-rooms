import { CreateUserDTO } from "@/types";
import axios from "axios";

export async function createUser({ name, email, password }: CreateUserDTO) {
  const requestOptions = {
    method: "POST",
    url: "http://localhost:3003/users",
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
