import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WalletService {
  // public ethereum;
  public selectedAccount : Subject<string> = new Subject<string>();
  public ethereum = window['ethereum'];

  constructor() {
    console.log('wallet service');
    // Listen for account changes
    this.ethereum.on('accountsChanged', (newAccounts: string[]) => {
      console.log("🚀 ~ file: wallet.service.ts:18 ~ WalletService ~ this.ethereum.on ~ newAccounts:", newAccounts)
      this.checkWalletConnected();
    });
  }

  public async getAccount() {
    const accounts = await this.ethereum.enable();
    const account = accounts[0];
    console.log("🚀 ~ file: wallet.service.ts:30 ~ WalletService ~ getAccount ~ account:", account)
    return account;
  }
  
  

  public connectWallet = async () => {
    try {
      if(!this.ethereum) return alert("Please install meta mask");
      await this.ethereum.enable();
      const accounts = await this.ethereum.request({method: 'eth_requestAccounts'});
      this.selectedAccount.next(accounts[0]);
    } catch(e) {
      throw new Error("No thereum object found")
    }
  }

  public checkWalletConnected = async () => {
    try{
      if(!this.ethereum) return alert("Please install meta mask ")
      const accounts = await this.ethereum.request({method: 'eth_accounts'});
      this.selectedAccount.next(accounts[0]);
      return accounts[0];
    }
    catch(e){
      throw new Error("No ethereum object found");
    }
  }
}
