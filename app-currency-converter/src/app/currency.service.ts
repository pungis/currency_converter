import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { ExchangeRate } from './currency.interface.ts';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrlA = 'https://api.nbp.pl/api/exchangerates/tables/A';
  private apiUrlB = 'https://api.nbp.pl/api/exchangerates/tables/B';

  constructor(private http: HttpClient) { }

  getExchangeRates(date?: string): Observable<{ rates: ExchangeRate[] }[][]> {
    const formattedDate = date ? new Date(date).toISOString().split('T')[0] : '';
    const urlA = formattedDate ? `${this.apiUrlA}/${formattedDate}?format=json` : `${this.apiUrlA}?format=json`;
    const urlB = formattedDate ? `${this.apiUrlB}/${formattedDate}?format=json` : `${this.apiUrlB}?format=json`;
    
    return forkJoin([
      this.http.get<{ rates: ExchangeRate[] }[]>(urlA),
      this.http.get<{ rates: ExchangeRate[] }[]>(urlB)
    ]);
  }
}