import { AgendamentoFixo } from "./agendamento-fixo"
import { DiaTrabalho } from "./dia-trabalho"

export class Barbeiro {
    id: Number | null = null
    nome: string = ""
    email: string = ""
    dias_trabalho: Array<DiaTrabalho> = []
    agendamentos_fixos: Array<AgendamentoFixo> = []

    constructor(){}
}
