import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiURL = "http://127.0.0.1:8000/api/"; //YOUR API URL

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(public http: HttpClient) { }

  getTotalPlayers(): Observable<any> {
    return this.http.get(this.apiURL + 'getNumberOfPlayers', this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  };

  getRecentWinner(): Observable<any> {
    return this.http.get(this.apiURL + 'getRecentWinner', this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  };

  enterLottery(walletId): Observable<any> {
    return this.http.post(this.apiURL + 'enterRaffle', { playerAddress: walletId }, this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: {
    error: {
      message: string;
    }; status: any; message: any;
  }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  };
}
