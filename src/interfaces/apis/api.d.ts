export type ApiHeaders = {
  Authorization: string;
};

export interface AxiosHeaderOptions {
  headers: ApiHeaders;
}

export const baseUrl = process.env.REACT_APP_BACKEND_URL as string;
