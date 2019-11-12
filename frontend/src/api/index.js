import { getAuthToken } from 'api/localStorage'

export const get = async ({
  url,
  options = {},
  headers = {},
}) => {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      Authorization: getAuthToken(),
      ...headers,
    },
    ...options,
  });

  const json = await response.json();
  return json;
};

export const post = async ({
  url,
  body = {},
  options = {},
  headers = {},
}) => {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthToken(),
      ...headers,
    },
    ...options,
  });

  const json = await response.json();
  return json;
};

export const deleteRequest = async ({
  url,
  body = {},
  options = {},
  headers = {},
}) => {
  const response = await fetch(url, {
    method: 'DELETE',
    mode: 'cors',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthToken(),
      ...headers,
    },
    ...options,
  });

  const json = await response.json();
  return json;
};

export const put = async ({
  url,
  body = {},
  options = {},
  headers = {},
}) => {
  const response = await fetch(url, {
    method: 'PUT',
    mode: 'cors',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthToken(),
      ...headers,
    },
    ...options,
  });

  const json = await response.json();
  return json;
};
