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
| Worker | ⏳ 待建（需要 domain 先注册，见下） |
| 域名 | ✅ **已注册**（2026-09-26，到期 2027-09-26） |
| CF zone | ⏳ **待人工添加**（wrangler token 只有 `zone:read`，建不了 zone；CF MCP 的 token 已失效）|
| GSC 属性 | ❌ 未建 |

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

### ③ 域名加进 Cloudflare（建 zone）— **需要人工，最快的一步**

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

### ④ 连接 Cloudflare Git 集成

**为什么必须手动**：`wrangler` 的 OAuth scope 里没有 `workers_builds`，
API 返回 `Authentication error`。只能在 dashboard 配。

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
