import redis from "redis";

//const redis = require("redis");

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

  set(key: string, value: any) {
    this.client.set(key, value, "EX", 60 * 15, (err: any, reply: any) => {
      console.log(reply);
    });
  }

  get(key: string) {
    let value;

    this.client.get(key, (err: any, reply: any) => {
      if (reply !== null) {
        console.log(reply);
        value = reply;
      } else {
        this.set(key, 0);
        value = 0;
      }
    });

    return value;
  }
}
