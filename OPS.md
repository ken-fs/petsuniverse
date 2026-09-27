# Pets Universe Reference · 运营档案

> 舰队内**第二个路径 B 站**（Next.js + shadcn，非 AnvilWiki 模板），以 `animedice` 为基底。
> 建档 2026-09-26（建站当天上线）。
> 来源判决：`Ship/GAME-SCAN-2026-09-26.md`（条件 GO）。

---

## 一、站点档案

| 项 | 值 |
|---|---|
| 域名 | `petsuniverse.site`（+ www，均 200） |
| 仓库 | https://github.com/ken-fs/petsuniverse |
| Worker | `petsuniverse`（Cloudflare，静态资源） |
| CF zone | `0b75dc862b6c1d5b5d821d2c7b2a4b57` |
| **CF 分配的 NS** | `daisy.ns.cloudflare.com` + `lochlan.ns.cloudflare.com` ⚠️ 与舰队其他 zone 不同（见坑 1） |
| 注册商 | Spaceship（NS 可用 API 改） |
| 部署 | CF Git 集成，push → 自动构建（`npm run build` → `npx wrangler deploy`） |
| 构建配置 | trigger `f467ce5c-50d4-459f-9ed5-de7a1a13ddfd` · repo connection `5bbb08c8-969c-4020-8f62-3e8ee6824936` · script tag `2bac3c76489c4f03ba8ab49986158f09` · repo_id `1388839132` |
| 游戏 | Pets Universe（Roblox，Lip Builds） |
| universeId / placeId | `10759638075` / `74629631798007` |
| 页面数 | 16（7 顶层 + 4 宠物详情 + robots/sitemap/404） |
| 技术栈 | Next.js 16 App Router · Tailwind v4 · shadcn/ui(radix) · Geist · Phosphor · `output: export` |
| GA4 | `G-6SHF89BP9C`（**同意门控**，走 `NEXT_PUBLIC_GA_ID` 构建变量） |
| GSC | `sc-domain:petsuniverse.site`（TXT 验证 + 服务账号 Owner，2026-09-26） |
| IndexNow | key `8c886f4e6e3aaa6a44f194de32eec4e7` |
| 广告 | Adsterra：728×90 `13f5f745…` · 300×250 `64d70ba5…`（host `bauval.org`） |
| 每日巡检 | `scripts/site-hygiene.mjs` 的 MANUAL_SITES（部署标记/sitemap/关键页） |

### 页面结构

```
/               首页：已确认 vs 无人发布的对半结构 + 事实卡 + 广告
/codes/         10 条码（2 源确认）+ 奖励 + 兑换步骤 + FAQ schema
/pets/          名册：1 只确认 rarity + 3 只仅名字 + 列表如何长出来
/pets/[slug]/   一实体一页（generateStaticParams），缺口字段显式标注
/values/        交易价值：为什么没有公开价值表 + 4 步自己定价法
/tier-list/     排名方法 + 当前唯一可排名项（单点不成曲线）
/guide/         12 个系统 + 5 个 mastery badge + 首小时
/about/         三条溯源规则 + 完整缺口清单
```

---

## 二、数据基线（上线时）

### 游戏侧（Roblox API 实测 2026-09-26）

| 指标 | 值 | 判读 |
|---|---|---|
| CCU | 5,224 | 甜区 |
| 增长比 | 7.2x | 成长期 |
| 年龄 | 33 天（2026-08-24 创建）| 新游 |
| 访问 / 收藏 | 1,410,632 / 74,929 = **18.8** | ✅ **舰队最佳留存**（dungeonlootr 276 / Anime Expeditions 3,758）|
| 更新 | 2026-09-25 | 活跃（自称每周更新）|

### 站点侧（上线当晚）

| 项 | 值 |
|---|---|
| 码 | 10 条，**2 源**（GachaPocket + UrGameTips，奖励逐条一致）|
| 宠物 | 4 只（Pop Cat = Exclusive / 1 in 1,000,000，官方素材印刷；其余仅名字）|
| 系统 | 12 个（蛋/Coins/Rubies/药水/水果/可破坏物/charms/worlds/trading/Premium/group/mastery）|
| GSC | 属性已通，sitemap 已提交并被下载（11 URL，0 错误）|
| 首页收录 | `URL is unknown to Google` —— 新域名正常状态 |

---

## 三、核心赌注（还没验证）

1. **"hundreds of pets" 是真需求还是噱头**：若宠物名可搜（哪怕通用如 Noob/Pro/Admin），
   一实体一页的结构就能复制 dungeonlootr 的剧本；若全是通用词，站点只能吃游戏级词。
   → 验证方式：拿到名单后抽 3-5 个跑 `node scripts/serp.mjs "pets universe <宠物名>"`。
2. **trading 属性带来的 values 词**：这是不依赖实体名归因的第二条腿。
3. **广告填充**：Adsterra 新域名能否正常投放（本机被反作弊拦，未验证）。

---

## 四、已知数据缺口（页面显式标注，5 项）

1. 完整宠物名单 + 逐宠 hatch odds（游戏自称 "hundreds"，无任何公开索引）
2. **交易价值**（该游戏无任何公开 value list）
3. 蛋价与蛋内容物
4. 水果/药水/charms 的掉率
5. Pop Cat 之外的 rarity 标签归属（官方素材印了 1 in 10m / 1/999m 但没标清属于哪只）

---

## 五、运营节奏

### 日常（已自动化）

| 时间 | 任务 | 覆盖 petsuniverse 的部分 |
|---|---|---|
| 每天 10:00 | `scripts/site-hygiene.mjs` | 部署标记 / sitemap 域名 / 关键页 200 |
| push 时 | CF Git 集成 | 构建 + 部署（实测 ~2-3 分钟）|

### 手动

```bash
# 内容更新（加宠物）
#   编辑 src/data/game.json 的 pets[] → 页面 + sitemap 自动生成
cd ~/Desktop/david/Ship/petsuniverse && npm run build && git add -A && git commit -m "..." && git push

# 验收（petsuniverse 已进 browserPages 基线）
node ~/Desktop/david/Ship/scripts/verify.mjs --deep

# GSC 数据
node ~/Desktop/david/Ship/scripts/gsc.mjs report 7 petsuniverse
node ~/Desktop/david/Ship/scripts/gsc.mjs inspect "https://petsuniverse.site/"
```

### 内容更新触发条件

- **宠物名单到手**（游戏内索引 / Discord）→ `pets[]` 批量加行，一实体一页
- **交易价值出现两个独立来源** → 填 `valueText`，同时改 `/values/` 的措辞
- **游戏更新**（每周）→ 检查 badge/描述/新蛋，更新 `game.updated`

---

## 六、本批踩的坑（8 个，全部已修/已绕）

### 1. ⚠️ CF 的 NS 是**按 zone 分配**的，不能按账号推断

舰队 22 个 zone 全都是 `ariella` + `seamus`，于是我先按这对填了注册商 —— **错**。
本 zone 实际拿到的是 `daisy` + `lochlan`。

**教训**：NS 以建 zone 后 `GET /zones?name=<域名>` 返回的 `name_servers` 为准。
新站流程里，「填 NS」必须排在「建 zone」之后。

### 2. 🔴 注册商侧的 DNSSEC 会让整站 SERVFAIL

`petsuniverse.site` 在 Spaceship 注册时**默认带 DNSSEC**（.site 注册局有 DS 记录），
而舰队其他域名都没有。NS 指到 CF 后 CF 不签名 → **所有走 DNSSEC 校验的解析器
（1.1.1.1 / 8.8.8.8，即绝大多数用户）直接 SERVFAIL**。

诊断（两步，30 秒）：

```bash
# ① DS 记录存在吗
curl -s "https://dns.google/resolve?name=<域名>&type=DS" | python3 -m json.tool
# ② 对照舰队已上线的域名（应无 DS）
curl -s "https://dns.google/resolve?name=animedice.xyz&type=DS"
```

**Spaceship API 不暴露 DNSSEC**（探了 7 个端点全 404）→ 只能 dashboard 关。

### 3. 🔴 Adsterra invoke URL 有**两种格式**，不能从 key 重建

| 格式 | URL |
|---|---|
| 旧（舰队现有单元）| `//<host>/<key>/invoke.js` |
| **新（本账号新单元）** | `https://bauval.org/22/<key>` |

我按旧格式拼 → **404**（浏览器侧表现为 `net::ERR_BLOCKED_BY_ORB`）。

**做法**：`src/lib/ads.ts` 存**完整 script URL**（`src` 字段），不重建。

### 4. Adsterra 反作弊会拦机房/代理 IP（验证时的假故障）

从本机（代理 IP）访问 invoke.js 一律 **403**。做对照实验才能区分「配置错」和「IP 被拦」：

```bash
# 换 referer 无效 + 舰队已批准单元从本机也 403 → 是 IP 问题，不是配置
curl -s -o /dev/null -w "%{http_code}\n" "https://www.highrevenueformat.com/<舰队旧key>/invoke.js" -e "https://animeexpeditions.dev/"
```

**结论**：广告真实填充必须在**正常网络**下验证，本机验证不了。

### 5. CF Git 集成其实**可以 API 接通**（旧结论已修正）

`wrangler` OAuth token 走 builds API 报 `Authentication error`（属实），
但 **cloudflare MCP 的 `cloudflare_execute` 有 builds 写权限**。三步：

```js
PUT  /accounts/{id}/builds/repos/connections   // repo_id 从 GitHub API 取
POST /accounts/{id}/builds/workers             // 构建配置（trigger 自动生成）
```

完整字段清单见 `Ship/AGENTS.md` 的「2026-09-26 重要修正」一节。
**仍然必须人工的只有建 zone**（两个 token 都只有 `zone:read`）。

### 6. bash 里 `$VAR` 后面跟全角字符 = unbound variable

写中文脚本时 `echo "…：$DOMAIN）"` 会让 bash 把 `DOMAIN）` 当成变量名 →
`DOMAIN\xef\xbc\x89: unbound variable`。

**规矩**：中文脚本里变量一律写 `${VAR}`。

### 7. wrangler OAuth token 会中途失效

`wire-domain.sh` 第一版只读 wrangler 的 token → 跑到一半报 `Invalid access token`。
**做法**：优先用 `~/.config/cloudflare/env` 的静态 `CF_API_TOKEN`，wrangler token 只作兜底
（它还会过期，需要 `npx wrangler whoami` 续期）。

### 8. 两个锁文件 = CF 自己选包管理器

从 animedice 复制基底时带过来了 `pnpm-lock.yaml`，本地又用 `npm install` 生成了
`package-lock.json` → CF 构建时包管理器不确定。**做法**：删 `pnpm-lock.yaml`，
构建命令统一 `npm run build`。

---

## 七、方法论沉淀（已回写）

| 沉淀 | 落在哪 |
|---|---|
| Git 集成可 API 接通（含完整字段） | `Ship/AGENTS.md`「无法自动化的两件事」修正节 |
| path-B 站也能进 hygiene（加部署标记） | `scripts/site-hygiene.mjs` 的 MANUAL_SITES + 本站 `scripts/write-deploy-marker.mjs` |
| NS 必须等 zone 建完再填 | 本文档 + `scripts/wire-domain.sh` 的前置检查 |
| 域名接线一条命令 | `scripts/wire-domain.sh`（zone active 检查 → 构建 → 部署 → 绑域名 → 验证 → IndexNow）|
| 无人值守接线 | `scripts/watch-zone-and-wire.sh`（每 60s 查 zone，active 后自动跑上一条）|

---

## 八、待办队列

### 🔴 立刻（Adsterra 侧，1 分钟）

- [ ] 把 `petsuniverse.site` 加进 Adsterra 后台的站点列表
- [ ] 把后台给的 ads.txt 记录贴进 `public/ads.txt`（现只有 AdSense 行 + TODO）

### 🟡 1-2 周后

- [ ] **宠物名单** → `pets[]` 批量加行（这是本站的主增长引擎）
- [ ] GSC 收录观察（新站 1-3 天出展示）
- [ ] 抽 3-5 个宠物名跑 SERP，验证「实体名能否归因」这个核心赌注
- [ ] 广告真实填充验证（正常网络）

### 🔵 backlog

- [ ] 若合规需要：把广告也纳入同意门控（现在按舰队惯例不门控）
- [ ] `/pets/[slug]/` 页在宠物数上来后加排序/筛选（对齐 dungeonlootr 的 roster 表）

---

## 九、变更记录

| 日期 | 变更 |
|---|---|
| 2026-09-26 | 建站（16 页）→ 域名注册 → NS/zone/SSL → CI/CD（API 接通 Git 集成）→ GA4 门控 → Adsterra 两单元 → GSC 属性+sitemap+Indexing API → 进 hygiene 监控 |
