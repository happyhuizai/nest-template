export const refreshTokenCacheKey = (uuid: number) =>
  `user:${uuid}:refresh_token`;

export const accessTokenCacheKey = (uuid: number) =>
  `user:${uuid}:access_token`;
