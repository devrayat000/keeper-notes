export const env = {
  get isDev(): boolean {
    return process.env.NODE_ENV === "development";
  },
  get isProd(): boolean {
    return process.env.NODE_ENV === "production";
  },
};
