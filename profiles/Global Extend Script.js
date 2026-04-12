// ─── Базовые параметры ──────────────────────────────────────────────────────

const TEST_URL = "https://www.google.com/generate_204";
const URL_TEST_INTERVAL = 300;
const FALLBACK_INTERVAL = 180;
const TOLERANCE = 50;
const MAX_FAILED_TIMES = 5;
const LAZY = false;

const PROXY_GROUP_NAME = "Proxy";
const COUNTRIES_BY_URL_TEST_GROUP_NAME = "Select country [URL_TEST]";
const COUNTRIES_BY_FALLBACK_GROUP_NAME = "Select country [FALLBACK]";
const ALL_SELECT_GROUP_NAME = "All [MANUAL]";
const NON_RU_BY_URL_TEST_GROUP_NAME = "Non RU/BY [URL_TEST]";
const NON_RU_BY_FALLBACK_GROUP_NAME = "Non RU/BY [FALLBACK]";
const ALL_URL_TEST_GROUP_NAME = "ALL [URL_TEST]";
const RU_BY_URL_TEST_GROUP_NAME = "RU/BY [URL_TEST]";
const RU_BY_FALLBACK_GROUP_NAME = "RU/BY [FALLBACK]";

const BASE = {
  "exclude-type": "Shadowsocks",
  "include-all-proxies": true,
  url: TEST_URL,
  "max-failed-times": MAX_FAILED_TIMES,
  lazy: LAZY
};

// ─── Паттерны стран ─────────────────────────────────────────────────────────

const P = Object.freeze({
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

// ─── Утилиты ─────────────────────────────────────────────────────────────────

function buildFilter(...patternArrays) {
  return `(?i)(${patternArrays.flat().join("|")})`;
}

function filterFor(...countries) {
  return buildFilter(
    ...countries.map((country) => country.patterns).filter(Boolean),
  );
}

function filterByProp(prop) {
  const patterns = Object.values(P)
    .filter((country) => country[prop])
    .map((country) => country.patterns);
  return buildFilter(...patterns);
}

function filterExclude(...countries) {
  const patterns = countries
    .flatMap((country) => country.patterns)
    .join("|");
  return `(?i)^((?!.*(?:${patterns})).)*$`;
}

function filterExcludeCountries(...excluded) {
  const patterns = Object.values(P)
    .filter(c => !excluded.includes(c))
    .map(c => c.patterns);
  return buildFilter(...patterns);
}

function flagFor(country) {
  return country.patterns.find(p => /^\p{Emoji_Presentation}/u.test(p)) ?? "";
}


// ─── Построители групп ───────────────────────────────────────────────────────

function makeSelectGroup(name, filter) {
  return { ...BASE, name, type: "select", filter };
}

function makeSelectGroupExclude(name, excludeFilter) {
  return { ...BASE, name, type: "select", "exclude-filter": excludeFilter };
}

function makeAutoGroup(name, groupOverride) {
  return {
    ...BASE,
    name,
    type: "url-test",
    tolerance: TOLERANCE,
    interval: URL_TEST_INTERVAL,
    hidden: true,
    ...groupOverride,
  };
}

function makeFallbackGroup(name, groupOverride) {
  return {
    ...BASE,
    name,
    type: "fallback",
    interval: FALLBACK_INTERVAL,
    hidden: true,
    ...groupOverride,
  };
}

// ─── Определение групп ───────────────────────────────────────────────────────

const PROXY_GROUP = {
  name: PROXY_GROUP_NAME,
  icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Proxy.png",
  type: "select",
  proxies: [
    ALL_SELECT_GROUP_NAME,
    COUNTRIES_BY_URL_TEST_GROUP_NAME,
    COUNTRIES_BY_FALLBACK_GROUP_NAME,
    NON_RU_BY_URL_TEST_GROUP_NAME,
    NON_RU_BY_FALLBACK_GROUP_NAME,
    // ALL_URL_TEST_GROUP_NAME,
    RU_BY_URL_TEST_GROUP_NAME,
    RU_BY_FALLBACK_GROUP_NAME
  ]
};

const ALL_GROUP = {
  ...BASE,
  name: ALL_SELECT_GROUP_NAME,
  icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Global.png",
  type: "select", "exclude-type": undefined
};

const COUNTRY_AUTO_GROUPS = Object.entries(P).flatMap(([name, country]) =>
  makeAutoGroup(`${name} ${flagFor(country)} [URL_TEST]`, { filter: filterFor(country) })
);

const COUNTRY_FALLBACK_GROUPS = Object.entries(P).map(([name, country]) =>
  makeFallbackGroup(`${name} ${flagFor(country)} [FALLBACK]`, { filter: filterFor(country) })
)

// ─── Точка входа ─────────────────────────────────────────────────────────────

function main(config, profileName) {
  if (!config["proxy-groups"]) {
    config["proxy-groups"] = [];
  }

  const proxies = (config.proxies ?? []).map(p => p.name);

  function hasMatches(group) {
    if (!group.filter) return true;
    const re = new RegExp(group.filter.replace("(?i)", ""), "i");
    return proxies.some(name => re.test(name));
  }

  const filteredCountryAutoGroups = COUNTRY_AUTO_GROUPS.filter(hasMatches);
  const filteredCountryFallbackGroups = COUNTRY_FALLBACK_GROUPS.filter(hasMatches);

  const countrieByUrlTestSelectGroup = {
    name: COUNTRIES_BY_URL_TEST_GROUP_NAME,
    type: "select",
    icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Europe_Map.png",
    proxies: filteredCountryAutoGroups.map(g => g.name),
  };

  const countrieByFallbackSelectGroup = {
    name: COUNTRIES_BY_FALLBACK_GROUP_NAME,
    type: "select",
    icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Europe_Map.png",
    proxies: filteredCountryFallbackGroups.map(g => g.name),
  };

  const groups = [
    PROXY_GROUP,
    ALL_GROUP,
    countrieByUrlTestSelectGroup,
    countrieByFallbackSelectGroup,
    makeAutoGroup(NON_RU_BY_URL_TEST_GROUP_NAME, { "exclude-filter": filterFor(P.Russia, P.Belarus) }),
    makeFallbackGroup(NON_RU_BY_FALLBACK_GROUP_NAME, { "exclude-filter": filterFor(P.Russia, P.Belarus) }),
    makeAutoGroup(ALL_URL_TEST_GROUP_NAME),
    makeAutoGroup(RU_BY_URL_TEST_GROUP_NAME, { filter: filterFor(P.Russia, P.Belarus) }),
    makeFallbackGroup(RU_BY_FALLBACK_GROUP_NAME, { filter: filterFor(P.Russia, P.Belarus) }),
    ...filteredCountryAutoGroups,
    ...filteredCountryFallbackGroups,
  ];

  console.log(config["proxy-groups"])
  console.log(groups)

  // config["proxy-groups"] = groups;
  config["proxy-groups"].unshift(...groups);

  if (!config.dns) {
    config.dns = {};
  }

  config.dns["direct-nameserver"] = [
    "https://77.88.8.8/dns-query",
    "https://8.8.8.8/dns-query",
  ];

  config.dns["proxy-server-nameserver"] = [
    "1.1.1.1",
    "8.8.8.8",
  ];

  return config;
}
