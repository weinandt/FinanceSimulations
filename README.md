# Locks
Async locking mechanisms for node and browser.

## Example Usage
``` javascript
import { OnceLockAsync } from '@weinandt/locks'

const lock = new OnceLockAsync()

async function onlyProcessOnce(id) {
    if (lock.acquire()) {
        console.log(`Id: ${id} acquired the lock.`)

        return new Promise(resolve => {
            setTimeout(() => {
                lock.release()

                console.log(`Id: ${id} has released the lock.`)
                resolve()
            }, 2000)
        })
    }
    else {
        console.log(`Id: ${id} is waiting for lock to be released.`)
        await lock.waitForLockRelease()
        console.log(`Id: ${id} is no longer waiting for lock release.`)
    }
}

const promises = []
for(let i = 0; i < 3; i++) {
    promises.push(onlyProcessOnce(i))
}

await Promise.all(promises)
```

## TODO
1. Add testing and publish bundled browser version.