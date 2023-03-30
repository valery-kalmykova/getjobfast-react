import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  SET_NO_USER,
  GET_RESUMES_REQUEST,
  GET_RESUMES_SUCCESS,
  GET_RESUMES_FAILED,
  GET_SIMILAR_VACANCIES_REQUEST,
  GET_SIMILAR_VACANCIES_SUCCESS,
  GET_SIMILAR_VACANCIES_FAILED,
  SEND_MSG_REQUEST,
  SEND_MSG_SUCCESS,
  SEND_MSG_FAILED,
} from "./actionsTypes";
import {
  baseUrl,
  checkResponse,
  tokenRequestOptions,
} from "../../utils/constants";
import type { AppThunk, AppDispatch } from "../store";

interface IfetchUserRequest {
  readonly type: typeof GET_USER_REQUEST;
}

interface IfetchUserSuccess {
  readonly type: typeof GET_USER_SUCCESS;
  readonly payload: { data: any };
}

interface IfetchUserFailed {
  readonly type: typeof GET_USER_FAILED;
  readonly payload: { error: {} };
}

interface IsetNoUser {
  readonly type: typeof SET_NO_USER;
}

interface IfetchUResumesRequest {
  readonly type: typeof GET_RESUMES_REQUEST;
}

interface IfetchResumesSuccess {
  readonly type: typeof GET_RESUMES_SUCCESS;
  readonly payload: { data: any };
}

interface IfetchResumesFailed {
  readonly type: typeof GET_RESUMES_FAILED;
  readonly payload: { error: {} };
}

interface IfetchSimilarVacanciesRequest {
  readonly type: typeof GET_SIMILAR_VACANCIES_REQUEST;
}

interface IfetchSimilarVacanciesSuccess {
  readonly type: typeof GET_SIMILAR_VACANCIES_SUCCESS;
  readonly payload: { data: any };
}

interface IfetchSimilarVacanciesFailed {
  readonly type: typeof GET_SIMILAR_VACANCIES_FAILED;
  readonly payload: { error: {} };
}

interface IsendMsgRequest {
  readonly type: typeof SEND_MSG_REQUEST;
}

interface IsendMsgSuccess {
  readonly type: typeof SEND_MSG_SUCCESS;
  readonly payload: { data: any };
}

interface IsendMsgFailed {
  readonly type: typeof SEND_MSG_FAILED;
  readonly payload: { error: {} };
}

export type TCommonActions =
  | IfetchUserRequest
  | IfetchUserSuccess
  | IfetchUserFailed
  | IsetNoUser
  | IfetchUResumesRequest
  | IfetchResumesSuccess
  | IfetchResumesFailed
  | IfetchSimilarVacanciesRequest
  | IfetchSimilarVacanciesSuccess
  | IfetchSimilarVacanciesFailed
  | IsendMsgRequest
  | IsendMsgSuccess
  | IsendMsgFailed;

export const fetchUserRequest = (): TCommonActions => ({
  type: GET_USER_REQUEST,
});

export const fetchUserSuccess = (data: any): TCommonActions => ({
  type: GET_USER_SUCCESS,
  payload: { data },
});

export const fetchUserFailed = (error: {}): TCommonActions => ({
  type: GET_USER_FAILED,
  payload: { error },
});

export const setNoUser = (): TCommonActions => ({
  type: SET_NO_USER,
});

export const fetchUResumesRequest = (): TCommonActions => ({
  type: GET_RESUMES_REQUEST,
});

export const fetchUResumesSuccess = (data: any): TCommonActions => ({
  type: GET_RESUMES_SUCCESS,
  payload: { data },
});

export const fetchUResumesFailed = (error: {}): TCommonActions => ({
  type: GET_RESUMES_FAILED,
  payload: { error },
});

export const fetchSimilarVacanciesRequest = (): TCommonActions => ({
  type: GET_SIMILAR_VACANCIES_REQUEST,
});

export const fetchSimilarVacanciesSuccess = (data: any): TCommonActions => ({
  type: GET_SIMILAR_VACANCIES_SUCCESS,
  payload: { data },
});

export const fetchSimilarVacanciesFailed = (error: {}): TCommonActions => ({
  type: GET_SIMILAR_VACANCIES_FAILED,
  payload: { error },
});

export const sendMsgRequest = (): TCommonActions => ({
  type: SEND_MSG_REQUEST,
});

export const sendMsgSuccess = (data: any): TCommonActions => ({
  type: SEND_MSG_SUCCESS,
  payload: { data },
});

export const sendMsgFailed = (error: {}): TCommonActions => ({
  type: SEND_MSG_FAILED,
  payload: { error },
});

export const getOwnUser: AppThunk<Promise<TCommonActions>> =
  (token) => (dispatch: AppDispatch) => {
    dispatch(fetchUserRequest());
    return fetch(
      `${baseUrl}/api/me`,
      tokenRequestOptions({ accessToken: token, method: "GET", bodyData: {} })
    )
      .then(checkResponse)
      .then((json) => {
        dispatch(fetchUserSuccess(json));
        return json;
      })
      .catch((error) => dispatch(fetchUserFailed(error)));
  };

export const getUserResumes: AppThunk<Promise<TCommonActions>> =
  (token) => (dispatch: AppDispatch) => {
    dispatch(fetchUResumesRequest());
    return fetch(
      `${baseUrl}/api/resumes/mine`,
      tokenRequestOptions({ accessToken: token, method: "GET", bodyData: {} })
    )
      .then(checkResponse)
      .then((json) => {
        dispatch(fetchUResumesSuccess(json));
        return json;
      })
      .catch((error) => dispatch(fetchUResumesFailed(error)));
  };

export const getUserVacancies: AppThunk<Promise<TCommonActions>> =
  (token, resume_id, page) => (dispatch: AppDispatch) => {
    dispatch(fetchSimilarVacanciesRequest());
    return fetch(
      `${baseUrl}/api/resumes/${resume_id}/similar_vacancies/${page}`,
      tokenRequestOptions({ accessToken: token, method: "GET", bodyData: {} })
    )
      .then(checkResponse)
      .then((json) => {
        dispatch(fetchSimilarVacanciesSuccess(json));
        return json;
      })
      .catch((error) => dispatch(fetchSimilarVacanciesFailed(error)));
  };

export const sendMessage: AppThunk<Promise<TCommonActions>> =
  (token, formData) => (dispatch: AppDispatch) => {
    dispatch(sendMsgRequest());
    return fetch(
      `${baseUrl}/api/negotiations`,
      tokenRequestOptions({
        accessToken: token,
        method: "GET",
        bodyData: formData,
      })
    )
      .then(checkResponse)
      .then((json) => {
        dispatch(sendMsgSuccess(json));
        return json;
      })
      .catch((error) => dispatch(sendMsgFailed(error)));
  };
