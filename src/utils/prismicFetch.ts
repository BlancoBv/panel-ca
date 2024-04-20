import * as prismic from "@prismicio/client";

const API_ENDPOINT: string = import.meta.env.PUBLIC_PRISMIC_API_URL;

const client = prismic.createClient(API_ENDPOINT, {
  routes: [{ type: "post", path: "/:uid" }],
});

export const getPost = () => {
  return client.getAllByType("post");
};

export const getPostByID = (id: string) => {
  return client.getByID(id);
};
