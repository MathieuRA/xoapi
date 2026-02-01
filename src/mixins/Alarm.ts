import type { XoAlarm } from "@vates/types/xo"

import type { XoApiMixin } from "../XoApi.ts"
import { buildPathname } from "../utils/url.ts"
import { hrefToId } from "../utils/string.ts"

export default class Alarm {
    async getAlarms(): Promise<XoAlarm['id'][]>
    async getAlarms<Fields extends "*">(opts: { fields: Fields, filter?: string }): Promise<XoAlarm[]>
    async getAlarms<Fields extends readonly (keyof XoAlarm)[]>(opts: { fields: Fields, filter?: string }): Promise<(Pick<XoAlarm, Fields[number]>)[]>
    async getAlarms<Fields extends readonly (keyof XoAlarm)[] | '*'>(this: XoApiMixin, opts: { fields?: Fields, filter?: string } = {}) {
        const url = buildPathname('/alarms', opts)
        const alarms = await this._fetch<string[] | Partial<XoAlarm>[]>(url)
        if (opts.fields === undefined) {
            return alarms.map((href) => hrefToId<XoAlarm>(href as string))
        }

        return alarms
    }
}   