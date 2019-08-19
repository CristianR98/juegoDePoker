export interface Carta{
    valor:number
    simbolo:string
    palo:string
    color:string
    clase:string
}

export class Carta {
    constructor() {
        this.valor = Math.ceil(Math.random() * 13) + 1
        this.simbolo = this.getSimbolo()
        this.palo = this.getPalo()
        this.color = this.getColor()
        this.clase = `${this.color} `
    }


    getSimbolo() {
        let simbolo
        switch (this.valor) {
            case 13:
                simbolo = 'K'
                break
            case 12:
                simbolo = 'Q'
                break
            case 11:
                simbolo = 'J'
                break
            case 14:
                simbolo = 'A'
                break
            default:
                simbolo = this.valor
        }
        return simbolo
    }

    getPalo() {
        let num = Math.ceil(Math.random() * 4),
            palo
        switch (num) {
            case 1:
                palo = '♥'
                break
            case 2:
                palo = '♦'
                break
            case 3:
                palo = '♣'
                break
            case 4:
                palo = '♠'
                break
        }
        return palo
    }
    
    getColor() {
        if (this.palo == '♥' || this.palo == '♦') {
            return 'red'
        } else {
            return 'black'
        }
    }
}