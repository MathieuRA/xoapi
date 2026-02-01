import type { XoVmTemplate } from "@vates/types/xo"

import type { XoApiMixin } from "../XoApi.ts"
import { buildPathname } from "../utils/url.ts"
import { hrefToId } from "../utils/string.ts"

export default class VmTemplate {
    async getVmTemplates(): Promise<XoVmTemplate['id'][]>
    async getVmTemplates<Fields extends "*">(opts: { fields: Fields, filter?: string }): Promise<XoVmTemplate[]>
    async getVmTemplates<Fields extends readonly (keyof XoVmTemplate)[]>(opts: { fields: Fields, filter?: string }): Promise<(Pick<XoVmTemplate, Fields[number]>)[]>
    async getVmTemplates<Fields extends readonly (keyof XoVmTemplate)[] | '*'>(this: XoApiMixin, opts: { fields?: Fields, filter?: string } = {}) {
        const url = buildPathname('/vm-templates', opts)
        const templates = await this._fetch<string[] | Partial<XoVmTemplate>[]>(url)
        if (opts.fields === undefined) {
            return templates.map((href) => hrefToId<XoVmTemplate>(href as string))
        }

        return templates
    }
}