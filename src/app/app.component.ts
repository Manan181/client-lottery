import { Component, NgZone } from '@angular/core';
import { ApiService } from './services/api.service';
import { WalletService } from './services/wallet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Lottery';
  totalPlayers = 0;
  recentWinner = '0x';
  public walletConnected: boolean = false;
  public walletId: string = '';
  enterLotteryLoading: boolean = false;
  connectedAccountSubscription: any;

  constructor(
    private api: ApiService,
    private walletService: WalletService,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.connectedAccountSubscription = this.walletService.selectedAccount.subscribe((account) => {
      this.ngZone.run(() => {
        this.walletId = account;
        this.walletConnected = true;
      });
    });
    this.getTotalPlayers();
  }

  connectToWallet() {
    this.walletService.connectWallet();
  }

  async checkWalletConnected() {
    const account = await this.walletService.checkWalletConnected();
    if(account) {
      this.walletConnected = true;
      this.walletId = account;
    }
  }

  public getTotalPlayers() {
    this.api.getTotalPlayers().subscribe((data) => {
      this.totalPlayers = Number(data.data.numberOfPlayers);
    });
  }

  public getRecentWinner() {
    this.api.getRecentWinner().subscribe((data) => {
      this.recentWinner = data.data;
    });
  }

  public enterLottery() {
    this.enterLotteryLoading = true;
    this.api.enterLottery(this.walletId).subscribe((data) => {
      if (data.message === 'Success') {
        this.enterLotteryLoading = false;
        alert('You have successfully entered the lottery!');
        this.getTotalPlayers();
      }
    });
  }
}
