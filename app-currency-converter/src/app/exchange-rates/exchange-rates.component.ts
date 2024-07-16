import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { CurrencyService } from '../currency.service';
import { FormsModule } from '@angular/forms';
import { ExchangeRate } from '../currency.interface.ts';

@Component({
  selector: 'app-exchange-rates',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.css']
})
export class ExchangeRatesComponent implements OnInit {
  exchangeRates: ExchangeRate[] = [];
  selectedDate: string = '';
  minDate: string = formatDate(new Date('2002-01-02'), 'yyyy-MM-dd', 'en-US');
  maxDate: string = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  amount: number = 0;
  fromCurrency: string = 'PLN';
  toCurrency: string = 'PLN';
  convertedAmount: number = 0;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.fetchExchangeRates();
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  fetchExchangeRates(date?: string): void {
    this.currencyService.getExchangeRates(date).subscribe(
      (data: { rates: ExchangeRate[] }[][]) => {
        const ratesA = data[0][0].rates;
        const ratesB = data[1][0].rates;
        this.exchangeRates = [...ratesA, ...ratesB];
      },
      (error: any) => {
        console.error('Error fetching exchange rates', error);
      }
    );
  }

  onDateChange(): void {
    this.fetchExchangeRates(this.selectedDate);
  }

  preventInvalidDateSelection(event: KeyboardEvent): void {
    event.preventDefault();
  }

}