import type { XapiXoRecord, XoRecord } from "@vates/types/xo";

export function hrefToId<T extends XoRecord>(string: string): T['id'] {
    return string.split(`/`).pop() as T['id'];
}