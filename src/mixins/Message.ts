import type { XoMessage } from "@vates/types/xo"

import type { XoApiMixin } from "../XoApi.ts"
import { buildPathname } from "../utils/url.ts"
import { hrefToId } from "../utils/string.ts"

export default class Message {
    async getMessages(): Promise<XoMessage['id'][]>
    async getMessages<Fields extends "*">(opts: { fields: Fields, filter?: string }): Promise<XoMessage[]>
    async getMessages<Fields extends readonly (keyof XoMessage)[]>(opts: { fields: Fields, filter?: string }): Promise<(Pick<XoMessage, Fields[number]>)[]>
    async getMessages<Fields extends readonly (keyof XoMessage)[] | '*'>(this: XoApiMixin, opts: { fields?: Fields, filter?: string } = {}) {
        const url = buildPathname('/messages', opts)
        const messages = await this._fetch<string[] | Partial<XoMessage>[]>(url)
        if (opts.fields === undefined) {
            return messages.map((href) => hrefToId<XoMessage>(href as string))
        }

        return messages
    }
}   