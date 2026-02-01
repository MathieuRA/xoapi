import type { AnyXoBackupJob, XoMetadataBackupJob, XoMirrorBackupJob, XoVm, XoVmBackupJob } from "@vates/types/xo"

import type { XoApiMixin } from "../XoApi.ts"
import { buildPathname } from "../utils/url.ts"
import { hrefToId } from "../utils/string.ts"

export default class BackupJob {
    async getBackupJobs(): Promise<AnyXoBackupJob['id'][]>
    async getBackupJobs<Fields extends "*">(opts: { fields?: Fields, filter?: string }): Promise<AnyXoBackupJob[]>
    async getBackupJobs<Fields extends readonly (keyof AnyXoBackupJob)[]>(opts: { fields?: Fields, filter?: string }): Promise<(Pick<AnyXoBackupJob, Fields[number]>)[]>
    async getBackupJobs<Fields extends readonly (keyof AnyXoBackupJob)[] | '*'>(this: XoApiMixin, opts: { fields?: Fields, filter?: string } = {}) {
        const url = buildPathname('/backup-jobs', opts)

        const backupJobs = await this._fetch<string[] | Partial<AnyXoBackupJob>[]>(url)
        if (opts.fields === undefined) {
            return backupJobs.map((href) => hrefToId<AnyXoBackupJob>(href as string))
        }

        return backupJobs
    }

    async getVmBackupJobs(): Promise<XoVmBackupJob['id'][]>
    async getVmBackupJobs<Fields extends "*">(opts: { fields: Fields, filter?: string }): Promise<XoVmBackupJob[]>
    async getVmBackupJobs<Fields extends readonly (keyof XoVmBackupJob)[]>(opts: { fields: Fields, filter?: string }): Promise<(Pick<XoVmBackupJob, Fields[number]>)[]>
    async getVmBackupJobs<Fields extends readonly (keyof XoVmBackupJob)[] | '*'>(this: XoApiMixin, { filter, ...opts }: { fields?: Fields, filter?: string } = {}) {
        let _filter = filter ?? ''

        _filter = _filter.length > 0 ? `${filter} type:/backup/` : "type:/backup/"

        if (opts.fields === '*') {
            return this.getBackupJobs({ filter: _filter, fields: '*' })
        }

        if (Array.isArray(opts.fields)) {
            return this.getBackupJobs({
                filter: _filter,
                fields: opts.fields,
            })
        }

        return this.getBackupJobs({ filter: _filter })
    }

    async getMirrorBackupJobs(): Promise<XoMirrorBackupJob['id'][]>
    async getMirrorBackupJobs<Fields extends "*">(opts: { fields: Fields, filter?: string }): Promise<XoMirrorBackupJob[]>
    async getMirrorBackupJobs<Fields extends readonly (keyof XoMirrorBackupJob)[]>(opts: { fields: Fields, filter?: string }): Promise<(Pick<XoMirrorBackupJob, Fields[number]>)[]>
    async getMirrorBackupJobs<Fields extends readonly (keyof XoMirrorBackupJob)[] | '*'>(this: XoApiMixin, { filter, ...opts }: { fields?: Fields, filter?: string } = {}) {
        let _filter = filter ?? ''

        _filter = _filter.length > 0 ? `${filter} type:/mirrorBackup/` : `type:/mirrorBackup/`

        if (opts.fields === '*') {
            return this.getBackupJobs({ filter: _filter, fields: '*' })
        }

        if (Array.isArray(opts.fields)) {
            return this.getBackupJobs({
                filter: _filter,
                fields: opts.fields,
            })
        }

        return this.getBackupJobs({ filter: _filter })
    }

    async getMetadataBackupJobs(): Promise<XoMetadataBackupJob['id'][]>
    async getMetadataBackupJobs<Fields extends "*">(opts: { fields: Fields, filter?: string }): Promise<XoMetadataBackupJob[]>
    async getMetadataBackupJobs<Fields extends readonly (keyof XoMetadataBackupJob)[]>(opts: { fields: Fields, filter?: string }): Promise<(Pick<XoMetadataBackupJob, Fields[number]>)[]>
    async getMetadataBackupJobs<Fields extends readonly (keyof XoMetadataBackupJob)[] | '*'>(this: XoApiMixin, { filter, ...opts }: { fields?: Fields, filter?: string } = {}) {
        let _filter = filter ?? ''

        _filter = _filter.length > 0 ? `${filter} type:/metadataBackup/` : `type:/metadataBackup/`

        if (opts.fields === '*') {
            return this.getBackupJobs({ filter: _filter, fields: '*' })
        }

        if (Array.isArray(opts.fields)) {
            return this.getBackupJobs({
                filter: _filter,
                fields: opts.fields,
            })
        }

        return this.getBackupJobs({ filter: _filter })
    }
}   