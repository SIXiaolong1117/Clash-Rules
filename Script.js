// 国内DNS服务器
const domesticNameservers = [
  "https://dns.alidns.com/dns-query", // 阿里云公共DNS
  "https://doh.pub/dns-query", // 腾讯DNSPod
  "https://doh.360.cn/dns-query" // 360安全DNS
];
// 国外DNS服务器
const foreignNameservers = [
  "https://1.1.1.1/dns-query", // Cloudflare(主)
  "https://1.0.0.1/dns-query", // Cloudflare(备)
  "https://208.67.222.222/dns-query", // OpenDNS(主)
  "https://208.67.220.220/dns-query", // OpenDNS(备)
  "https://194.242.2.2/dns-query", // Mullvad(主)
  "https://194.242.2.3/dns-query" // Mullvad(备)
];
// DNS配置
const dnsConfig = {
  "enable": true,
  "listen": "0.0.0.0:1053",
  "ipv6": true,
  "use-system-hosts": false,
  "cache-algorithm": "arc",
  "enhanced-mode": "fake-ip",
  "fake-ip-range": "198.18.0.1/16",
  "fake-ip-filter": [
    // 本地主机/设备
    "+.lan",
    "+.local",
    // Windows网络出现小地球图标
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    // QQ快速登录检测失败
    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
    // 微信快速登录检测失败
    "localhost.work.weixin.qq.com"
  ],
  "default-nameserver": ["223.5.5.5", "119.29.29.29", "1.1.1.1", "8.8.8.8"],
  "nameserver": [...domesticNameservers, ...foreignNameservers],
  "proxy-server-nameserver": [...domesticNameservers, ...foreignNameservers],
  "nameserver-policy": {
    "geosite:private,cn,geolocation-cn": domesticNameservers,
    "geosite:google,youtube,telegram,gfw,geolocation-!cn": foreignNameservers
  }
};
// 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "yaml",
  "interval": 86400
};
// 规则集配置
const ruleProviders = {
  "reject": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
    "path": "./ruleset/loyalsoldier/reject.yaml"
  },
  "icloud": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt",
    "path": "./ruleset/loyalsoldier/icloud.yaml"
  },
  "apple": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt",
    "path": "./ruleset/loyalsoldier/apple.yaml"
  },
  "Google": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Google/Google.yaml",
    "path": "./ruleset/blackmatrix7/google.yaml"
  },
  "proxy": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
    "path": "./ruleset/loyalsoldier/proxy.yaml"
  },
  "direct": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
    "path": "./ruleset/loyalsoldier/direct.yaml"
  },
  "Direct": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Direct/Direct.yaml",
    "path": "./ruleset/blackmatrix7/Direct.yaml"
  },
  "private": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
    "path": "./ruleset/loyalsoldier/private.yaml"
  },
  "gfw": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
    "path": "./ruleset/loyalsoldier/gfw.yaml"
  },
  "tld-not-cn": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
    "path": "./ruleset/loyalsoldier/tld-not-cn.yaml"
  },
  "telegramcidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
    "path": "./ruleset/loyalsoldier/telegramcidr.yaml"
  },
  "cncidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
    "path": "./ruleset/loyalsoldier/cncidr.yaml"
  },
  "lancidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
    "path": "./ruleset/loyalsoldier/lancidr.yaml"
  },
  "applications": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
    "path": "./ruleset/loyalsoldier/applications.yaml"
  },
  "OpenAI": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/OpenAI/OpenAI.yaml",
    "path": "./ruleset/blackmatrix7/OpenAI.yaml"
  },
  "GameDownload": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Game/GameDownload/GameDownload.yaml",
    "path": "./ruleset/blackmatrix7/GameDownload.yaml"
  },
  "GameDownloadCN": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Game/GameDownloadCN/GameDownloadCN.yaml",
    "path": "./ruleset/blackmatrix7/GameDownloadCN.yaml"
  },
  "GitHub": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/GitHub/GitHub.yaml",
    "path": "./ruleset/blackmatrix7/GitHub.yaml"
  },
  "Twitter": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Twitter/Twitter.yaml",
    "path": "./ruleset/blackmatrix7/Twitter.yaml"
  },
  "Microsoft": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Microsoft/Microsoft.yaml",
    "path": "./ruleset/blackmatrix7/Microsoft.yaml"
  },
  "Gemini": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Gemini/Gemini.yaml",
    "path": "./ruleset/blackmatrix7/Gemini.yaml"
  },
  "Bing": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Bing/Bing.yaml",
    "path": "./ruleset/blackmatrix7/Bing.yaml"
  },
  "Copilot": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Copilot/Copilot.yaml",
    "path": "./ruleset/blackmatrix7/Copilot.yaml"
  },
  "Facebook": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Facebook/Facebook.yaml",
    "path": "./ruleset/blackmatrix7/Facebook.yaml"
  },
  "Instagram": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Instagram/Instagram.yaml",
    "path": "./ruleset/blackmatrix7/Instagram.yaml"
  },
  "TikTok": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/TikTok/TikTok.yaml",
    "path": "./ruleset/blackmatrix7/TikTok.yaml"
  },
  "Twitch": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Twitch/Twitch.yaml",
    "path": "./ruleset/blackmatrix7/Twitch.yaml"
  },
  "BiliBili": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BiliBili/BiliBili.yaml",
    "path": "./ruleset/blackmatrix7/BiliBili.yaml"
  },
  "BiliBili_Intl": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BiliBiliIntl/BiliBiliIntl.yaml",
    "path": "./ruleset/blackmatrix7/BiliBili_Intl.yaml"
  },
  "iQIYI": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/iQIYI/iQIYI.yaml",
    "path": "./ruleset/blackmatrix7/iQIYI.yaml"
  },
  "iQIYI_Intl": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/iQIYIIntl/iQIYIIntl.yaml",
    "path": "./ruleset/blackmatrix7/iQIYI_Intl.yaml"
  },
  "YouTube": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/YouTube/YouTube.yaml",
    "path": "./ruleset/blackmatrix7/YouTube.yaml"
  },
  "Bahamut": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Bahamut/Bahamut.yaml",
    "path": "./ruleset/blackmatrix7/Bahamut.yaml"
  },
  "NicoNico": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/NicoNico/NicoNico.yaml",
    "path": "./ruleset/blackmatrix7/NicoNico.yaml"
  },
  "PayPal": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/PayPal/PayPal.yaml",
    "path": "./ruleset/blackmatrix7/PayPal.yaml"
  },
  "Zhihu": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Zhihu/Zhihu.yaml",
    "path": "./ruleset/blackmatrix7/Zhihu.yaml"
  },
  "Weibo": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Weibo/Weibo.yaml",
    "path": "./ruleset/blackmatrix7/Weibo.yaml"
  },
  "Baidu": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Baidu/Baidu.yaml",
    "path": "./ruleset/blackmatrix7/Baidu.yaml"
  },
  "BaiduTieba": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BaiduTieba/BaiduTieba.yaml",
    "path": "./ruleset/blackmatrix7/BaiduTieba.yaml"
  },
  "RedNote": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/XiaoHongShu/XiaoHongShu.yaml",
    "path": "./ruleset/blackmatrix7/XiaoHongShu.yaml"
  },
  "OKX": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/OKX/OKX.yaml",
    "path": "./ruleset/blackmatrix7/OKX.yaml"
  },
  "Binance": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Binance/Binance.yaml",
    "path": "./ruleset/blackmatrix7/Binance.yaml"
  },
  "Wikipedia": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Wikipedia/Wikipedia.yaml",
    "path": "./ruleset/blackmatrix7/Wikipedia.yaml"
  },
  "Wikimedia": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Wikimedia/Wikimedia.yaml",
    "path": "./ruleset/blackmatrix7/Wikimedia.yaml"
  },
  "NVIDIA": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/NVIDIA/NVIDIA.yaml",
    "path": "./ruleset/blackmatrix7/NVIDIA.yaml"
  },
  "Pixiv": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Pixiv/Pixiv.yaml",
    "path": "./ruleset/blackmatrix7/Pixiv.yaml"
  },
  "OneDrive": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/OneDrive/OneDrive.yaml",
    "path": "./ruleset/blackmatrix7/OneDrive.yaml"
  },
  "MEGA": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/MEGA/MEGA.yaml",
    "path": "./ruleset/blackmatrix7/MEGA.yaml"
  },
  "Steam": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Steam/Steam.yaml",
    "path": "./ruleset/blackmatrix7/Steam.yaml"
  },
  "SteamCN": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/SteamCN/SteamCN.yaml",
    "path": "./ruleset/blackmatrix7/SteamCN.yaml"
  },
  "Ubisoft": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Ubisoft/Ubisoft.yaml",
    "path": "./ruleset/blackmatrix7/Ubisoft.yaml"
  },
  "UbisoftMe": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/SIXiaolong1117/Clash-Rules/master/Ubisoft/Ubisoft.yaml  ",
    "path": "./ruleset/SIXiaolong1117/UbisoftMe.yaml"
  },
  "GOG": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/GOG/GOG.yaml",
    "path": "./ruleset/blackmatrix7/GOG.yaml"
  },
  "EA": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/EA/EA.yaml",
    "path": "./ruleset/blackmatrix7/EA.yaml"
  },
  "Origin": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Origin/Origin.yaml",
    "path": "./ruleset/blackmatrix7/Origin.yaml"
  },
  "Xbox": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Xbox/Xbox.yaml",
    "path": "./ruleset/blackmatrix7/Xbox.yaml"
  },
  "Nintendo": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Nintendo/Nintendo.yaml",
    "path": "./ruleset/blackmatrix7/Nintendo.yaml"
  },
  "Epic": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Epic/Epic.yaml",
    "path": "./ruleset/blackmatrix7/Epic.yaml"
  },
  "HoYoverse": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/HoYoverse/HoYoverse.yaml",
    "path": "./ruleset/blackmatrix7/HoYoverse.yaml"
  },
  "WutheringWaves": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/WutheringWaves/WutheringWaves.yaml",
    "path": "./ruleset/blackmatrix7/WutheringWaves.yaml"
  },
  "AdAds": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/AdAds/AdAds.yaml",
    "path": "./ruleset/blackmatrix7/AdAds.yaml"
  },
  "ZhihuAds": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ZhihuAds/ZhihuAds.yaml",
    "path": "./ruleset/blackmatrix7/ZhihuAds.yaml"
  },
  "Download": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Download/Download.yaml",
    "path": "./ruleset/blackmatrix7/Download.yaml"
  },
  "Xunlei": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Xunlei/Xunlei.yaml",
    "path": "./ruleset/blackmatrix7/Xunlei.yaml"
  },
  "XiaoMi": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/XiaoMi/XiaoMi.yaml",
    "path": "./ruleset/blackmatrix7/XiaoMi.yaml"
  },
  "Netflix": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Netflix/Netflix_Classical.yaml",
    "path": "./ruleset/blackmatrix7/Netflix_Classical.yaml"
  },
  "ChinaMedia": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia.yaml",
    "path": "./ruleset/blackmatrix7/ChinaMedia.yaml"
  },
  "Docker": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Docker/Docker.yaml",
    "path": "./ruleset/blackmatrix7/Docker.yaml"
  },
  "Discord": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Discord/Discord.yaml",
    "path": "./ruleset/blackmatrix7/Discord.yaml"
  },
  "PlayStation": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/PlayStation/PlayStation.yaml",
    "path": "./ruleset/blackmatrix7/PlayStation.yaml"
  },
  "Privacy": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Privacy/Privacy.yaml",
    "path": "./ruleset/blackmatrix7/Privacy.yaml"
  },
  "Dropbox": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Dropbox/Dropbox.yaml",
    "path": "./ruleset/blackmatrix7/Dropbox.yaml"
  },
  "Civitai": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Civitai/Civitai.yaml",
    "path": "./ruleset/blackmatrix7/Civitai.yaml"
  },
  "Claude": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Claude/Claude.yaml",
    "path": "./ruleset/blackmatrix7/Claude.yaml"
  },
  "Cloudflare": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Cloudflare/Cloudflare.yaml",
    "path": "./ruleset/blackmatrix7/Cloudflare.yaml"
  },
  "Hijacking": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Hijacking/Hijacking.yaml",
    "path": "./ruleset/blackmatrix7/Hijacking.yaml"
  },
  "Amazon": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Amazon/Amazon.yaml",
    "path": "./ruleset/blackmatrix7/Amazon.yaml"
  },
  "Spotify": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Spotify/Spotify.yaml",
    "path": "./ruleset/blackmatrix7/Spotify.yaml"
  },
  "BattleNet": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Spotify/BattleNet.yaml",
    "path": "./ruleset/blackmatrix7/BattleNet.yaml"
  },
  "Adobe": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Adobe/Adobe.yaml",
    "path": "./ruleset/blackmatrix7/Adobe.yaml"
  }
};
// 规则
const rules = [
  'DOMAIN-SUFFIX,zhipin.com,DIRECT',  // BOSS直聘
  'PROCESS-NAME,osu!.exe,DIRECT',
  // 高优先
  'RULE-SET,Privacy,🛡️ 隐私保护',
  'RULE-SET,AdAds,🚫 广告过滤',
  'RULE-SET,ZhihuAds,🚫 广告过滤',
  'RULE-SET,Hijacking,🐞 反劫持',
  'RULE-SET,Adobe,Adobe',
  'PROCESS-NAME,Photoshop.exe,Adobe',
  'PROCESS-NAME,Adobe Premiere Pro.exe,Adobe',
  'PROCESS-NAME,Adobe Media Encoder.exe,Adobe',
  'PROCESS-NAME,AfterFX.exe.exe,Adobe',
  'PROCESS-NAME,Acrobat.exe,Adobe',
  "RULE-SET,GameDownload,游戏下载",
  "RULE-SET,GameDownloadCN,游戏下载(中国)",
  'RULE-SET,Download,各种下载器(例如BT下载)',
  'RULE-SET,Xunlei,各种下载器(例如BT下载)',
  // 自定义规则
  'DOMAIN-SUFFIX,myhome.sixiaolong.win,⬆︎ 直连',
  'DOMAIN-SUFFIX,myhomev4.sixiaolong.win,⬆︎ 直连',
  'DOMAIN-SUFFIX,myhomev6.sixiaolong.win,⬆︎ 直连',
  'DOMAIN-SUFFIX,homeserver.sixiaolong.win,⬆︎ 直连',
  'DOMAIN-SUFFIX,homeserverv4.sixiaolong.win,⬆︎ 直连',
  'DOMAIN-SUFFIX,homeserverv6.sixiaolong.win,⬆︎ 直连',
  'DOMAIN-SUFFIX,web.sixiaolong.win,⬆︎ 直连',
  'DOMAIN-SUFFIX,webv4.sixiaolong.win,⬆︎ 直连',
  'DOMAIN-SUFFIX,webv6.sixiaolong.win,⬆︎ 直连',
  "DOMAIN-SUFFIX,googleapis.cn,☑️ 节点选择", // Google服务
  "DOMAIN-SUFFIX,gstatic.com,☑️ 节点选择", // Google静态资源
  "DOMAIN-SUFFIX,xn--ngstr-lra8j.com,☑️ 节点选择", // Google Play下载服务
  "DOMAIN-SUFFIX,github.io,☑️ 节点选择", // Github Pages
  "DOMAIN,v2rayse.com,☑️ 节点选择", // V2rayse节点工具
  'DOMAIN-SUFFIX,mikanani.me,资源网站',
  'PROCESS-NAME,ACMirage.exe,育碧',
  'PROCESS-NAME,TheDivision2.exe,育碧',
  'PROCESS-NAME,thedivision2launcher.exe,育碧',
  "DOMAIN-SUFFIX,getgrass.io,☑️ 节点选择",
  'DOMAIN-SUFFIX,hassbian.com,⬆︎ 直连',
  'DOMAIN-SUFFIX,v2ex.com,V2EX',
  // EVE Online
  'PROCESS-NAME,exefile.exe,EVE Online',
  // SIXiaolong1117 规则集
  'RULE-SET,UbisoftMe,育碧',
  // blackmatrix7 规则集
  "RULE-SET,OpenAI,OpenAI",
  "RULE-SET,Google,Google",
  'RULE-SET,GitHub,GitHub',
  'RULE-SET,Docker,Docker',
  'RULE-SET,Discord,Discord',
  'RULE-SET,Twitter,Twitter',
  'RULE-SET,Copilot,Bing/Copilot',
  'RULE-SET,Xbox,Xbox',
  'RULE-SET,OneDrive,OneDrive',
  'RULE-SET,Microsoft,Microsoft', // 位置必须在其他微软服务之后
  'RULE-SET,Gemini,Gemini',
  'RULE-SET,Bing,Bing/Copilot',
  'RULE-SET,Claude,Claude',
  'RULE-SET,Facebook,Facebook',
  'RULE-SET,Instagram,Instagram',
  'RULE-SET,TikTok,TikTok',
  'RULE-SET,Twitch,Twitch',
  'RULE-SET,BiliBili,BiliBili',
  'RULE-SET,BiliBili_Intl,BiliBili 国际',
  'RULE-SET,YouTube,Youtube',
  'RULE-SET,Bahamut,巴哈姆特',
  'RULE-SET,NicoNico,NicoNico',
  'RULE-SET,PayPal,PayPal',
  'RULE-SET,Weibo,微博',
  'RULE-SET,XiaoMi,小米',
  'RULE-SET,Pixiv,Pixiv',
  'RULE-SET,MEGA,MEGA',
  'RULE-SET,Steam,Steam',
  'RULE-SET,SteamCN,Steam 中国大陆',
  'RULE-SET,Ubisoft,育碧',
  'RULE-SET,GOG,GOG',
  'RULE-SET,EA,EA',
  'RULE-SET,Origin,EA',
  'RULE-SET,Nintendo,Nintendo',
  'RULE-SET,Epic,Epic',
  'RULE-SET,HoYoverse,HoYoverse',
  'RULE-SET,Dropbox,Dropbox',
  'RULE-SET,Civitai,Civitai',
  'RULE-SET,Cloudflare,Cloudflare',
  'RULE-SET,Amazon,Amazon',
  "RULE-SET,BattleNet,BattleNet",
  // Loyalsoldier 规则集
  "RULE-SET,applications,⬆︎ 直连",
  "RULE-SET,private,⬆︎ 直连",
  "RULE-SET,reject,🚫 广告过滤",
  "RULE-SET,icloud,Microsoft",
  "RULE-SET,apple,Apple",
  "RULE-SET,proxy,☑️ 节点选择",
  "RULE-SET,gfw,☑️ 节点选择",
  "RULE-SET,tld-not-cn,☑️ 节点选择",
  "RULE-SET,lancidr,⬆︎ 直连,no-resolve",
  "RULE-SET,cncidr,⬆︎ 直连,no-resolve",
  "RULE-SET,telegramcidr,Telegram,no-resolve",
  // 低优先  
  'RULE-SET,ChinaMedia,⬆︎ 直连', // 低优先
  "RULE-SET,Direct,⬆︎ 直连",       // 其余需要直连的规则
  "RULE-SET,direct,⬆︎ 直连",       // 比上一天更全，但与上面许多分流规则有包含关系，低优先
  // 其他规则
  "GEOIP,LAN,⬆︎ 直连,no-resolve",
  "GEOIP,CN,⬆︎ 直连,no-resolve",
  "MATCH,🐟 漏网之鱼"
];
// 代理组通用配置
const groupBaseOption = {
  "interval": 300,
  "timeout": 3000,
  "url": "https://www.google.com/generate_204",
  "lazy": true,
  "max-failed-times": 3,
  "hidden": false
};

// 程序入口
function main(config) {
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // 覆盖原配置中DNS配置
  config["dns"] = dnsConfig;

  // 覆盖原配置中的代理组
  config["proxy-groups"] = [
    {
      ...groupBaseOption,
      "name": "☑️ 节点选择",
      "type": "select",
      "proxies": ["⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg"
    },
    {
      ...groupBaseOption,
      "name": "⚡ 延迟选优",
      "type": "url-test",
      "tolerance": 100,
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Auto.png"
    },
    {
      ...groupBaseOption,
      "name": "🚑 故障转移",
      "type": "fallback",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/ambulance.svg"
    },
    {
      ...groupBaseOption,
      "name": "Google",
      "type": "select",
      "proxies": ["☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg"
    },
    {
      ...groupBaseOption,
      "name": "Telegram",
      "type": "select",
      "proxies": ["☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/telegram.svg"
    },
    {
      ...groupBaseOption,
      "name": "GitHub",
      "type": "select",
      "proxies": ["☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Orz-3/mini@master/Color/github.png"
    },
    {
      ...groupBaseOption,
      "name": "Cloudflare",
      "type": "select",
      "proxies": ["☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://www.clashverge.dev/assets/icons/cloudflare.svg"
    },
    {
      ...groupBaseOption,
      "name": "Docker",
      "type": "select",
      "proxies": ["☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://clash-logo.sixiaolong.win/Docker.png"
    },
    {
      ...groupBaseOption,
      "name": "Twitter",
      "type": "select",
      "proxies": ["☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": 'https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Twitter.png'
    },
    {
      ...groupBaseOption,
      "name": "Microsoft",
      "type": "select",
      "url": "https://microsoft.com/",
      "expected-status": "200",
      "proxies": ["⬆︎ 直连", "☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Microsoft.png"
    },
    {
      ...groupBaseOption,
      "name": "Apple",
      "type": "select",
      "proxies": ["⬆︎ 直连", "☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/apple.svg"
    },
    {
      ...groupBaseOption,
      "name": "OpenAI",
      "type": "select",
      "url": "https://chatgpt.com",
      "expected-status": "200",
      "proxies": ["🇺🇸 美国优选", "🇭🇰 香港优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选", "☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连"],
      "include-all": true,
      "filter": "AD|🇦🇩|AE|🇦🇪|AF|🇦🇫|AG|🇦🇬|AL|🇦🇱|AM|🇦🇲|AO|🇦🇴|AR|🇦🇷|AT|🇦🇹|AU|🇦🇺|AZ|🇦🇿|BA|🇧🇦|BB|🇧🇧|BD|🇧🇩|BE|🇧🇪|BF|🇧🇫|BG|🇧🇬|BH|🇧🇭|BI|🇧🇮|BJ|🇧🇯|BN|🇧🇳|BO|🇧🇴|BR|🇧🇷|BS|🇧🇸|BT|🇧🇹|BW|🇧🇼|BZ|🇧🇿|CA|🇨🇦|CD|🇨🇩|CF|🇨🇫|CG|🇨🇬|CH|🇨🇭|CI|🇨🇮|CL|🇨🇱|CM|🇨🇲|CO|🇨🇴|CR|🇨🇷|CV|🇨🇻|CY|🇨🇾|CZ|🇨🇿|DE|🇩🇪|DJ|🇩🇯|DK|🇩🇰|DM|🇩🇲|DO|🇩🇴|DZ|🇩🇿|EC|🇪🇨|EE|🇪🇪|EG|🇪🇬|ER|🇪🇷|ES|🇪🇸|ET|🇪🇹|FI|🇫🇮|FJ|🇫🇯|FM|🇫🇲|FR|🇫🇷|GA|🇬🇦|GB|🇬🇧|GD|🇬🇩|GE|🇬🇪|GH|🇬🇭|GM|🇬🇲|GN|🇬🇳|GQ|🇬🇶|GR|🇬🇷|GT|🇬🇹|GW|🇬🇼|GY|🇬🇾|HN|🇭🇳|HR|🇭🇷|HT|🇭🇹|HU|🇭🇺|ID|🇮🇩|IE|🇮🇪|IL|🇮🇱|IN|🇮🇳|IQ|🇮🇶|IS|🇮🇸|IT|🇮🇹|JM|🇯🇲|JO|🇯🇴|JP|🇯🇵|KE|🇰🇪|KG|🇰🇬|KH|🇰🇭|KI|🇰🇮|KM|🇰🇲|KN|🇰🇳|KR|🇰🇷|KW|🇰🇼|KZ|🇰🇿|LA|🇱🇦|LB|🇱🇧|LC|🇱🇨|LI|🇱🇮|LK|🇱🇰|LR|🇱🇷|LS|🇱🇸|LT|🇱🇹|LU|🇱🇺|LV|🇱🇻|LY|🇱🇾|MA|🇲🇦|MC|🇲🇨|MD|🇲🇩|ME|🇲🇪|MG|🇲🇬|MH|🇲🇭|MK|🇲🇰|ML|🇲🇱|MM|🇲🇲|MN|🇲🇳|MR|🇲🇷|MT|🇲🇹|MU|🇲🇺|MV|🇲🇻|MW|🇲🇼|MX|🇲🇽|MY|🇲🇾|MZ|🇲🇿|NA|🇳🇦|NE|🇳🇪|NG|🇳🇬|NI|🇳🇮|NL|🇳🇱|NO|🇳🇴|NP|🇳🇵|NR|🇳🇷|NZ|🇳🇿|OM|🇴🇲|PA|🇵🇦|PE|🇵🇪|PG|🇵🇬|PH|🇵🇭|PK|🇵🇰|PL|🇵🇱|PS|🇵🇸|PT|🇵🇹|PW|🇵🇼|PY|🇵🇾|QA|🇶🇦|RO|🇷🇴|RS|🇷🇸|RW|🇷🇼|SA|🇸🇦|SB|🇸🇧|SC|🇸🇨|SD|🇸🇩|SE|🇸🇪|SG|🇸🇬|SI|🇸🇮|SK|🇸🇰|SL|🇸🇱|SM|🇸🇲|SN|🇸🇳|SO|🇸🇴|SR|🇸🇷|SS|🇸🇸|ST|🇸🇹|SV|🇸🇻|SZ|🇸🇿|TD|🇹🇩|TG|🇹🇬|TH|🇹🇭|TJ|🇹🇯|TL|🇹🇱|TM|🇹🇲|TN|🇹🇳|TO|🇹🇴|TR|🇹🇷|TT|🇹🇹|TV|🇹🇻|TW|🇹🇼|TZ|🇹🇿|UA|🇺🇦|UG|🇺🇬|US|🇺🇸|UY|🇺🇾|UZ|🇺🇿|VA|🇻🇦|VC|🇻🇨|VN|🇻🇳|VU|🇻🇺|WS|🇼🇸|YE|🇾🇪|ZA|🇿🇦|ZM|🇿🇲|ZW|🇿🇼",
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/chatgpt.svg"
    },
    {
      ...groupBaseOption,
      "name": "Gemini",
      "type": "select",
      "proxies": ["🇺🇸 美国优选", "🇭🇰 香港优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选", "Google", "☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Google_Search.png"
    },
    {
      ...groupBaseOption,
      "name": "Bing/Copilot",
      "type": "select",
      "proxies": ["🇺🇸 美国优选", "🇭🇰 香港优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选", "Microsoft", "☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Orz-3/mini@master/Color/Bing.png"
    },
    {
      ...groupBaseOption,
      "name": "Claude",
      "type": "select",
      "proxies": ["🇺🇸 美国优选", "🇭🇰 香港优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选", "☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连"],
      "include-all": true,
      "icon": "https://www.clashverge.dev/assets/icons/claude.svg"
    },
    {
      ...groupBaseOption,
      "name": "Civitai",
      "type": "select",
      "proxies": ["☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://clash-logo.sixiaolong.win/Civitai.png"
    },
    {
      ...groupBaseOption,
      "name": "Facebook",
      "type": "select",
      "proxies": ["☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Facebook.png"
    },
    {
      ...groupBaseOption,
      "name": "Discord",
      "type": "select",
      "proxies": ["☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Discord.png"
    },
    {
      ...groupBaseOption,
      "name": "Instagram",
      "type": "select",
      "proxies": ["☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Instagram.png"
    },
    {
      ...groupBaseOption,
      "name": "TikTok",
      "type": "select",
      "proxies": ["🇯🇵 日本优选", "☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/TikTok_2.png"
    },
    {
      ...groupBaseOption,
      "name": "Twitch",
      "type": "select",
      "proxies": ["☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Twitch.png"
    },
    {
      ...groupBaseOption,
      "name": "BiliBili",
      "type": "select",
      "proxies": ["⬆︎ 直连", "☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/bilibili_3.png"
    },
    {
      ...groupBaseOption,
      "name": "BiliBili 国际",
      "type": "select",
      "proxies": ["☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/bilibili.png"
    },
    {
      ...groupBaseOption,
      "name": "Youtube",
      "type": "select",
      "proxies": ["☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg"
    },
    {
      ...groupBaseOption,
      "name": "巴哈姆特",
      "type": "select",
      "proxies": ["🇨🇳 台湾优选", "☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Bahamut.png"
    },
    {
      ...groupBaseOption,
      "name": "NicoNico",
      "type": "select",
      "proxies": ["🇯🇵 日本优选", "☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/niconico.png"
    },
    {
      ...groupBaseOption,
      "name": "PayPal",
      "type": "select",
      "proxies": ["☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Orz-3/mini@master/Color/Paypal.png"
    },
    {
      ...groupBaseOption,
      "name": "微博",
      "type": "select",
      "proxies": ["⬆︎ 直连", "❌️ 拦截", "☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/shindgewongxj/WHATSINStash@master/icon/weibo.png"
    },
    {
      ...groupBaseOption,
      "name": "V2EX",
      "type": "select",
      "proxies": ["☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://clash-logo.sixiaolong.win/V2EX.png"
    },
    {
      ...groupBaseOption,
      "name": "Amazon",
      "type": "select",
      "proxies": ["☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://clash-logo.sixiaolong.win/Amazon.png"
    },
    {
      ...groupBaseOption,
      "name": "Adobe",
      "type": "select",
      "proxies": ["⬆︎ 直连", "❌️ 拦截", "☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://clash-logo.sixiaolong.win/Adobe.png"
    },
    {
      ...groupBaseOption,
      "name": "小米",
      "type": "select",
      "proxies": ["⬆︎ 直连", "☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://clash-logo.sixiaolong.win/Xiaomi.png"
    },
    {
      ...groupBaseOption,
      "name": "Pixiv",
      "type": "select",
      "proxies": ["🇯🇵 日本优选", "☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://clash-logo.sixiaolong.win/Pixiv.png"
    },
    {
      ...groupBaseOption,
      "name": "资源网站",
      "type": "select",
      "proxies": ["🇭🇰 香港优选", "☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Orz-3/mini@master/Color/SSR.png"
    },
    {
      ...groupBaseOption,
      "name": "OneDrive",
      "type": "select",
      "proxies": ["⬆︎ 直连", "Microsoft", "☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/OneDrive.png"
    },
    {
      ...groupBaseOption,
      "name": "MEGA",
      "type": "select",
      "proxies": ["☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/OneDrive.png"
    },
    {
      ...groupBaseOption,
      "name": "Dropbox",
      "type": "select",
      "proxies": ["☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/OneDrive.png"
    },
    {
      ...groupBaseOption,
      "name": "Steam",
      "type": "select",
      "proxies": ["☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Steam.png"
    },
    {
      ...groupBaseOption,
      "name": "Steam 中国大陆",
      "type": "select",
      "proxies": ["⬆︎ 直连", "☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://clash-logo.sixiaolong.win/SteamCN.png"
    },
    {
      ...groupBaseOption,
      "name": "育碧",
      "type": "select",
      "proxies": ["☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://clash-logo.sixiaolong.win/Ubisoft.png"
    },
    {
      ...groupBaseOption,
      "name": "GOG",
      "type": "select",
      "proxies": ["☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://clash-logo.sixiaolong.win/GOG.png"
    },
    {
      ...groupBaseOption,
      "name": "EA",
      "type": "select",
      "proxies": ["☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://clash-logo.sixiaolong.win/EA.png"
    },
    {
      ...groupBaseOption,
      "name": "Xbox",
      "type": "select",
      "proxies": ["☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Xbox.png"
    },
    {
      ...groupBaseOption,
      "name": "Nintendo",
      "type": "select",
      "proxies": ["☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Nintendo.png"
    },
    {
      ...groupBaseOption,
      "name": "Epic",
      "type": "select",
      "proxies": ["☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Epic_Games.png"
    },
    {
      ...groupBaseOption,
      "name": "BattleNet",
      "type": "select",
      "proxies": ["☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://clash-logo.sixiaolong.win/BattleNet.png"
    },
    {
      ...groupBaseOption,
      "name": "HoYoverse",
      "type": "select",
      "proxies": ["🇯🇵 日本负载均衡(散列)", "☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选", "🇭🇰 香港负载均衡(散列)", "🇺🇸 美国负载均衡(散列)", "🇯🇵 日本负载均衡(散列)", "🇨🇳 台湾负载均衡(散列)", "🇸🇬 新加坡负载均衡(散列)"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Orz-3/mini@master/Color/mihoyo.png"
    },
    {
      ...groupBaseOption,
      "name": "无限暖暖",
      "type": "select",
      "proxies": ["🇯🇵 日本负载均衡(散列)", "☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选", "🇭🇰 香港负载均衡(散列)", "🇺🇸 美国负载均衡(散列)", "🇯🇵 日本负载均衡(散列)", "🇨🇳 台湾负载均衡(散列)", "🇸🇬 新加坡负载均衡(散列)"],
      "include-all": true,
      "icon": "https://clash-logo.sixiaolong.win/InfinityNikki.png"
    },
    {
      ...groupBaseOption,
      "name": "战舰世界",
      "type": "select",
      "proxies": ["🇭🇰 香港优选", "☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": ""
    },
    {
      ...groupBaseOption,
      "name": "坦克世界",
      "type": "select",
      "proxies": ["🇭🇰 香港优选", "☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": ""
    },
    {
      ...groupBaseOption,
      "name": "战机世界",
      "type": "select",
      "proxies": ["🇭🇰 香港优选", "☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": ""
    },
    {
      ...groupBaseOption,
      "name": "STEEL HUNTERS",
      "type": "select",
      "proxies": ["🇭🇰 香港优选", "☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": ""
    },
    {
      ...groupBaseOption,
      "name": "CSOL",
      "type": "select",
      "proxies": ["🇭🇰 香港优选", "☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": ""
    },
    {
      ...groupBaseOption,
      "name": "梦幻之星 Online2 New Genesis",
      "type": "select",
      "proxies": ["⬆︎ 直连", "☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://clash-logo.sixiaolong.win/PSO2NGS.png"
    },    
    {
      ...groupBaseOption,
      "name": "EVE Online",
      "type": "select",
      "proxies": ["🇭🇰 香港优选", "☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://clash-logo.sixiaolong.win/EVE.png"
    },
    {
      ...groupBaseOption,
      "name": "重返未来1999",
      "type": "select",
      "proxies": ["🇭🇰 香港负载均衡(散列)", "☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选", "🇭🇰 香港负载均衡(散列)", "🇺🇸 美国负载均衡(散列)", "🇯🇵 日本负载均衡(散列)", "🇨🇳 台湾负载均衡(散列)", "🇸🇬 新加坡负载均衡(散列)"],
      "include-all": true,
      "icon": "https://clash-logo.sixiaolong.win/1999.png"
    },
    {
      ...groupBaseOption,
      "name": "各种下载器(例如BT下载)",
      "type": "select",
      "proxies": ["⬆︎ 直连", "☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Download.png"
    },
    {
      ...groupBaseOption,
      "name": "游戏下载",
      "type": "select",
      "proxies": ["⬆︎ 直连", "☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Download.png"
    },
    {
      ...groupBaseOption,
      "name": "游戏下载(中国)",
      "type": "select",
      "proxies": ["⬆︎ 直连", "☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Download.png"
    },
    {
      ...groupBaseOption,
      "name": "🚫 广告过滤",
      "type": "select",
      "proxies": ["❌️ 拦截", "⬆︎ 直连"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Advertising.png"
    },
    {
      ...groupBaseOption,
      "name": "🐞 反劫持",
      "type": "select",
      "proxies": ["❌️ 拦截", "⬆︎ 直连"],
      "icon": "https://www.clashverge.dev/assets/icons/bug.svg"
    },
    {
      ...groupBaseOption,
      "name": "🛡️ 隐私保护",
      "type": "select",
      "proxies": ["⬆︎ 直连", "❌️ 拦截"],
      "icon": "https://www.clashverge.dev/assets/icons/guard.svg"
    },
    {
      ...groupBaseOption,
      "name": "🐟 漏网之鱼",
      "type": "select",
      "proxies": ["☑️ 节点选择", "⚡ 延迟选优", "🚑 故障转移", "负载均衡(散列)", "负载均衡(轮询)", "⬆︎ 直连", "🇭🇰 香港优选", "🇺🇸 美国优选", "🇯🇵 日本优选", "🇨🇳 台湾优选", "🇸🇬 新加坡优选"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg"
    },
    {
      ...groupBaseOption,
      "name": "⬆︎ 直连",
      "type": "select",
      "proxies": ["DIRECT"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
    },
    {
      ...groupBaseOption,
      "name": "❌️ 拦截",
      "type": "select",
      "proxies": ["REJECT"],
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Reject.png"
    },
    {
      ...groupBaseOption,
      "name": "负载均衡(散列)",
      "type": "load-balance",
      "strategy": "consistent-hashing",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg"
    },
    {
      ...groupBaseOption,
      "name": "负载均衡(轮询)",
      "type": "load-balance",
      "strategy": "round-robin",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg"
    },
    {
      ...groupBaseOption,
      "name": "🇭🇰 香港优选",
      "type": "url-test",
      "tolerance": 100,
      "include-all": true,
      "filter": "HK|🇭🇰",
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Hong_Kong.png"
    },
    {
      ...groupBaseOption,
      "name": "🇭🇰 香港负载均衡(散列)",
      "type": "load-balance",
      "strategy": "consistent-hashing",
      "include-all": true,
      "filter": "HK|🇭🇰",
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Hong_Kong.png"
    },
    {
      ...groupBaseOption,
      "name": "🇺🇸 美国优选",
      "type": "url-test",
      "tolerance": 100,
      "include-all": true,
      "filter": "US|🇺🇸",
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/United_States.png"
    },
    {
      ...groupBaseOption,
      "name": "🇺🇸 美国负载均衡(散列)",
      "type": "load-balance",
      "strategy": "consistent-hashing",
      "include-all": true,
      "filter": "US|🇺🇸",
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/United_States.png"
    },
    {
      ...groupBaseOption,
      "name": "🇯🇵 日本优选",
      "type": "url-test",
      "tolerance": 100,
      "include-all": true,
      "filter": "JP|🇯🇵",
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Japan.png"
    },
    {
      ...groupBaseOption,
      "name": "🇯🇵 日本负载均衡(散列)",
      "type": "load-balance",
      "strategy": "consistent-hashing",
      "include-all": true,
      "filter": "JP|🇯🇵",
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Japan.png"
    },
    {
      ...groupBaseOption,
      "name": "🇨🇳 台湾优选",
      "type": "url-test",
      "tolerance": 100,
      "include-all": true,
      "filter": "TW|🇨🇳",
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/China.png"
    },
    {
      ...groupBaseOption,
      "name": "🇨🇳 台湾负载均衡(散列)",
      "type": "load-balance",
      "strategy": "consistent-hashing",
      "include-all": true,
      "filter": "TW|🇨🇳",
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/China.png"
    },
    {
      ...groupBaseOption,
      "name": "🇸🇬 新加坡优选",
      "type": "url-test",
      "tolerance": 100,
      "include-all": true,
      "filter": "SG|🇸🇬",
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Singapore.png"
    },
    {
      ...groupBaseOption,
      "name": "🇸🇬 新加坡负载均衡(散列)",
      "type": "load-balance",
      "strategy": "consistent-hashing",
      "include-all": true,
      "filter": "SG|🇸🇬",
      "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Singapore.png"
    },
  ];

  // 覆盖原配置中的规则
  config["rule-providers"] = ruleProviders;
  config["rules"] = rules;

  // 返回修改后的配置
  return config;
}