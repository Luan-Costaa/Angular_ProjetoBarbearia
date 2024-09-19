import { Time } from "@angular/common"
import { Servico } from "./servico"

export class AgendamentoFixo {
    id: Number | null = null
    dia_da_semana: Number | null = null
    nome_cliente: string = ""
    horario: Time | null = null
    tel_cliente: string = ""
    tempo:Number | null = null
    total: Number = 0
    servicos : Array<Servico> = []

    constructor(){}
}
