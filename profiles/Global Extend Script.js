// ─── Конфигурация ─────────────────────────────────────────────────────────────

const CFG = Object.freeze({
  testUrl: "https://www.google.com/generate_204",
  urlTestInterval: 300,
  fallbackInterval: 180,
  tolerance: 50,
  maxFailedTimes: 5,
  /* Возможно, на смартфоне стоит установить в true */
  lazy: false,
});

// ─── Названия групп ───────────────────────────────────────────────────────────

const GN = Object.freeze({
  proxy: "Proxy",
  allSelect: "All [MANUAL]",
  countryUrlTest: "Select country [URL_TEST]",
  countryFallback: "Select country [FALLBACK]",
  nonRuUrlTest: "Non RU/BY [URL_TEST]",
  nonRuFallback: "Non RU/BY [FALLBACK]",
  allUrlTest: "ALL [URL_TEST]",
  ruUrlTest: "RU/BY [URL_TEST]",
  ruFallback: "RU/BY [FALLBACK]",
});

// ─── Иконки ───────────────────────────────────────────────────────────────────

const ICONS = Object.freeze({
  proxy: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Proxy.png",
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

// Дополнительно для авто-групп (url-test, fallback)
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
  // Пример:
  // my_list: {
  //   type: "http",
  //   behavior: "domain",
  //   format: "text",
  //   url: "https://example.com/list.txt",
  //   interval: 86400,
  //   path: "./providers/my_list.txt",
  // },
};

// ─── Rules ────────────────────────────────────────────────────────────────────
// Документация: https://wiki.metacubex.one/config/rules/

const RULES = [
  // Пример:
  // `RULE-SET,my_list,${GN.proxy}`,
  // `GEOIP,RU,${GN.ruUrlTest}`,
  // "MATCH,DIRECT",
];

// ─── Точка входа ─────────────────────────────────────────────────────────────

function main(config) {
  // Группы по странам
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

  // Группы
  const groups = [
    // Основная
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

    // Ручной выбор из всех прокси
    {
      ...BASE,
      name: GN.allSelect,
      icon: ICONS.global,
      type: "select",
      "exclude-type": undefined,
    },

    // Выбор страны из авто-групп
    {
      name: GN.countryUrlTest,
      type: "select",
      icon: ICONS.map,
      proxies: countryUrlTestGroups.map((g) => g.name),
    },
    {
      name: GN.countryFallback,
      type: "select",
      icon: ICONS.map,
      proxies: countryFallbackGroups.map((g) => g.name),
    },

    // Агрегированные авто-группы
    makeUrlTestGroup(GN.nonRuUrlTest, {
      "exclude-filter": filterFor(C.Russia, C.Belarus),
    }),
    makeFallbackGroup(GN.nonRuFallback, {
      "exclude-filter": filterFor(C.Russia, C.Belarus),
    }),
    makeUrlTestGroup(GN.allUrlTest),
    makeUrlTestGroup(GN.ruUrlTest, {
      filter: filterFor(C.Russia, C.Belarus),
    }),
    makeFallbackGroup(GN.ruFallback, {
      filter: filterFor(C.Russia, C.Belarus),
    }),

    // Группы по странам
    ...countryUrlTestGroups,
    ...countryFallbackGroups,
  ];

  config["proxy-groups"] ??= [];
  config["proxy-groups"].unshift(...groups);

  // DNS
  config.dns ??= {};
  Object.assign(config.dns, DNS_CONFIG);

  // Rule providers
  if (Object.keys(RULE_PROVIDERS).length > 0) {
    config["rule-providers"] ??= {};
    Object.assign(config["rule-providers"], RULE_PROVIDERS);
  }

  // Rules
  if (RULES.length > 0) {
    config.rules ??= [];
    config.rules.unshift(...RULES);
  }

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
