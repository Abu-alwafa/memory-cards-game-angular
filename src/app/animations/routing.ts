import { animate, query, style, transition, trigger, group } from "@angular/animations";



export const routing = trigger('routingAnim', [
  transition('* => *', [
    group([
      query(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate(300, style({ transform: 'translateX(0)' }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0)' }),
        animate(300, style({ transform: 'translateX(-100%)' }))
      ], { optional: true })
    ])
  ])
])