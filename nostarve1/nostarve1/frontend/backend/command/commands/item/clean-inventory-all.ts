import Player from "../../../entities/player";
import {Permissions} from "../../../enums/permissions";
import {Server} from "../../../server";

export const identifiers = ["sil sil", "clean-inventory-all"];
export const permission = Permissions.OWNER;
export function run(player: Player, args: string[]) {
    for (const player of this.server.alivePlayers) {
        player.inventory.clear(true);
    }

    return [true, "Cleared inventory from " + this.server.alivePlayers.length + " players"];
}