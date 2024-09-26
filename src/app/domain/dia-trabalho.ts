import { Time } from "@angular/common";

export class DiaTrabalho {
    id: Number | null = null;
    dia_da_semana: Number = 0
    trabalha : boolean = false
    horario_inicial: Time | null = null
    horario_final: Time | null = null
    horario_almoco: Time | null = null
    duracao_almoco: Number | null = null
    
    constructor(){}

}
