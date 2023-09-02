export type ArticleInfo = {
  title: string;
  description: string;
  text: string;
  tagList?: string[];
  slug?: string;
};

export type UserInfo = {
  username?: string;
  email: string;
  password?: string;
  image?: string;
};
