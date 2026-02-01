# XoApi

A simple TS connector for XOA REST API that is using `@vates/types`

```js
import XoApi from "@mra/xoapi";

const xoapi = new XoApi({ url: new URL("http://xoa-company.fr/rest/v0") });

await xoapi.connect({ username: "admin@admin.net", password: "admin" });

// typed as Pick<XoVm, 'name_label' | 'id'>[]
const vms = xoapi.getVms({
  fields: ["name_label", "id"],
  filter: "power_state:Running",
});
```
