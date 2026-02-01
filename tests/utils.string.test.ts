import assert from 'node:assert'
import { suite, test } from 'node:test'

import { hrefToId } from '../src/utils/string.ts'

suite("hrefToId", () => {
    test('It should correctly get the last segment', () => {
        const href = '/rest/v0/vms/123'
        assert.strictEqual(hrefToId(href), "123")
    })
})