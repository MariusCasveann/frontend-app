interface Config {
    env: 'local' | 'dev' | 'prod';
    backend: {
        url: string;
    };
    redux: {
        loggingEnabled: boolean;
    };
}

interface Environment {
    [env: string]: Config;
}

const environment: Environment = {
    local: {
        env: 'local',
        backend: {
            url: 'http://localhost:8080'
        },
        redux: {
            loggingEnabled: true
        }
    },
    dev: {
        env: 'dev',
        backend: {
            url: `${window.location.protocol}//app.dev.ui.d-p.io`
        },
        redux: {
            loggingEnabled: true
        }
    },
    prod: {
        env: 'prod',
        backend: {
            url: `${window.location.protocol}//app.prod.ui.d-p.io`
        },
        redux: {
            loggingEnabled: false
        }
    }
};

const fallbackStage = 'dev';
// tslint:disable-next-line:no-any
const stage = (window as any)._env_;
export const config: Config = environment[stage] || environment[fallbackStage];
