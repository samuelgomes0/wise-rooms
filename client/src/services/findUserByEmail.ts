import axios from "axios";

export async function findUserByEmail(email: string) {
  const requestOptions = {
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URL}/users/${email}`,
    headers: { "Content-Type": "application/json" },
  };

  const { data } = await axios.request(requestOptions);

  console.log(data);
}
