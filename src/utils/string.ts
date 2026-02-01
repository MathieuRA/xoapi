import type { XapiXoRecord } from "@vates/types/xo";

type IdOf<T extends XapiXoRecord> = Extract<XapiXoRecord, { type: T['type'] }>['id'];

export function hrefToId<T extends XapiXoRecord>(string: string): IdOf<T> {
    return string.split(`/`).pop() as IdOf<T>;
}