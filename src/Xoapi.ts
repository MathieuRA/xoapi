import type { XapiXoRecord, XoAuthenticationToken } from '@vates/types/xo'

import * as Mixins from './mixins/index.ts'
import { hrefToId } from './utils/string.ts';

type Constructor = new (...args: any[]) => {};
type GenericConstructor<T> = new (...args: any[]) => T;
type InstanceTypeOf<T> = T extends new (...args: any[]) => infer R ? R : never;
type UnionToIntersection<U> =
    (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
type MixinsInstances = InstanceTypeOf<typeof Mixins[keyof typeof Mixins]>;

export type XoApiMixin = XoApi & UnionToIntersection<MixinsInstances>;

/**
 * To define a private method that can be used in the whole mixin, use `_`
 * To define a private method that can be using only in the current class, use `#`
 */
class XoApi {
    #url: URL
    #token: XoAuthenticationToken | undefined

    constructor(params: { url: URL, token?: string }) {
        this.#url = params.url
        this.#token = undefined
    }

    async _fetch<T = undefined>(path: string, { headers, ...opts }: RequestInit = {}): Promise<T> {
        const _headers = new Headers(headers)
        if (this.#token !== undefined) {
            _headers.set('Cookie', `authenticationToken=${this.#token.id}`)
        }

        const resp = await fetch(`${this.#url}${path}`, { ...opts, headers: _headers })

        if (resp.status === 204) {
            return undefined as T
        }

        const body = await resp.json()
        if (!resp.ok) {
            console.log("not ok", body)
            throw new Error('not ok')
        }

        return body
    }

    async _postFetch<T = undefined>(path: string, opts: { body?: Record<string, unknown>, headers?: HeadersInit } = {}) {
        const _body = opts.body !== undefined ? JSON.stringify(opts.body) : undefined
        return this._fetch<T>(path, { method: 'POST', body: _body, headers: opts.headers })
    }

    async _getObjects<T extends XapiXoRecord>(): Promise<T['id'][]>
    async _getObjects<T extends XapiXoRecord, Fields extends "*">(opts: { fields: Fields, filter?: string }): Promise<T[]>
    async _getObjects<T extends XapiXoRecord, Fields extends readonly (keyof T)[]>(opts: { fields: Fields, filter?: string }): Promise<(Pick<T, Fields[number]>)[]>
    async _getObjects<T extends XapiXoRecord, Fields extends readonly (keyof T)[] | '*'>(this: XoApiMixin, opts: { fields?: Fields, filter?: string } = {}) {
        const searchParams = new URLSearchParams()

        if (opts.fields !== undefined) {
            searchParams.append("fields", opts.fields === '*' ? opts.fields : opts.fields.join(','))
        }

        if (opts.filter !== undefined) {
            searchParams.append("filter", opts.filter)
        }

        const vms = await this._fetch<string[] | Partial<T>[]>(`/vms${searchParams.size > 0 ? `?${searchParams.toString()}` : ''}`)
        if (!searchParams.has('fields')) {
            return vms.map((href) => hrefToId(href as string))
        }

        return vms as T[]
    }

    async isAlive(): Promise<boolean> {
        try {
            const resp = await this._fetch<{ result: 'pong', timestamp: number }>("/ping")
            return resp.result === 'pong'
        } catch (error) {
            return false
        }
    }

    /**
     * For `credentials.username`, please use `user.name` instead of `user.email` whenever possible.
     * The use of `user.email` is being progressively deprecated.
     */
    async connect(credentials: {
        username: string, password: string
    } | { token: string }): Promise<void> {
        const path = "/users/me/authentication_tokens"
        const headers = new Headers()
        let getToken: () => Promise<XoAuthenticationToken>

        if ("username" in credentials) {
            headers.set('Authorization', 'Basic ' + btoa(credentials.username + ":" + credentials.password));
            getToken = () => this._postFetch<{ token: XoAuthenticationToken }>(path, { headers }).then(data => data.token)
        } else {
            headers.set('Cookie', `token=${credentials.token}`)
            getToken = () => this._fetch<XoAuthenticationToken[]>(`${path}?fields=*&filter=id:${credentials.token}`, { headers }).then(tokens => tokens[0])

        }

        this.#token = await getToken()
    }

    async isConnected(): Promise<boolean> {
        try {
            await this._fetch('/users/me')
            return true
        } catch (error) {
            return false
        }
    }

    init(): void {
        console.log('init')
    }
}

function applyMixins(derivedCtor: Constructor, constructors: Constructor[]) {
    constructors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            Object.defineProperty(
                derivedCtor.prototype,
                name,
                Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
                Object.create(null)
            );
        });
    });
}


applyMixins(XoApi, Object.values(Mixins))

export default XoApi as GenericConstructor<XoApiMixin>