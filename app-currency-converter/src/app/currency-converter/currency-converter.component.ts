import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyService } from '../currency.service';
import { ExchangeRate } from '../currency.interface.ts';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit {
  exchangeRates: any[] = [];
  amount = 1000;
  fromCurrency ='PLN';
  toCurrency = 'EUR';
  result!: number;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.fetchExchangeRates();
  }

  fetchExchangeRates(date?: string): void {
    this.currencyService.getExchangeRates(date).subscribe(
      (data: { rates: ExchangeRate[] }[][]) => {
        const ratesA = data[0][0].rates;
        const ratesB = data[1][0].rates;
        this.exchangeRates = [{ currency: 'polski złoty', code: 'PLN', mid: 1 }, ...ratesA, ...ratesB];
        this.convertCurrency();
      },
      (error: any) => {
        console.error('Error fetching exchange rates', error);
      }
    );
  }

  convertCurrency(): void {
    const fromRate = this.exchangeRates.find(rate => rate.code === this.fromCurrency).mid;
    const toRate = this.exchangeRates.find(rate => rate.code === this.toCurrency).mid;
    this.result = (this.amount * fromRate) / toRate;
  }
}
