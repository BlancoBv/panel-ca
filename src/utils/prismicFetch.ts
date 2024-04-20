import * as prismic from "@prismicio/client";

const API_ENDPOINT: string = import.meta.env.PUBLIC_PRISMIC_API_URL;
export const REPO_NAME = "web-blanco";

export const client = prismic.createClient(REPO_NAME);

export const getPost = () => {
  return client.getAllByType("post");
};

export const getPostByID = (id: string) => {
  return client.getByID(id);
};
