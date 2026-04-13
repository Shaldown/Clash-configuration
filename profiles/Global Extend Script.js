// ─── Конфигурация ─────────────────────────────────────────────────────────────

const CFG = Object.freeze({
  testUrl: "https://www.google.com/generate_204",
  urlTestInterval: 300,
  fallbackInterval: 180,
  tolerance: 50,
  maxFailedTimes: 5,
  lazy: false,
});

// ─── Названия групп ───────────────────────────────────────────────────────────

const GN = Object.freeze({
  proxy: "Proxy",
  direct: "Без Proxy",
  discord: "Discord",
  youtube: "YouTube",
  games: "Games",

  // Навигация по странам
  allSelect: "All [MANUAL]",
  countryUrlTest: "Select country [URL_TEST]",
  countryFallback: "Select country [FALLBACK]",

  // Агрегированные авто-группы
  nonRuUrlTest: "Non RU/BY [URL_TEST]",
  nonRuFallback: "Non RU/BY [FALLBACK]",
  allUrlTest: "ALL [URL_TEST]",
  ruUrlTest: "RU/BY [URL_TEST]",
  ruFallback: "RU/BY [FALLBACK]",
});

// ─── Иконки ───────────────────────────────────────────────────────────────────

const ICONS = Object.freeze({
  proxy: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Proxy.png",
  direct: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Bypass.png",
  discord: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Discord.png",
  youtube: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/YouTube.png",
  games: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Game.png",
  global: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Global.png",
  map: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Europe_Map.png",
});

// ─── Страны ───────────────────────────────────────────────────────────────────

const C = Object.freeze({
  Argentina: { patterns: ["\\bAR\\b", "Аргентина", "Argentina", "🇦🇷"] },
  Armenia: { patterns: ["\\bAM\\b", "Армения", "Armenia", "🇦🇲"] },
  Austria: { patterns: ["\\bAT\\b", "Австрия", "Austria", "🇦🇹"], isEU: true },
  Belarus: { patterns: ["\\bBY\\b", "Беларусь", "Belarus", "Белоруссия", "🇧🇾"] },
  Belgium: { patterns: ["\\bBE\\b", "Бельгия", "Belgium", "🇧🇪"], isEU: true },
  Brazil: { patterns: ["\\bBR\\b", "Бразилия", "Brazil", "🇧🇷"] },
  Britain: { patterns: ["\\bGB\\b", "Британия", "Britain", "🇬🇧"] },
  Bulgaria: { patterns: ["\\bBG\\b", "Болгария", "Bulgaria", "🇧🇬"], isEU: true },
  Chile: { patterns: ["\\bCL\\b", "Чили", "Chile", "🇨🇱"] },
  Czechia: { patterns: ["\\bCZ\\b", "Чехия", "Czechia", "🇨🇿"], isEU: true },
  Denmark: { patterns: ["\\bDK\\b", "Дания", "Denmark", "🇩🇰"], isEU: true },
  Estonia: { patterns: ["\\bEE\\b", "Эстония", "Estonia", "🇪🇪"], isEU: true },
  Finland: { patterns: ["\\bFI\\b", "Финляндия", "Finland", "🇫🇮"], isEU: true },
  France: { patterns: ["\\bFR\\b", "Франция", "France", "🇫🇷"], isEU: true },
  Germany: { patterns: ["\\bDE\\b", "Германия", "Germany", "🇩🇪"], isEU: true },
  Greece: { patterns: ["\\bGR\\b", "Греция", "Greece", "🇬🇷"], isEU: true },
  HongKong: { patterns: ["\\bHK\\b", "Гонконг", "Hong Kong", "HongKong", "🇭🇰"] },
  Hungary: { patterns: ["\\bHU\\b", "Венгрия", "Hungary", "🇭🇺"], isEU: true },
  India: { patterns: ["\\bIN\\b", "Индия", "India", "🇮🇳"] },
  Ireland: { patterns: ["\\bIE\\b", "Ирландия", "Ireland", "🇮🇪"], isEU: true },
  Israel: { patterns: ["\\bIL\\b", "Израиль", "Israel", "🇮🇱"] },
  Italy: { patterns: ["\\bIT\\b", "Италия", "Italy", "🇮🇹"], isEU: true },
  Kazakhstan: { patterns: ["\\bKZ\\b", "Казахстан", "Kazakhstan", "🇰🇿"] },
  Latvia: { patterns: ["\\bLV\\b", "Латвия", "Latvia", "🇱🇻"], isEU: true },
  Lithuania: { patterns: ["\\bLT\\b", "Литва", "Lithuania", "🇱🇹"], isEU: true },
  Mexico: { patterns: ["\\bMX\\b", "Мексика", "Mexico", "🇲🇽"] },
  Netherlands: { patterns: ["\\bNL\\b", "Нидерланды", "Netherlands", "Holland", "🇳🇱"], isEU: true },
  Norway: { patterns: ["\\bNO\\b", "Норвегия", "Norway", "🇳🇴"] },
  Poland: { patterns: ["\\bPL\\b", "Польша", "Poland", "🇵🇱"], isEU: true },
  Portugal: { patterns: ["\\bPT\\b", "Португалия", "Portugal", "🇵🇹"], isEU: true },
  Romania: { patterns: ["\\bRO\\b", "Румыния", "Romania", "🇷🇴"], isEU: true },
  Russia: { patterns: ["\\bRU\\b", "Россия", "Russia", "🇷🇺"] },
  Serbia: { patterns: ["\\bRS\\b", "Сербия", "Serbia", "🇷🇸"] },
  Slovakia: { patterns: ["\\bSK\\b", "Словакия", "Slovakia", "🇸🇰"], isEU: true },
  SouthAfrica: { patterns: ["\\bZA\\b", "ЮАР", "South Africa", "🇿🇦"] },
  Spain: { patterns: ["\\bES\\b", "Испания", "Spain", "🇪🇸"], isEU: true },
  Sweden: { patterns: ["\\bSE\\b", "Швеция", "Sweden", "🇸🇪"], isEU: true },
  Switzerland: { patterns: ["\\bCH\\b", "Швейцария", "Switzerland", "🇨🇭"] },
  Thailand: { patterns: ["\\bTH\\b", "Таиланд", "Thailand", "🇹🇭"] },
  Turkey: { patterns: ["\\bTR\\b", "Турция", "Turkey", "🇹🇷"] },
  UAE: { patterns: ["\\bAE\\b", "ОАЭ", "UAE", "Emirates", "🇦🇪"] },
  Ukraine: { patterns: ["\\bUA\\b", "Украина", "Ukraine", "🇺🇦"] },
  USA: { patterns: ["\\bUS\\b", "\\bUSA\\b", "Америка", "America", "🇺🇸"] },
});

// ─── Базовые параметры групп ──────────────────────────────────────────────────

// Общее для всех групп
const BASE = Object.freeze({
  "exclude-type": "Shadowsocks",
  "include-all-proxies": true,
});

// Дополнительно для url-test и fallback
const BASE_AUTO = Object.freeze({
  ...BASE,
  url: CFG.testUrl,
  "max-failed-times": CFG.maxFailedTimes,
  lazy: CFG.lazy,
  hidden: true,
});

// ─── DNS ──────────────────────────────────────────────────────────────────────

const DNS_CONFIG = {
  "direct-nameserver": ["https://77.88.8.8/dns-query", "https://8.8.8.8/dns-query"],
  "proxy-server-nameserver": ["1.1.1.1", "8.8.8.8"],
};

// ─── Rule providers ───────────────────────────────────────────────────────────
// Документация: https://wiki.metacubex.one/config/rule-providers/

const RULE_PROVIDERS = {
  local_example: {
    type: "file",
    path: "./rule-sets/local/example.yaml",
    behavior: "classical",
    format: "yaml",
  },
  "category-ru": {
    type: "http",
    behavior: "domain",
    format: "mrs",
    url: "https://raw.githubusercontent.com/hydraponique/roscomvpn-geosite/release/mihomo/category-ru.mrs",
    path: "./rule-sets/category-ru.mrs",
    interval: 86400,
  },
  whitelist: {
    type: "http",
    behavior: "domain",
    format: "mrs",
    url: "https://cdn.jsdelivr.net/gh/hydraponique/roscomvpn-geosite/release/mihomo/whitelist.mrs",
    path: "./rule-sets/whitelist.mrs",
    interval: 86400,
  },
  "direct-ips": {
    type: "http",
    behavior: "ipcidr",
    format: "mrs",
    url: "https://raw.githubusercontent.com/hydraponique/roscomvpn-geoip/release/mihomo/direct.mrs",
    path: "./rule-sets/direct-ips.mrs",
    interval: 86400,
  },
  "ru-apps": {
    type: "http",
    behavior: "classical",
    format: "yaml",
    url: "https://raw.githubusercontent.com/legiz-ru/mihomo-rule-sets/main/other/ru-app-list.yaml",
    path: "./rule-sets/ru-apps.yaml",
    interval: 86400,
  },
  "google-play": {
    type: "http",
    behavior: "domain",
    format: "mrs",
    url: "https://cdn.jsdelivr.net/gh/hydraponique/roscomvpn-geosite/release/mihomo/google-play.mrs",
    path: "./rule-sets/google-play.mrs",
    interval: 86400,
  },
  apple: {
    type: "http",
    behavior: "domain",
    format: "mrs",
    url: "https://raw.githubusercontent.com/hydraponique/roscomvpn-geosite/release/mihomo/apple.mrs",
    path: "./rule-sets/apple.mrs",
    interval: 86400,
  },
  microsoft: {
    type: "http",
    behavior: "domain",
    format: "mrs",
    url: "https://cdn.jsdelivr.net/gh/hydraponique/roscomvpn-geosite/release/mihomo/microsoft.mrs",
    path: "./rule-sets/microsoft.mrs",
    interval: 86400,
  },
  youtube: {
    type: "http",
    behavior: "domain",
    format: "mrs",
    url: "https://raw.githubusercontent.com/hydraponique/roscomvpn-geosite/release/mihomo/youtube.mrs",
    path: "./rule-sets/youtube.mrs",
    interval: 86400,
  },
  twitch: {
    type: "http",
    behavior: "domain",
    format: "mrs",
    url: "https://cdn.jsdelivr.net/gh/hydraponique/roscomvpn-geosite/release/mihomo/twitch.mrs",
    path: "./rule-sets/twitch.mrs",
    interval: 86400,
  },
  "twitch-ads": {
    type: "http",
    behavior: "domain",
    format: "mrs",
    url: "https://cdn.jsdelivr.net/gh/hydraponique/roscomvpn-geosite/release/mihomo/twitch-ads.mrs",
    path: "./rule-sets/twitch-ads.mrs",
    interval: 86400,
  },
  "private-domains": {
    type: "http",
    behavior: "domain",
    format: "mrs",
    url: "https://raw.githubusercontent.com/hydraponique/roscomvpn-geosite/release/mihomo/private.mrs",
    path: "./rule-sets/geosite-private.mrs",
    interval: 86400,
  },
  "private-ips": {
    type: "http",
    behavior: "ipcidr",
    format: "mrs",
    url: "https://raw.githubusercontent.com/hydraponique/roscomvpn-geoip/release/mihomo/private.mrs",
    path: "./rule-sets/geoip-private.mrs",
    interval: 86400,
  },
  "discord-domains": {
    type: "http",
    behavior: "domain",
    format: "mrs",
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/discord.mrs",
    path: "./rule-sets/discord-domains.mrs",
    interval: 86400,
  },
  "discord-voiceips": {
    type: "http",
    behavior: "ipcidr",
    format: "mrs",
    url: "https://raw.githubusercontent.com/legiz-ru/mihomo-rule-sets/main/other/discord-voice-ip-list.mrs",
    path: "./rule-sets/discord-voiceips.mrs",
    interval: 86400,
  },
  "discord-vc": {
    type: "http",
    behavior: "classical",
    format: "yaml",
    url: "https://raw.githubusercontent.com/Shaldown/Clash-Verge-rev-configuration/refs/heads/main/rule-sets/discord_vc.yaml",
    path: "./rule-sets/discord-vc.yaml",
    interval: 86400,
  },
  "torrent-trackers": {
    type: "http",
    behavior: "domain",
    format: "mrs",
    url: "https://github.com/legiz-ru/mihomo-rule-sets/raw/main/other/torrent-trackers.mrs",
    path: "./rule-sets/torrent-trackers.mrs",
    interval: 86400,
  },
  "torrent-clients": {
    type: "http",
    behavior: "classical",
    format: "yaml",
    url: "https://github.com/legiz-ru/mihomo-rule-sets/raw/main/other/torrent-clients.yaml",
    path: "./rule-sets/torrent-clients.yaml",
    interval: 86400,
  },
  games: {
    type: "http",
    behavior: "classical",
    format: "yaml",
    url: "https://raw.githubusercontent.com/roscomvpn/custom-category/release/mihomo/games.yaml",
    path: "./rule-sets/games.yaml",
    interval: 86400,
  },
  steam: {
    type: "http",
    behavior: "domain",
    format: "mrs",
    url: "https://cdn.jsdelivr.net/gh/hydraponique/roscomvpn-geosite/release/mihomo/steam.mrs",
    path: "./rule-sets/steam.mrs",
    interval: 86400,
  },
  epicgames: {
    type: "http",
    behavior: "domain",
    format: "mrs",
    url: "https://cdn.jsdelivr.net/gh/hydraponique/roscomvpn-geosite/release/mihomo/epicgames.mrs",
    path: "./rule-sets/epicgames.mrs",
    interval: 86400,
  },
  pinterest: {
    type: "http",
    behavior: "domain",
    format: "mrs",
    url: "https://cdn.jsdelivr.net/gh/hydraponique/roscomvpn-geosite/release/mihomo/pinterest.mrs",
    path: "./rule-sets/pinterest.mrs",
    interval: 86400,
  },
  quic: {
    type: "http",
    behavior: "classical",
    format: "yaml",
    url: "https://raw.githubusercontent.com/Shaldown/Clash-Verge-rev-configuration/refs/heads/main/rule-sets/quic.yaml",
    path: "./rule-sets/quic.yaml",
    interval: 86400,
  },
};

// ─── Rules ────────────────────────────────────────────────────────────────────
// Документация: https://wiki.metacubex.one/ru/config/rules/

const RULES = [
  // Локальная сеть
  `RULE-SET,private-domains,${GN.direct}`,
  `RULE-SET,private-ips,${GN.direct},no-resolve`,

  // Торренты
  `RULE-SET,torrent-clients,${GN.direct}`,
  `RULE-SET,torrent-trackers,${GN.direct}`,
  `PROCESS-NAME-REGEX,(?i).*torrent.*,${GN.direct}`,

  // Игры
  `RULE-SET,games,${GN.games}`,
  `RULE-SET,steam,${GN.games}`,
  `RULE-SET,epicgames,${GN.games}`,

  // Блокировка QUIC (для VLESS Reality)
  `RULE-SET,quic,REJECT`,

  // YouTube
  `RULE-SET,youtube,${GN.youtube}`,
  `PROCESS-NAME-REGEX,(?i).*youtube.*,${GN.youtube}`,

  // Twitch
  `RULE-SET,twitch-ads,${GN.proxy}`,
  `RULE-SET,twitch,${GN.direct}`,

  // Discord
  `AND,((NETWORK,udp),(DST-PORT,19200-19500)),${GN.discord}`,
  `AND,((RULE-SET,discord-voiceips),(NETWORK,udp),(DST-PORT,50000-50100)),${GN.discord}`,
  `RULE-SET,discord-vc,${GN.discord}`,
  `RULE-SET,discord-domains,${GN.discord}`,
  `PROCESS-NAME-REGEX,(?i).*discord.*,${GN.discord}`,

  // Обновления и пуши
  `RULE-SET,google-play,${GN.direct}`,
  `RULE-SET,apple,${GN.direct}`,
  `RULE-SET,microsoft,${GN.direct}`,

  // Реклама Pinterest
  `RULE-SET,pinterest,${GN.direct}`,

  // СНГ сервисы
  `RULE-SET,category-ru,${GN.direct}`,
  `RULE-SET,whitelist,${GN.direct}`,
  `RULE-SET,ru-apps,${GN.direct}`,
  `RULE-SET,direct-ips,${GN.direct},no-resolve`,

  `MATCH,${GN.proxy}`,
];

// ─── Точка входа ─────────────────────────────────────────────────────────────

function main(config) {
  const proxyNames = (config.proxies ?? []).map((p) => p.name);

  function hasMatchingProxies(group) {
    if (!group.filter) return true;
    const regex = new RegExp(group.filter.replace("(?i)", ""), "i");
    return proxyNames.some((name) => regex.test(name));
  }

  const countryUrlTestGroups = Object.entries(C)
    .map(([name, country]) =>
      makeUrlTestGroup(`${name} ${flagFor(country)} [URL_TEST]`, {
        filter: filterFor(country),
      }),
    )
    .filter(hasMatchingProxies);

  const countryFallbackGroups = Object.entries(C)
    .map(([name, country]) =>
      makeFallbackGroup(`${name} ${flagFor(country)} [FALLBACK]`, {
        filter: filterFor(country),
      }),
    )
    .filter(hasMatchingProxies);

  // Группы (скриптовые встают первыми, локальные из yaml идут следом)
  config["proxy-groups"] ??= [];
  config["proxy-groups"].unshift(
    {
      name: GN.proxy,
      icon: ICONS.proxy,
      type: "select",
      proxies: [
        GN.allSelect,
        GN.countryUrlTest,
        GN.countryFallback,
        GN.nonRuUrlTest,
        GN.nonRuFallback,
        GN.allUrlTest,
        GN.ruUrlTest,
        GN.ruFallback,
      ],
    },
    {
      name: GN.discord,
      icon: ICONS.discord,
      type: "select",
      proxies: [GN.proxy, GN.direct],
    },
    {
      name: GN.youtube,
      icon: ICONS.youtube,
      type: "select",
      proxies: [GN.proxy, GN.direct],
    },
    {
      name: GN.games,
      icon: ICONS.games,
      type: "select",
      proxies: [GN.proxy, GN.direct],
    },
    {
      name: GN.direct,
      icon: ICONS.direct,
      type: "select",
      hidden: true,
      proxies: ["DIRECT"],
    },

    // Навигация по странам
    {
      ...BASE,
      name: GN.allSelect,
      icon: ICONS.global,
      type: "select",
      "exclude-type": undefined,
    },
    {
      name: GN.countryUrlTest,
      icon: ICONS.map,
      type: "select",
      proxies: countryUrlTestGroups.map((g) => g.name),
    },
    {
      name: GN.countryFallback,
      icon: ICONS.map,
      type: "select",
      proxies: countryFallbackGroups.map((g) => g.name),
    },

    // Агрегированные авто-группы
    makeUrlTestGroup(GN.nonRuUrlTest, { "exclude-filter": filterFor(C.Russia, C.Belarus) }),
    makeFallbackGroup(GN.nonRuFallback, { "exclude-filter": filterFor(C.Russia, C.Belarus) }),
    makeUrlTestGroup(GN.allUrlTest),
    makeUrlTestGroup(GN.ruUrlTest, { filter: filterFor(C.Russia, C.Belarus) }),
    makeFallbackGroup(GN.ruFallback, { filter: filterFor(C.Russia, C.Belarus) }),

    // Страны
    ...countryUrlTestGroups,
    ...countryFallbackGroups,
  );

  // DNS
  config.dns ??= {};
  Object.assign(config.dns, DNS_CONFIG);

  // Rule providers (локальные из yaml могут дополнить или переопределить)
  config["rule-providers"] ??= {};
  Object.assign(config["rule-providers"], RULE_PROVIDERS);

  // Rules: скриптовые правила идут первыми, затем локальные из yaml,
  // MATCH всегда последний
  const profileRules = (config.rules ?? []).filter((r) => !r.startsWith("MATCH,"));
  const scriptRules = RULES.filter((r) => !r.startsWith("MATCH,"));
  config.rules = [...scriptRules, ...profileRules, `MATCH,${GN.proxy}`];

  return config;
}

// ─── Построители групп ───────────────────────────────────────────────────────

function makeUrlTestGroup(name, overrides = {}) {
  return {
    ...BASE_AUTO,
    name,
    type: "url-test",
    tolerance: CFG.tolerance,
    interval: CFG.urlTestInterval,
    ...overrides,
  };
}

function makeFallbackGroup(name, overrides = {}) {
  return {
    ...BASE_AUTO,
    name,
    type: "fallback",
    interval: CFG.fallbackInterval,
    ...overrides,
  };
}

// ─── Утилиты ─────────────────────────────────────────────────────────────────

function buildFilter(...patternArrays) {
  return `(?i)(${patternArrays.flat().join("|")})`;
}

function filterFor(...countries) {
  return buildFilter(...countries.map((c) => c.patterns));
}

function flagFor(country) {
  return country.patterns.find((p) => /^\p{Emoji_Presentation}/u.test(p)) ?? "";
}
