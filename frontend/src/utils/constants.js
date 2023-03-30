export const defaultMessage = "Привет! Это тестовый отклик";

export function checkResponse(res) {
  if (!res.ok) {
    return Promise.reject(new Error(`Ошибка ${res.status}`));
  }
  return res.json();
}


// export const baseUrl = `http://${process.env.REACT_APP_HOST}:4000`;
export const baseUrl = `http://localhost:4000`;

export const tokenRequestOptions = ({ accessToken, method, bodyData }) => {
  const requestOptions = {
    method: `${method}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: bodyData,
  };
  return requestOptions;
};

export const requestOption = (method) => {
  const requestOptions = {
    method: `${method}`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return requestOptions;
};
