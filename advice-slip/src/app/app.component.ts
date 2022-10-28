import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IAdvice } from './model/advice.model';
import { AdviceService } from './service/advice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'advice-slip';
  subscription: Subscription = new Subscription();
  randomAdvice!: IAdvice;

  constructor(private adviceService: AdviceService) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getRandomAdvice();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

  getRandomAdvice() {
    this.subscription.add(
      this.adviceService.getRandomAdvice().subscribe({
        next: (res) => {
          this.randomAdvice = res;
        },
      })
    );
  }
}
