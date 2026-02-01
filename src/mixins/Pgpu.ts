import type { XoPgpu } from "@vates/types/xo"

import type { XoApiMixin } from "../XoApi.ts"
import { buildPathname } from "../utils/url.ts"
import { hrefToId } from "../utils/string.ts"

export default class Pgpu {
    async getPgpus(): Promise<XoPgpu['id'][]>
    async getPgpus<Fields extends "*">(opts: { fields: Fields, filter?: string }): Promise<XoPgpu[]>
    async getPgpus<Fields extends readonly (keyof XoPgpu)[]>(opts: { fields: Fields, filter?: string }): Promise<(Pick<XoPgpu, Fields[number]>)[]>
    async getPgpus<Fields extends readonly (keyof XoPgpu)[] | '*'>(this: XoApiMixin, opts: { fields?: Fields, filter?: string } = {}) {
        const url = buildPathname('/pgpus', opts)
        const pgpus = await this._fetch<string[] | Partial<XoPgpu>[]>(url)
        if (opts.fields === undefined) {
            return pgpus.map((href) => hrefToId<XoPgpu>(href as string))
        }

        return pgpus
    }
}   