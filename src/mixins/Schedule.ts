import type { XoSchedule } from "@vates/types/xo"

import type { XoApiMixin } from "../XoApi.ts"
import { buildPathname } from "../utils/url.ts"
import { hrefToId } from "../utils/string.ts"

export default class Schedule {
    async getSchedules(): Promise<XoSchedule['id'][]>
    async getSchedules<Fields extends "*">(opts: { fields: Fields, filter?: string }): Promise<XoSchedule[]>
    async getSchedules<Fields extends readonly (keyof XoSchedule)[]>(opts: { fields: Fields, filter?: string }): Promise<(Pick<XoSchedule, Fields[number]>)[]>
    async getSchedules<Fields extends readonly (keyof XoSchedule)[] | '*'>(this: XoApiMixin, opts: { fields?: Fields, filter?: string } = {}) {
        const url = buildPathname('/schedules', opts)
        const schedules = await this._fetch<string[] | Partial<XoSchedule>[]>(url)
        if (opts.fields === undefined) {
            return schedules.map((href) => hrefToId<XoSchedule>(href as string))
        }

        return schedules
    }
}   