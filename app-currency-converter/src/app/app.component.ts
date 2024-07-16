import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangeRatesComponent } from './exchange-rates/exchange-rates.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ExchangeRatesComponent,
    CurrencyConverterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'currency-converter';
}
