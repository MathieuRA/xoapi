import type { XoBackupRepository, XoVmBackupArchive } from "@vates/types/xo"

import type { XoApiMixin } from "../XoApi.ts"
import { buildPathname } from "../utils/url.ts"
import { hrefToId } from "../utils/string.ts"

export default class BackupArchive {
    async getBackupArchives(): Promise<XoVmBackupArchive['id'][]>
    async getBackupArchives<Fields extends "*">(opts: { backupRepositories?: XoBackupRepository['id'][], fields: Fields, filter?: string }): Promise<XoVmBackupArchive[]>
    async getBackupArchives<Fields extends readonly (keyof XoVmBackupArchive)[]>(opts: { backupRepositories?: XoBackupRepository['id'][], fields: Fields, filter?: string }): Promise<(Pick<XoVmBackupArchive, Fields[number]>)[]>
    async getBackupArchives<Fields extends readonly (keyof XoVmBackupArchive)[] | '*'>(this: XoApiMixin, { backupRepositories, ...opts }: { backupRepositories?: XoBackupRepository['id'][], fields?: Fields, filter?: string } = {}) {
        const backupReposities = backupRepositories ?? "*"

        const url = buildPathname('/backup-archives', { ...opts, backupRepository: backupReposities })
        const backupArchives = await this._fetch<string[] | Partial<XoVmBackupArchive>[]>(url)
        if (opts.fields === undefined) {
            return backupArchives.map((href) => hrefToId<XoVmBackupArchive>(href as string))
        }

        return backupArchives
    }
}   