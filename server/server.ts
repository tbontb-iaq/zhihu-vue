import fs from "fs";
import https from "https";
import fetch from "node-fetch";
import Koa from "koa";
import cors from "@koa/cors";
import route from "koa-route";

const app = new Koa(),
  server = https
    .createServer(
      {
        key: fs.readFileSync("../cert/tbontb.xyz.key"),
        cert: fs.readFileSync("../cert/tbontb.xyz_bundle.crt"),
      },
      app.callback()
    )
    .listen(3000, () => console.log("服务已启动"));

// app.use(static_serve("/home/jin/Program/HTML/zhihu-vue/dist"));

// const local_ip = os.networkInterfaces()["wlp3s0"][0]["address"];
const origin = "https://tbontb.xyz:5173";

app.use(cors({ origin, credentials: true }));

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    ctx.status = err["status"] ?? 500;
    ctx.body = err["error"] ?? { error: err };
    ctx.type = "json";
  }
});

app.use(
  route.get("/get", async (ctx) => {
    const url = ctx.query["url"];

    if (typeof url === "string") {
      const header = { ...ctx.header };

      delete header.host;
      delete header.referer;

      for (const [k, v] of Object.entries(header))
        if (Array.isArray(v)) header[k] = v.join(";");

      const res = await fetch(url, {
        headers: header as Record<string, string>,
      });

      res.headers.delete("access-control-allow-origin");
      res.headers.delete("content-encoding");
      res.headers.forEach((v, k) => ctx.res.setHeader(k, v));
      ctx.res.setHeader(
        "set-cookie",
        (res.headers.raw()["set-cookie"] ?? []).map((v) =>
          v.replace(/(D|d)omain=.*?(;|$|\0)/, "")
        )
      );
      ctx.body = await res.text();
      ctx.status = res.status;
    } else throw { status: 400, error: { message: "无效的 url", url } };
  })
);

process.stdin.setRawMode(true);
process.stdin.on("data", (data) => {
  const char = data.toString();
  switch (char) {
    case "q":
      server.close();
      process.exit();
      break;
    case "c":
      console.clear();
      break;
    default:
      console.log(char);
  }
});
