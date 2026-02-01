import type { XoVm } from "@vates/types/xo"

import type { XoApiMixin } from "../XoApi.ts"
import { buildPathname } from "../utils/url.ts"
import { hrefToId } from "../utils/string.ts"

export default class Vm {
    async getVms(): Promise<XoVm['id'][]>
    async getVms<Fields extends "*">(opts: { fields: Fields, filter?: string }): Promise<XoVm[]>
    async getVms<Fields extends readonly (keyof XoVm)[]>(opts: { fields: Fields, filter?: string }): Promise<(Pick<XoVm, Fields[number]>)[]>
    async getVms<Fields extends readonly (keyof XoVm)[] | '*'>(this: XoApiMixin, opts: { fields?: Fields, filter?: string } = {}) {
        const url = buildPathname('/vms', opts)
        const vms = await this._fetch<string[] | Partial<XoVm>[]>(url)
        if (opts.fields === undefined) {
            return vms.map((href) => hrefToId<XoVm>(href as string))
        }

        return vms as XoVm[]
    }
}