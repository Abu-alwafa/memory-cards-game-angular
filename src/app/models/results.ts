export class Results {
  constructor(private readonly tot: number, private readonly suc: number, private readonly hintUsingCount) { }
  private readonly messages: any[] = [
    'Sorry, good luck',
    'Not Bad',
    'Good',
    'ُExcellent',
    'Perfect'
  ]
  private setBackgroundColor(m: string, arr: any[]) {
    if (m === arr[0]) return '#871c1c'
    else if (m === arr[1]) return '#b02a00'
    else if (m === arr[2]) return '#cc8800'
    else if (m === arr[3]) return '#3b9700'
    else return '#004a85'
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