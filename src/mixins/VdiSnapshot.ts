import type { XoVdiSnapshot } from "@vates/types/xo"

import type { XoApiMixin } from "../XoApi.ts"
import { buildPathname } from "../utils/url.ts"
import { hrefToId } from "../utils/string.ts"

export default class VdiSnapshot {
    async getVdiSnapshots(): Promise<XoVdiSnapshot['id'][]>
    async getVdiSnapshots<Fields extends "*">(opts: { fields: Fields, filter?: string }): Promise<XoVdiSnapshot[]>
    async getVdiSnapshots<Fields extends readonly (keyof XoVdiSnapshot)[]>(opts: { fields: Fields, filter?: string }): Promise<(Pick<XoVdiSnapshot, Fields[number]>)[]>
    async getVdiSnapshots<Fields extends readonly (keyof XoVdiSnapshot)[] | '*'>(this: XoApiMixin, opts: { fields?: Fields, filter?: string } = {}) {
        const url = buildPathname('/vdi-snapshots', opts)
        const snapshots = await this._fetch<string[] | Partial<XoVdiSnapshot>[]>(url)
        if (opts.fields === undefined) {
            return snapshots.map((href) => hrefToId<XoVdiSnapshot>(href as string))
        }

        return snapshots
    }
}