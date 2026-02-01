export function buildSearchParams(opts: Record<string, unknown>): URLSearchParams {
    const searchParams = new URLSearchParams()

    Object.entries(opts).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            searchParams.append(key, value.join(','))
        } else {
            searchParams.append(key, String(value))
        }

    })

    return searchParams
}

export function buildPathname(pathname: string, searchParams?: Record<string, unknown>) {
    const urlSearchParams = buildSearchParams(searchParams ?? {})

    return `${pathname}${urlSearchParams.size > 0 ? `?${urlSearchParams.toString()}` : ''}`
}