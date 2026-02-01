import type { XoVmSnapshot } from "@vates/types/xo"

import type { XoApiMixin } from "../XoApi.ts"
import { buildPathname } from "../utils/url.ts"
import { hrefToId } from "../utils/string.ts"

export default class VmSnapshot {
    async getVmSnapshots(): Promise<XoVmSnapshot['id'][]>
    async getVmSnapshots<Fields extends "*">(opts: { fields: Fields, filter?: string }): Promise<XoVmSnapshot[]>
    async getVmSnapshots<Fields extends readonly (keyof XoVmSnapshot)[]>(opts: { fields: Fields, filter?: string }): Promise<(Pick<XoVmSnapshot, Fields[number]>)[]>
    async getVmSnapshots<Fields extends readonly (keyof XoVmSnapshot)[] | '*'>(this: XoApiMixin, opts: { fields?: Fields, filter?: string } = {}) {
        const url = buildPathname('/vm-snapshots', opts)
        const snapshots = await this._fetch<string[] | Partial<XoVmSnapshot>[]>(url)
        if (opts.fields === undefined) {
            return snapshots.map((href) => hrefToId<XoVmSnapshot>(href as string))
        }

        return snapshots
    }
}