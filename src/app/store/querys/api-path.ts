// const API_URL = `/api/v1`;
const API_URL = `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}`;

export const API_PATH = {
  profile: `${API_URL}/profile`,
  member: `${API_URL}/members`,
  auth: `${API_URL}/auth`,
  mailAuth: `${API_URL}/member/email`,
  board: `${API_URL}/boards`,
  blog: `${API_URL}/naver-blog`,
};
