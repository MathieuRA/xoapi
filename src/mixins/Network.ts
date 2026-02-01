import type { XoNetwork } from "@vates/types/xo"

import type { XoApiMixin } from "../XoApi.ts"
import { buildPathname } from "../utils/url.ts"
import { hrefToId } from "../utils/string.ts"

export default class Network {
    async getNetworks(): Promise<XoNetwork['id'][]>
    async getNetworks<Fields extends "*">(opts: { fields: Fields, filter?: string }): Promise<XoNetwork[]>
    async getNetworks<Fields extends readonly (keyof XoNetwork)[]>(opts: { fields: Fields, filter?: string }): Promise<(Pick<XoNetwork, Fields[number]>)[]>
    async getNetworks<Fields extends readonly (keyof XoNetwork)[] | '*'>(this: XoApiMixin, opts: { fields?: Fields, filter?: string } = {}) {
        const url = buildPathname('/networks', opts)
        const networks = await this._fetch<string[] | Partial<XoNetwork>[]>(url)
        if (opts.fields === undefined) {
            return networks.map((href) => hrefToId<XoNetwork>(href as string))
        }

        return networks
    }
}