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
} from "../actions/actionsTypes";
import { IApplicationActions } from "../actions";

export type TCommonState = {
  getUserRequest: boolean;
  getUserFailed: boolean;
  getUserSuccess: boolean;
  user: any;
  getResumesRequest: boolean;
  getResumesFailed: boolean;
  getResumesSuccess: boolean;
  resumes: any;
  getSimilarVacanciesRequest: boolean;
  getSimilarVacanciesFailed: boolean;
  getSimilarVacanciesSuccess: boolean;
  similarVacancies: any;
  sendMsgRequest: boolean;
  sendMsgFailed: boolean;
  sendMsgSuccess: boolean;
};

const initialState = {
  getUserRequest: false,
  getUserFailed: false,
  getUserSuccess: false,
  user: {},
  getResumesRequest: false,
  getResumesFailed: false,
  getResumesSuccess: false,
  resumes: [],
  getSimilarVacanciesRequest: false,
  getSimilarVacanciesFailed: false,
  getSimilarVacanciesSuccess: false,
  similarVacancies: [],
  sendMsgRequest: false,
  sendMsgFailed: false,
  sendMsgSuccess: false,
};

export const commonReducer = (
  state: TCommonState = initialState,
  action: IApplicationActions,
) => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
      };
    }

    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserRequest: false,
        getUserSuccess: true,
        user: action.payload.data,
      };
    }

    case GET_USER_FAILED: {
      return {
        ...state,
        getUserFailed: true,
        getUserRequest: false,
        getUserSuccess: false,
        user: {},
      };
    }

    case SET_NO_USER: {
      return {
        ...state,
        user: {},
      };
    }

    case GET_RESUMES_REQUEST: {
      return {
        ...state,
        getResumesRequest: true,
      };
    }

    case GET_RESUMES_SUCCESS: {
      return {
        ...state,
        getResumesRequest: false,
        getResumesSuccess: true,
        resumes: action.payload.data,
      };
    }

    case GET_RESUMES_FAILED: {
      return {
        ...state,
        getResumesFailed: true,
        getResumesRequest: false,
        getResumesSuccess: false,
        resumes: {},
      };
    }

    case GET_SIMILAR_VACANCIES_REQUEST: {
      return {
        ...state,
        getSimilarVacanciesRequest: true,
      };
    }

    case GET_SIMILAR_VACANCIES_SUCCESS: {
      return {
        ...state,
        getSimilarVacanciesRequest: false,
        getSimilarVacanciesSuccess: true,
        similarVacancies: action.payload.data,
      };
    }

    case GET_SIMILAR_VACANCIES_FAILED: {
      return {
        ...state,
        getSimilarVacanciesFailed: true,
        getSimilarVacanciesRequest: false,
        getSimilarVacanciesSuccess: false,
        similarVacancies: {},
      };
    }

    case  SEND_MSG_REQUEST: {
      return {
        ...state,
        sendMsgRequest: true,
      };
    }

    case  SEND_MSG_SUCCESS: {
      return {
        ...state,
        sendMsgRequest: false,
        sendMsgSuccess: true,
      };
    }

    case  SEND_MSG_FAILED: {
      return {
        ...state,
        sendMsgFailed: true,
        sendMsgRequest: false,
        sendMsgSuccess: false,
      };
    }

    default:
      return state;
  }
};
