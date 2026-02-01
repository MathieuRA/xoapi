import type { XoVmController } from "@vates/types/xo"

import type { XoApiMixin } from "../XoApi.ts"
import { buildPathname } from "../utils/url.ts"
import { hrefToId } from "../utils/string.ts"

export default class VmController {
    async getVmControllers(): Promise<XoVmController['id'][]>
    async getVmControllers<Fields extends "*">(opts: { fields: Fields, filter?: string }): Promise<XoVmController[]>
    async getVmControllers<Fields extends readonly (keyof XoVmController)[]>(opts: { fields: Fields, filter?: string }): Promise<(Pick<XoVmController, Fields[number]>)[]>
    async getVmControllers<Fields extends readonly (keyof XoVmController)[] | '*'>(this: XoApiMixin, opts: { fields?: Fields, filter?: string } = {}) {
        const url = buildPathname('/vm-controllers', opts)
        const controllers = await this._fetch<string[] | Partial<XoVmController>[]>(url)
        if (opts.fields === undefined) {
            return controllers.map((href) => hrefToId<XoVmController>(href as string))
        }

        return controllers
    }
}