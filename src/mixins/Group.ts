import type { XoGroup } from "@vates/types/xo"

import type { XoApiMixin } from "../XoApi.ts"
import { buildPathname } from "../utils/url.ts"
import { hrefToId } from "../utils/string.ts"

export default class Group {
    async getGroups(): Promise<XoGroup['id'][]>
    async getGroups<Fields extends "*">(opts: { fields: Fields, filter?: string }): Promise<XoGroup[]>
    async getGroups<Fields extends readonly (keyof XoGroup)[]>(opts: { fields: Fields, filter?: string }): Promise<(Pick<XoGroup, Fields[number]>)[]>
    async getGroups<Fields extends readonly (keyof XoGroup)[] | '*'>(this: XoApiMixin, opts: { fields?: Fields, filter?: string } = {}) {
        const url = buildPathname('/groups', opts)
        const groups = await this._fetch<string[] | Partial<XoGroup>[]>(url)
        if (opts.fields === undefined) {
            return groups.map((href) => hrefToId<XoGroup>(href as string))
        }

        return groups
    }
}   