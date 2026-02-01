import type { XoUser } from "@vates/types/xo"

import type { XoApiMixin } from "../XoApi.ts"
import { buildPathname } from "../utils/url.ts"
import { hrefToId } from "../utils/string.ts"

export default class User {
    async getUsers(): Promise<XoUser['id'][]>
    async getUsers<Fields extends "*">(opts: { fields: Fields, filter?: string }): Promise<XoUser[]>
    async getUsers<Fields extends readonly (keyof XoUser)[]>(opts: { fields: Fields, filter?: string }): Promise<(Pick<XoUser, Fields[number]>)[]>
    async getUsers<Fields extends readonly (keyof XoUser)[] | '*'>(this: XoApiMixin, opts: { fields?: Fields, filter?: string } = {}) {
        const url = buildPathname('/users', opts)
        const users = await this._fetch<string[] | Partial<XoUser>[]>(url)
        if (opts.fields === undefined) {
            return users.map((href) => hrefToId<XoUser>(href as string))
        }

        return users
    }
}   