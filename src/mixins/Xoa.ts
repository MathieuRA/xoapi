import { BACKUP_TYPE } from "@vates/types/common";
import type { XoApiMixin } from "../XoApi.ts";

export type IsEmptyData = { isEmpty: true }

type IsMaybeExpired<T> = T & { isExpired?: true }
type HasNoAuthorization = { hasAuthorization: false }
type PromiseWriteInStreamError = { error: true }

export default class Xoa {
    ping(this: XoApiMixin): Promise<{ result: 'pong', timestamp: number }> {
        return this._fetch('/ping');
    }

    getGuiRoutes(this: XoApiMixin): Promise<{ xo5?: string, xo6?: string }> {
        return this._fetch('/gui-routes');
    }

    getDashboard(this: XoApiMixin): Promise<{
        nPools: number
        nHosts: number
        hostsStatus: {
            disabled: number
            running: number
            halted: number
            unknown: number
            total: number
        }
        vmsStatus: {
            active: number
            halted: number
            inactive: number
            paused: number
            running: number
            suspended: number
            unknown: number
            total: number
        }
        missingPatches: {
            hasAuthorization: true
            nHosts: number
            nHostsEol: number | IsEmptyData
            nHostsWithMissingPatches: number
            nHostsFailed: number
            nPools: number
            nPoolsWithMissingPatches: number
        } | HasNoAuthorization | PromiseWriteInStreamError
        backupRepositories?:
        | IsMaybeExpired<{
            s3?: {
                size: {
                    backups: number
                }
            }
            other?: { size: { available?: number; backups: number; other?: number; total?: number; used?: number } }
        }>
        | IsMaybeExpired<IsEmptyData>
        | PromiseWriteInStreamError
        storageRepositories: {
            size: {
                available: number
                other: number
                replicated: number
                total: number
                used: number
            }
        } | PromiseWriteInStreamError | IsEmptyData

        backups?: IsMaybeExpired<{
            jobs: {
                disabled: number
                failed: number
                noRecentRun: number
                skipped: number
                successful: number
                total: number
            }
            issues: {
                logs: ('failure' | 'interrupted' | 'skipped' | 'success')[]
                name?: string
                type: BACKUP_TYPE
                uuid: string
            }[]
            vmsProtection: {
                protected: number
                unprotected: number
                notInJob: number
            }
        }> | IsMaybeExpired<IsEmptyData> | PromiseWriteInStreamError
        resourcesOverview:
        | {
            nCpus: number
            memorySize: number
            srSize: number
        }
        | IsEmptyData
        poolsStatus: {
            connected: number
            disconnected: number
            unreachable: number
            unknown: number
            total: number
        }
    }> {
        return this._fetch("/dashboard");
    }
}