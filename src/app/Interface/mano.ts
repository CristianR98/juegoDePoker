import { Carta } from './carta';

export interface Mano{
    cartas:Carta[]
    contador:number
    results:string[]
    ifColor:boolean
    ifEscalera:boolean
    cartasIgual:number[]
    iguales:string
    cartaAlta:Carta
    jugada:string
    nivelJugada:number
}

export class Mano {
    constructor(cartas) {
        this.cartas = cartas
        this.contador = 0
        this.results = []
        this.ifColor = false
        this.cartaAlta = new Carta()
        this.cartaAlta.valor = 0
        this.ifEscalera = false
        this.cartasIgual = []
        this.iguales
        this.jugada
        this.nivelJugada = 0
    }

    getJugada() {
        this.contador = 0
        this.getPaloJugada()
        for (let i = 0; i < this.cartas.length; i++) {
            if (this.cartaAlta.valor < this.cartas[i].valor) {
                this.cartaAlta = this.cartas[i]
            }
            this.getiguales(this.cartas[i])
            this.contador = 0
        }
        this.getEscalera(this.cartaAlta)
        if (this.ifEscalera && this.ifColor && this.cartaAlta.valor === 14) {
            this.jugada = 'Escalera Real!!!'
            this.nivelJugada = 100
        } else if (this.ifEscalera && this.ifColor) {
            this.jugada = 'Escalera Color!'
            this.nivelJugada = 90
        } else if (this.ifEscalera && !this.ifColor) {
            this.jugada = 'Escalera!'
            this.nivelJugada = 70
        } else if (!this.ifEscalera && this.ifColor) {
            this.jugada = 'Color!'
            this.nivelJugada = 50
        } else {
            if (!this.iguales) {
                this.jugada = 'Carta Alta'
                this.cartaAlta.clase += ' carta-jugada'
                this.nivelJugada = 10
            } else {
                this.jugada = this.iguales
                switch (this.jugada) {
                    case 'Poker!':
                        this.nivelJugada = 80
                        break;
                    case 'Full!':
                        this.nivelJugada = 60
                        break;
                    case 'Trio!':
                        this.nivelJugada = 40
                        break;
                    case 'Doble pareja!':
                        this.nivelJugada = 30
                        break;
                    case 'Pareja!':
                        this.nivelJugada = 20
                        break;
                }
            }
        }
        this.contador = 0
        console.log(this.nivelJugada)
        return this.jugada
    }

    private getPaloJugada() {
        let result = this.cartas.map((carta) => {
            if (carta.palo == this.cartas[0].palo) {
                return true
            } else {
                return false
            }
        })
        if (result.indexOf(false) > -1) {
            this.ifColor = false
        } else {
            this.ifColor = true
        }
    }

    private getEscalera(cartaMasAlta) {
        let result = this.cartas.find((carta) => {
            return cartaMasAlta.valor - 1 == carta.valor
        })
        if (result && this.contador < 4) {
            this.contador++
                this.getEscalera(result)
        } else if (this.contador == 4) {
            this.ifEscalera = true
        } else {
            this.ifEscalera = false
        }
    }

    private getiguales(carta:Carta) {
        for (let i = 0; i < this.cartas.length; i++) {
            if (carta.valor == this.cartas[i].valor) {
                this.contador++
                if(this.contador > 1) {
                    if (!(this.cartasIgual.indexOf(carta.valor) > -1) ) {
                        this.cartasIgual.push(carta.valor)
                    }
                    if ( carta.clase !== `${carta.color} carta-jugada`) {
                        carta.clase += ' carta-jugada'
                    }
                }else{
                    carta.clase = ' ' + carta.color
                }
            }
        }

        if (this.contador === 4) {
            this.results.push('poker')
        } else if (this.contador === 3) {
            this.results.push('trio')
        } else if (this.contador === 2) {
            this.results.push('pareja')
        }

        if (this.results.indexOf('poker') > -1) {
            this.iguales = "Poker!"
        } else if (this.results.indexOf('trio') > -1) {
            if (this.results.indexOf('pareja') > -1) {
                this.iguales = "Full!"
            } else {
                this.iguales = "Trio!"
            }
        } else if (this.results.indexOf('pareja') > -1) {
            let parejas = 0
            for (let y = 0; y < this.results.length; y++) {
                if (this.results[y] == 'pareja') {
                    parejas++
                }
            }
            if (parejas > 2) {
                this.iguales = "Doble pareja!"
            } else {
                this.iguales = "Pareja!"
            }
        } else {
            this.iguales = ''
        }
    }
}