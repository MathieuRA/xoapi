export function buildSearchParams(opts: Record<string, unknown>): URLSearchParams {
    const searchParams = new URLSearchParams()

    Object.entries(opts).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            if (key === 'fields') {
                // fields has to be a comma separated list
                searchParams.append(key, value.join(','))
            } else {
                value.forEach((v) => {
                    searchParams.append(key, String(v))
                })
            }
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