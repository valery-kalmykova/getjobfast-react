import { Injectable, ForbiddenException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, catchError } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private httpService: HttpService) {}

  async getUser(token: string) {
    const bearerToken = `Bearer ${token}`;
    const config = { Authorization: bearerToken };
    return this.httpService
      .get('https://api.hh.ru/me', {
        headers: config,
      })
      .pipe(map((res) => res.data))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );
  }

  async getResumes(token: string) {
    const bearerToken = `Bearer ${token}`;
    const config = { Authorization: bearerToken };
    return this.httpService
      .get('https://api.hh.ru/resumes/mine', {
        headers: config,
      })
      .pipe(map((res) => res.data))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );
  }

  async getVacanciesSimilarToResume(token: string, resumes_id: string) {
    const bearerToken = `Bearer ${token}`;
    const config = { Authorization: bearerToken };
    return this.httpService
      .get(
        `https://api.hh.ru/resumes/${resumes_id}/similar_vacancies?per_page=50`,
        { headers: config },
      )
      .pipe(
        map((res) => {
          const vacanies = res.data.items;
          return vacanies;
        }),
      )
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );
  }

  async sendNegotiation(token: string, body: any) {
    const bearerToken = `Bearer ${token}`;
    const config = {
      Authorization: bearerToken,
      'Content-Type': 'multipart/form-data',
    };
    return this.httpService
      .post(`https://api.hh.ru/negotiations`, body, {
        headers: config,
      })
      .pipe(map((res) => res.data))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );
  }
}
