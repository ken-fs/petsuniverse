# 部署说明

站点：`petsuniverse`（Cloudflare Worker，静态资源）
仓库：https://github.com/ken-fs/petsuniverse（待建）
域名：`petsuniverse.site`（**待注册** — RDAP 404 可用，2026-09-26 查）

---

## 当前状态（2026-09-26 建站当天）

| 项 | 状态 |
|---|---|
| 代码 | ✅ 本地完成（16 页，build 通过，lint 干净） |
| 数据 | ✅ codes 10 条（1 源）· pets 4 条（1 条有官方 rarity）· systems 12 条 |
| 构建产物 | ✅ canonical / sitemap / robots 全部指向 `https://petsuniverse.site` |
| IndexNow key | ✅ 已生成 `8c886f4e6e3aaa6a44f194de32eec4e7`（`.indexnow-key` + `public/<key>.txt`） |
| GitHub 仓库 | ⏳ 待创建并推送 |
| Worker | ✅ `petsuniverse` 已部署（apex + www 已绑）|
| 域名 | ✅ **已注册**（2026-09-26，到期 2027-09-26） |
| CF zone | ✅ **active**（`0b75dc862b6c1d5b5d821d2c7b2a4b57`，2026-09-26 16:53 建，当晚激活）|
| 自定义域名 | ✅ **已绑定并生效**：`petsuniverse.site` + `www.petsuniverse.site` 均 HTTP 200 |
| SSL | ✅ 证书 CN=petsuniverse.site（2026-09-26 → 12-25，CF 自动签发）|
| IndexNow | ✅ 已推 11 个 URL（HTTP 202）|
| NS（注册商侧）| ✅ 已用 Spaceship API 填好：**`daisy.ns.cloudflare.com` + `lochlan.ns.cloudflare.com`** |
| DNSSEC | ✅ 已关闭（注册商侧原本开着，DS 记录已撤 —— 不撤的话指向 CF 后全网 SERVFAIL）|
| 后台守望 | ✅ `scripts/watch-zone-and-wire.sh`（本次因代理掉线没抓到激活，手动跑了 wire-domain.sh）|

**上线时间线（2026-09-26）**：16:15 域名注册 → 16:20 改 NS → 16:41 DNSSEC 撤 DS →
16:53 建 zone（CF 分配 daisy/lochlan，与舰队其他 zone 不同）→ 16:55 改 NS 为 CF 那对 →
当晚 zone active → 21:59 wire-domain.sh 完成绑定 → 全部路由 200。
| GSC 属性 | ❌ 未建 —— **人工**：加 `sc-domain:petsuniverse.site` → DNS TXT → 加服务账号为 Owner |

> 域名现状（2026-09-26 RDAP 实测）：`petsuniverse.xyz` 已注册（09-17）、
> `petsuniverse.wiki` 已注册（09-21）、`petsuniverse.net` 已注册（2010）。
> **`petsuniverse.site` 和 `petsuniverse.gg` 可用**，本仓库按 `.site` 配置。

---

## 需要人工做的四件事（按顺序）

### ① ~~注册域名~~ ✅ 已完成

`petsuniverse.site` 已注册（2026-09-26）。

### ② 建 GitHub 仓库并推送

仓库名 `ken-fs/petsuniverse`。建好后：

```bash
cd ~/Desktop/david/Ship/petsuniverse
git init && git add -A && git commit -m "feat: Pets Universe reference — codes, roster, values framework"
git remote add origin git@github.com:ken-fs/petsuniverse.git
GIT_TERMINAL_PROMPT=0 git push -q origin main \
  || GIT_TERMINAL_PROMPT=0 git -c http.proxy=http://127.0.0.1:7897 push -q origin main
```

> **踩坑记录（2026-09-26）**：曾按「舰队 22 个 zone 都用 `ariella`/`seamus`」推断
> 这是账号固定 NS 对 —— **错**。CF 的 NS 是**按 zone 分配**的，本 zone 拿到的是
> `daisy`/`lochlan`。教训：NS 必须以 CF 建 zone 后 `name_servers` 字段返回的为准，
> 不能用同账号其他 zone 推断。

### ③ 域名加进 Cloudflare（建 zone）— ✅ 已完成

dashboard → Add a site → `petsuniverse.site`（账号 `70716e073f0925c564bafd0eaf0be307`）
→ 把 CF 给出的两个 NS 填到注册商 → 等 zone `active`。

⚠️ 两个坑（AGENTS 记过）：
- CF 只在建 zone 后几十秒检查一次 NS，之后不再重试 → NS 改完若仍 pending，
  去 dashboard 点「立即检查名称服务器」
- **zone pending 时不要绑自定义域名**（证书会签发失败且不重试）

**zone active 后跑一条命令即可完成剩余全部**：

```bash
bash scripts/wire-domain.sh petsuniverse.site
# = 构建 → 部署 → 绑域名（workers_routes API）→ 验证 3 个 URL → 推 IndexNow
```

### ④ 连接 Cloudflare Git 集成 —— ✅ **已用 API 完成**（2026-09-26）

> **修正记录**：AGENTS 里写「只能 dashboard 手动」是基于 **wrangler OAuth token** 的实测
> （确实报 `Authentication error`）。但 **cloudflare MCP 的 token 有 builds 写权限** ——
> 本次用 `cloudflare_execute` 三步走通，全程无需浏览器：
>
> 1. `PUT /accounts/{id}/builds/repos/connections` → repo_connection_uuid
> 2. `POST /accounts/{id}/builds/workers` → 建 Worker 构建配置（脚本标签 `2bac3c76…`）
> 3. trigger 自动生成（`branch_includes: ["main"]`，build=`npm run build`，deploy=`npx wrangler deploy`）
>
> 用到的字段：repo_id `1388839132`、provider_account_id `223587720`（ken-fs）、
> 共享 build token `0c55960d-77b2-474d-8c0e-3e39adb5053c`（与 animedice/drilltoearthscore 同用）。
> **新站接线可以直接抄这段**，不必再去 dashboard。

以下 dashboard 步骤留档备查（若 API 不可用时的退路）：

1. https://dash.cloudflare.com/?to=/:account/workers-and-pages
2. 建 Worker `petsuniverse`（或先 `npx wrangler deploy` 建一个空的）
3. Settings → Builds → **Connect Git** → 选 `ken-fs/petsuniverse`
4. 构建配置：

| 字段 | 值 |
|---|---|
| Production branch | `main` |
| Build command | `npx next build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |

5. Environment variables：

| 变量 | 值 |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://petsuniverse.site` |
| `NEXT_PUBLIC_GA_ID` | GA4 属性 ID（**新建属性后填**，不填则全站不加载分析） |

---

## zone active 后我能自动跑的

```bash
cd ~/Desktop/david/Ship/petsuniverse
NEXT_PUBLIC_SITE_URL=https://petsuniverse.site npx next build
npx wrangler deploy
node scripts/submit-indexnow.mjs          # IndexNow 推送
node ~/Desktop/david/Ship/scripts/gsc.mjs index https://petsuniverse.site/   # Indexing API
```

绑定自定义域（wrangler 没有 domains 子命令，走 API）：
`scripts/set-domain.sh` / `scripts/check-domain.sh` / `scripts/watch-activation.sh`
是舰队里现成的脚本，改一下 Worker 名和域名即可。

---

## 日常部署（Git 集成连上之后）

```bash
git add -A && git commit -m "..." && git push
# → Cloudflare 自动构建并部署
```

推送兜底：

```bash
GIT_TERMINAL_PROMPT=0 git push -q origin main \
  || GIT_TERMINAL_PROMPT=0 git -c http.proxy=http://127.0.0.1:7897 push -q origin main
```

## 本地开发

```bash
npm run dev          # 开发服务器
npm run build        # 静态导出到 ./out
npm run lint
npx wrangler deploy  # 手动部署（临时，会被下次 CI push 覆盖）
```
