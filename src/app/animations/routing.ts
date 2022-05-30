import { animate, query, style, transition, trigger, group } from "@angular/animations";



export const routing = trigger('routingAnim', [
  transition('* <=> *', [
    group([
      query(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(500, style({ transform: 'translateX(0)', opacity: 1 }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate(500, style({ transform: 'translateX(-100%)', opacity: 0 }))
      ], { optional: true })
    ])
  ])
])