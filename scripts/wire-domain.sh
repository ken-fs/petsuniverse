#!/usr/bin/env bash
# zone active 之后跑这个：重新构建 + 部署 + 绑定自定义域名 + 验证 + IndexNow
#
#   bash scripts/wire-domain.sh petsuniverse.site
#
# 前提：域名已在同一个 Cloudflare 账号里建好 zone 且 status=active。
# 绑域名需要 workers_routes:write —— wrangler 的 OAuth token 有（实测）。
set -uo pipefail
DOMAIN="${1:-petsuniverse.site}"
cd "$(dirname "$0")/.."

echo "▸ 1/5 检查 zone 状态"
TOKEN=$(python3 -c "import re;d=open('$HOME/Library/Preferences/.wrangler/config/default.toml').read();print(re.search(r'^oauth_token\s*=\s*\"([^\"]+)\"',d,re.M).group(1))" 2>/dev/null)
ZONE=$(curl -s -H "Authorization: Bearer $TOKEN" "https://api.cloudflare.com/client/v4/zones?name=$DOMAIN")
STATUS=$(echo "$ZONE" | python3 -c "import json,sys;d=json.load(sys.stdin);r=d.get('result') or [];print(r[0]['status'] if r else 'missing')")
if [ "$STATUS" != "active" ]; then
  echo "  ✗ zone status = $STATUS"
  echo "    → 域名还没加进 Cloudflare，或 NS 还没生效。"
  echo "      dashboard → Add a site → $DOMAIN → 把给出的两个 NS 改到注册商 → 等 active。"
  exit 1
fi
echo "  ✓ zone active"

echo "▸ 2/5 重新构建（注入 NEXT_PUBLIC_SITE_URL）"
NEXT_PUBLIC_SITE_URL="https://$DOMAIN" npx next build 2>&1 | grep -E "Compiled|error|Error|Generating static pages using 9 workers \(16" | tail -3

echo "▸ 3/5 部署到 Worker"
npx wrangler deploy 2>&1 | grep -E "Deployed|workers.dev|error" | tail -2

echo "▸ 4/5 绑定自定义域名（workers_routes API）"
ACC=$(npx wrangler whoami 2>/dev/null | grep -oE "[0-9a-f]{32}" | head -1)
BIND=$(curl -s -X PUT -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  "https://api.cloudflare.com/client/v4/accounts/$ACC/workers/domains" \
  -d "{\"environment\":\"production\",\"hostname\":\"$DOMAIN\",\"service\":\"petsuniverse\",\"zone_name\":\"$DOMAIN\"}")
echo "$BIND" | python3 -c "
import json,sys
d=json.load(sys.stdin)
if d.get('success'):
    r=d['result']; print('  ✓ 已绑定:', r.get('hostname'), '| cert:', (r.get('ssl') or {}).get('status'))
else:
    print('  ⚠️ 绑定失败:', [e.get('message') for e in d.get('errors',[])])
    print('     → dashboard: Workers → petsuniverse → Settings → Domains & Routes → Add custom domain')
"

echo "▸ 5/5 验证 + IndexNow"
sleep 45
for u in "https://$DOMAIN/" "https://$DOMAIN/codes/" "https://$DOMAIN/pets/"; do
  printf "  %-34s HTTP %s\n" "$u" "$(curl -s -o /dev/null -w '%{http_code}' --max-time 25 "$u")"
done
node scripts/submit-indexnow.mjs 2>&1 | grep -vE "UNDICI|trace" | tail -3

echo
echo "✅ 完成。剩下人工两件："
echo "   1. GSC 加属性 sc-domain:$DOMAIN（DNS TXT 验证）→ 加服务账号为 Owner"
echo "   2. GA4 建属性 → 填 Cloudflare 构建变量 NEXT_PUBLIC_GA_ID"
