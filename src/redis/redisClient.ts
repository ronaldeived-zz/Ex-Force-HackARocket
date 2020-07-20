import redis from "redis";

const REDISCACHEKEY = "4TmZwfgU4BXcZu2CgaLTk3XO5aWzsHBfBgLdYr577jU=";
const REDISCACHEHOSTNAME = "dbhack.redis.cache.windows.net";

export class redisClient {
  constructor(
    private client = redis.createClient(6380, REDISCACHEHOSTNAME, {
      auth_pass: REDISCACHEKEY,
      tls: { servername: REDISCACHEHOSTNAME },
    })
  ) {
    client.on("error", function (error: any) {
      console.error(error);
    });
  }

  async set(key: string, value: any) {
    await this.client.set(key, value, "EX", 60 * 15, (err: any, reply: any) => {
      console.log(reply);
    });
  }

  async get(key: string): Promise<number> {
    let value: number = 1111;
    let valor = this.client.get(key, (err: any, reply: any) => {
      if (reply !== null) {
        value = reply;
        console.log("a");
      } else {
        this.set(key, 0);
        value = 0;
      }
    });
    await valor;

    return value;
  }
}
