import ExpressServer from './infrastructure/server/app'
import env from './infrastructure/environment'

const app = new ExpressServer(Number(env.Port) || 3000)

const run_log = () => {
    console.log(
    `
    ╭─────────────────────────────────────────────────────────────╮
    │                                                             │
    │      Server is currently running on :   ${env.Port}                │
    │                                                             │
    ╰─────────────────────────────────────────────────────────────╯
    `
    )
}


app.start(run_log)


