import { fetchAPI } from "./helper";

export const postUser = async (name) => {
  const data = await fetchAPI({
    endpoint: "mobile/create_user/",
    method: "POST",
    body: { name },
  });
  const userData = {
    id: data.id,
    name: data.name,
  };
  return userData;
};
