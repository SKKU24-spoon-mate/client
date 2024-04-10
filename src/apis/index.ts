type ApiObject = {
  // search: AxiosSearchReturn;
};

const api = (): ApiObject => {
  const accessToken = '';
  const headers = {
    Authorization: 'Bearer ' + accessToken,
  };

  return {
    // search: axiosSearch({ headers }),
  };
};

export default api;
