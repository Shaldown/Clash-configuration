# Claude routing

The global enhancement script creates a separate `Claude` selector. Selecting a server in `Proxy`, `All [manual]` or `By country` does not change the selection in `Claude`.

## Setup

1. Apply `profiles/Global Extend Script.js` as the enhancement script in Clash Verge or FLClash. The `claude` provider loads `rule-sets/claude.yaml` using the same HTTP/cache pattern as the other providers.
2. Use Rule mode. On Windows, enable TUN to capture native applications that do not use the system HTTP proxy. Keep process matching enabled (`strict` or `always`) for application rules. On Android, make sure the Claude app is included in FLClash's VPN application selection.
3. Open the `Claude` group and select a server. The initial selection `REJECT` blocks matching Claude and shared-host traffic until a destination is chosen.
4. For a fixed server, select the server itself. A `Claude / <country> [fallback]` entry fixes the country while allowing automatic server changes. Claude offers no country `url-test` entries. RU/BY country groups are excluded, and direct server candidates are filtered using the same RU/BY name markers as the rest of the configuration; this is name-based filtering, not live IP geolocation.
5. Check the client's connection view while opening Claude, signing in, running the CLI, opening an artifact, and using support. Known Claude connections should select `Claude`; UDP on port 443 is rejected as before.

The script enables `profile.store-selected` and preserves the profile's other settings. The cached selection is restored while the selected node remains available under the same name. If the selected node disappears, the default destination is `REJECT`.

Claude's country groups are separate from the existing country groups. Their `empty-fallback` is `REJECT`; an empty provider or country cannot silently use Mihomo's default `COMPATIBLE`/direct destination. Direct, pass-through, DNS and Rematch node types are excluded from Claude candidates. Rematch would otherwise allow a subscription node to switch to another rule set and bypass the Claude route. LAN destinations keep their existing Direct rules.

The sole Claude routing rule follows the existing global QUIC rejection rule. Games and torrents keep their earlier priority; subsequent service and general Direct rules remain below Claude. There is no Claude-specific UDP rejection guard. UDP on other ports follows ordinary Mihomo behavior, including continuing to subsequent rules if the selected proxy does not support UDP.

`empty-fallback` requires Mihomo **1.19.27 or newer**. The generated configuration was checked with the locally installed **1.19.31** core. Check FLClash's bundled core version before applying it. These properties are documented in [Mihomo's proxy group fields](https://wiki.metacubex.one/en/config/proxy-groups/) and [the 1.19.27 release](https://github.com/MetaCubeX/mihomo/releases/tag/v1.19.27).

## DNS routing

The DNS settings in `profiles/Global Extend Script.js` use explicit proxy-group suffixes on the DoH URLs. Selecting a different general server does not change the DNS route for domains in the `claude` provider.

| Setting | Route and purpose |
| --- | --- |
| `nameserver` | Resolve ordinary names through `Proxy` |
| `nameserver-policy` for `rule-set:claude` | Resolve matching domains through the selected `Claude` server |
| `direct-nameserver` | Preserve direct resolution for direct connections |
| `proxy-server-nameserver` | Preserve separate resolution of proxy-server names so establishing the proxy does not depend on that same proxy |

The DNS policy uses the domain entries of the classical `claude` provider. Process-only matches do not select this DNS policy: an otherwise unmatched domain uses the default `nameserver`, even if its application connection selects `Claude`. The policy controls DNS handled by Mihomo; independent Windows resolver queries require separate observation. System Proxy does not provide system-wide capture or a kill switch. See [Mihomo DNS configuration](https://wiki.metacubex.one/en/config/dns/).

Validated on 2026-10-15 with Mihomo 1.19.31 in Windows System Proxy mode without TUN: a fresh TXT query under `anthropic.com` through the core's `/dns/query` API returned the expected NXDOMAIN. Internal connections to both configured DoH services used the selected Claude VLESS server and transferred request and response bytes. This verifies that resolver path; router enforcement and failure behavior remain untested. DNS-server countries reported by a leak test need not match the proxy's country because resolver infrastructure and anycast routing are separate from the client exit.

## Endpoint coverage

Checked on **2026-10-03**. All 16 Claude domain and application rules live in `rule-sets/claude.yaml`. One HTTP classical YAML provider uses `path: ./rule-sets/claude.yaml` and the matching repository URL; its refresh interval is one day, like the other providers. The domain list is not embedded or duplicated in the script. There is no special routing for rule-file loading failures.

| Rules | Purpose | Evidence |
| --- | --- | --- |
| Suffixes `anthropic.com`, `claudeusercontent.com`, `claudemcpcontent.com` | API, authentication, updates, application assets, artifacts and MCP widgets; essential service infrastructure, with generated subdomains covered | [Current Desktop requirements](https://code.claude.com/docs/en/desktop#network-access-requirements), [CLI network requirements](https://code.claude.com/docs/en/network-config#network-access-requirements) |
| Regex for the confirmed `claude.ai`, `claude.app`, `claude.com`, `claude.dev` suffixes | Current service domains and all their subdomains; excludes unrelated `claude.example.com` addresses | [Current Desktop requirements](https://code.claude.com/docs/en/desktop#network-access-requirements), [Anthropic cookie inventory](https://privacy.claude.com/en/articles/10023541-what-cookies-does-anthropic-use), [Mihomo domain regex](https://wiki.metacubex.one/en/config/rules/#domain-regex) |
| Suffixes `clau.de`, `claudemcpclient.com`; exact `servd-anthropic-website.b-cdn.net` | Additional Claude-specific entries maintained by the community; retained for coverage, not claimed as mandatory current runtime dependencies | [v2fly Anthropic source list](https://raw.githubusercontent.com/v2fly/domain-list-community/master/data/anthropic) |
| Exact `storage.googleapis.com` | Plugin metadata and older native installer/update downloads; included with the owner's approval | [Current CLI requirements](https://code.claude.com/docs/en/network-config#network-access-requirements), [Clash Verge TUN capture, 2026-04-08](https://github.com/anthropics/claude-code/issues/45067) |
| Exact `challenges.cloudflare.com`, `api-iam.intercom.io`, `widget.intercom.io`, `js.intercomcdn.com` | Conditional security challenge and support hosts; the user report lists the Intercom names in a DNS check alongside runtime support errors, not a full network capture | [Desktop support-widget report, 2026-08-07](https://github.com/anthropics/claude-code/issues/84946), [community wrapper's challenge fix](https://github.com/simonlinuxcraft/claude-ai-desktop-app/blob/main/CHANGELOG.md), [official cookie inventory](https://privacy.claude.com/en/articles/10023541-what-cookies-does-anthropic-use) |
| Exact `http-intake.logs.us5.datadoghq.com`, `browser-intake-us5-datadoghq.com` | Current optional CLI telemetry and error reporting | [Current CLI requirements](https://code.claude.com/docs/en/network-config#network-access-requirements), [Code 2.1.196 static audit](https://gist.github.com/AdnaneKhan/7a2040bcdebdc923ef73a19f8831132d) |

Not every retained domain is essential to every session. Service domains carry core application traffic; storage, security challenges, support and telemetry are feature-dependent. These shared hosts are retained for consistent egress. Claude-specific community entries supplement the documented roots. Generic font/library CDN hosts and Google OAuth hosts are excluded from dedicated domain routing because their request IP was not established as an identified-user location channel for Anthropic. No claim is made that Anthropic intentionally hides endpoints.

The staging suffix `ant.dev`, unconfirmed SSO host `api.workos.com`, old Fathom host, and historical Statsig/GrowthBook/Sentry entries were removed because their current use was not established. The broad Intercom suffixes were replaced with the exact hostnames supported by the reviewed report. That report is not proof of a complete support host inventory. Stripe hosts are excluded at the owner's request.

The Claude regex covers only the four confirmed suffixes and their subdomains. It does not match `claude.future`, `claude.example.com`, `claude.ai.example.com` or `myclaude.example.com`. The separate `claudeusercontent.com` and MCP rules remain necessary.

The Google Storage owner can enable usage logs containing a client's IP. That is a platform capability, not evidence that Anthropic correlates downloads with account location. See [Cloud Storage usage logs](https://docs.cloud.google.com/storage/docs/access-logs).

## Application rules

The provider also matches native processes named `claude`, `claude.exe`, `Claude`, `Claude Helper` and its named variants, and `claude-desktop`. Windows comparisons are case-insensitive. Android uses the official package ID `com.anthropic.claude`. These rules cover unknown destinations contacted by those processes when the client supplies process metadata.

The native CLI executable was found locally at `~/.local/bin/claude.exe`. Process-name rules do not depend on that installation path. Generic `node`, `python`, `git` and browser processes are not matched. A child process, WSL process or Cowork VM does not automatically inherit the parent application's process match.

See [Mihomo process matching](https://wiki.metacubex.one/en/config/rules/#process-name), [the official Android app](https://play.google.com/store/apps/details?id=com.anthropic.claude) and [an FLClash Android process-rule report](https://github.com/chen08209/FlClash/issues/2100). Android process matching depends on the actual VPN/client setup; the package rule supplements domain routing.

GitHub, npm, generic font/library CDNs and Google OAuth hosts are not added as shared domain rules. Other applications use their ordinary routes to those hosts. Requests from a matched Claude process still go through `Claude`. The retained shared storage, security-challenge, support and telemetry hosts go through `Claude` for all applications, because domain routing cannot distinguish their caller's website.

## Router and browser limits

A finite domain list cannot guarantee the route of every future dependency or arbitrary agent tool request. Unknown destinations from a normal browser, external sign-in providers, custom API gateways and subprocesses need separate rules or an explicitly dedicated proxy path. The current list covers the known endpoint families and observed additions, not all possible internet destinations an agent can visit.

A future router can apply the domain rules to iPad traffic if the device's traffic and DNS go through it. The router cannot see the remote device's application/package identity, so process rules do not add coverage there. Domain recognition depends on the router's DNS mapping or supported traffic sniffing; encrypted DNS, ECH or a separate VPN can prevent it. Configure and verify that capture when the router is available. [Mihomo recommends disabling process lookup on routers](https://wiki.metacubex.one/en/config/general/#process-matching-mode).

The JavaScript enhancement file itself is client-specific. A router needs the generated Mihomo configuration or equivalent groups and rules, not a JavaScript file added to YAML. Cloud-hosted Claude tools and connectors originate outside the local network and are not controlled by this router's outbound routing. [Remote connector network requirements](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp).

