const URL = `http://${process.env.REACT_APP_HOST}:4000`;
// const URL = `http://localhost:4000`;
const checkResponse = (res) => {
  if (res.ok || res.created) {
    return res.json();
  }
  return res.json().then((err) => {
    return Promise.reject(err);
  });
};

export const getOwnUser = async (token) => {
  return fetch(`${URL}/api/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then(checkResponse)
    .then((data) => data);
};

export const getUserResumes = async (token) => {
  return fetch(`${URL}/api/resumes/mine`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then(checkResponse)
    .then((data) => data);
};

export const getUserResumeById = async (token, id) => {
  return fetch(`${URL}/api/resumes/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then(checkResponse)
    .then((data) => data);
};

export const getUserVacancies = async (token, resume_id, page) => {
  return fetch(`${URL}/api/resumes/${resume_id}/similar_vacancies/${page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then(checkResponse)
    .then((data) => data);
};

export const sendMessage = async (token, formData) => {  
  return fetch(`${URL}/api/negotiations`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: formData
  })
    .then(checkResponse)
    .then((data) => data);
};

export const saveUser = async (token, formData) => {  
  return fetch(`${URL}/users/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(formData)
  })
    .then(checkResponse)
    .then((data) => data);
};

export const getUsersAll = async (token) => {
  return fetch(`${URL}/users/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then(checkResponse)
    .then((data) => data);
};

export const getUserFromDB = async (token, email) => {
  return fetch(`${URL}/users/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then(checkResponse)
    .then((data) => data);
};