import redis from 'redis';

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
    this.client.set(key, value, "EX", 60*15, (err: any, reply: any) => {
      console.log(reply);
    });
  }

  get(key: string) {
    this.client.get("Message", (err: any, reply: any) => {
      if (reply !== null) {
        return reply;
      } else {
        this.set(key, 0);
        return 0;
      }
    });
  }
}
