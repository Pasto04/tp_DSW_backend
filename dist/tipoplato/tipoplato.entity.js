import crypto from 'node:crypto';
export class TipoPlato {
    constructor(name, tipoplatoClass, level, hp, mana, attack, 
    //public items: string[],
    id = crypto.randomUUID()) {
        this.name = name;
        this.tipoplatoClass = tipoplatoClass;
        this.level = level;
        this.hp = hp;
        this.mana = mana;
        this.attack = attack;
        this.id = id;
    }
}
//# sourceMappingURL=tipoplato.entity.js.map