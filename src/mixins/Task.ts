import type { XoTask } from "@vates/types/xo"

import type { XoApiMixin } from "../XoApi.ts"
import { buildPathname } from "../utils/url.ts"
import { hrefToId } from "../utils/string.ts"

export default class Task {
    async getTasks(): Promise<XoTask['id'][]>
    async getTasks<Fields extends "*">(opts: { fields: Fields, filter?: string }): Promise<XoTask[]>
    async getTasks<Fields extends readonly (keyof XoTask)[]>(opts: { fields: Fields, filter?: string }): Promise<(Pick<XoTask, Fields[number]>)[]>
    async getTasks<Fields extends readonly (keyof XoTask)[] | '*'>(this: XoApiMixin, opts: { fields?: Fields, filter?: string } = {}) {
        const url = buildPathname('/tasks', opts)
        const tasks = await this._fetch<string[] | Partial<XoTask>[]>(url)
        if (opts.fields === undefined) {
            return tasks.map((href) => hrefToId<XoTask>(href as string))
        }

        return tasks
    }
}   