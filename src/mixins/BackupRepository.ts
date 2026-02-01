import type { XoBackupRepository } from "@vates/types/xo"

import type { XoApiMixin } from "../XoApi.ts"
import { buildPathname } from "../utils/url.ts"
import { hrefToId } from "../utils/string.ts"

export default class BackupRepository {
    async getBackupRepositories(): Promise<XoBackupRepository['id'][]>
    async getBackupRepositories<Fields extends "*">(opts: { fields: Fields, filter?: string }): Promise<XoBackupRepository[]>
    async getBackupRepositories<Fields extends readonly (keyof XoBackupRepository)[]>(opts: { fields: Fields, filter?: string }): Promise<(Pick<XoBackupRepository, Fields[number]>)[]>
    async getBackupRepositories<Fields extends readonly (keyof XoBackupRepository)[] | '*'>(this: XoApiMixin, opts: { fields?: Fields, filter?: string } = {}) {
        const url = buildPathname('/backup-repositories', opts)
        const backupRepositories = await this._fetch<string[] | Partial<XoBackupRepository>[]>(url)
        if (opts.fields === undefined) {
            return backupRepositories.map((href) => hrefToId<XoBackupRepository>(href as string))
        }

        return backupRepositories
    }
}   