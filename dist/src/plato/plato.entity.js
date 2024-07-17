import crypto from 'node:crypto';
export class Plato {
    constructor(name, platoClass, level, hp, mana, attack, 
    //public items: string[],
    id = crypto.randomUUID()) {
        this.name = name;
        this.platoClass = platoClass;
        this.level = level;
        this.hp = hp;
        this.mana = mana;
        this.attack = attack;
        this.id = id;
    }
}
//# sourceMappingURL=plato.entity.js.map