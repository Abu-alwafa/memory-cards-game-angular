export class Results {
  constructor(private readonly tot: number, private readonly suc: number, private readonly hintUsingCount) { }
  private readonly messages: any[] = [
    'Good luck',
    'Not Bad',
    'Good',
    'ُExcellent',
    'Perfect'
  ]
  private setBackgroundColor(m: string, arr: any[]) {
    if (m === arr[0]) return '#0000008a'
    else if (m === arr[1]) return '#e91e63'
    else if (m === arr[2]) return '#f44336'
    else if (m === arr[3]) return 'green'
    else return '#673ab7'
  }
  private sendMessage(p: number) {
    if (p < 40) return this.messages[0]
    else if (p < 60) return this.messages[1]
    else if (p < 80) return this.messages[2]
    else if (p < 95) return this.messages[3]
    else return this.messages[4]
  }
  succeeded = this.suc;
  total = this.tot + this.hintUsingCount;
  failed = this.total - this.succeeded;
  percent: number = Math.round((this.succeeded / this.total) * 100)
  message: string = this.sendMessage(this.percent)

  backgroundColor: string = this.setBackgroundColor(this.message, this.messages)

}