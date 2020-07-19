const redis = require("redis");

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

  get(key: string) {
    this.client.get("Message", function (err: any, reply: any) {
      if (reply !== null) {
        console.log(reply);
      } else {
        console.log("Precisa setar o estado do cliente");
      }
    });
  }

  set(key: string, value: any) {
    this.client.set(key, value, "EX", 10, function (err: any, reply: any) {
      console.log(reply);
    });
  }
}
