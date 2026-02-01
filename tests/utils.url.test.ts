import assert from 'node:assert'
import { suite, test } from 'node:test'

import { buildSearchParams, buildPathname } from '../src/utils/url.ts'

suite("buildSearchParams", () => {
    test("It should handle simple string", () => {
        const searchParams = buildSearchParams({ "foo": "bar" })
        assert.strictEqual(searchParams.has('foo'), true)
    })
    test("It should handle simple number", () => {
        const searchParams = buildSearchParams({ "foo": 1 })
        assert.strictEqual(searchParams.has('foo'), true)
        assert.strictEqual(typeof searchParams.get('foo'), "string")

    })
    test("It should handle simple array", () => {
        const searchParams = buildSearchParams({ "foo": ['bar', 1] })
        assert.strictEqual(searchParams.has('foo'), true)
    })
})

suite('buildUrl', () => {
    test('It should return the pathname', () => {
        let pathname = "/vms"
        const _pathname = buildPathname(pathname)
        assert.strictEqual(_pathname, pathname)
    })
    test('It should add the fields search param', () => {
        let pathname = "/vms"
        const _pathname = buildPathname(pathname, { fields: "*" })
        assert.strictEqual(_pathname, `${pathname}?fields=*`)
    })
    test('It should add mutiple search params', () => {
        let pathname = "/vms"
        const fields = ['name_label, description']
        const filter = "foo:bar"
        const ndjson = true
        const _pathname = buildPathname(pathname, { fields, filter, ndjson })
        const url = new URL(`http://localhost/${_pathname}`)
        const searchParams = url.searchParams

        assert.strictEqual(searchParams.get('fields'), fields.join(','))
        assert.strictEqual(searchParams.get('filter'), filter)
        assert.strictEqual(searchParams.get('ndjson'), String(ndjson))
    })
})
