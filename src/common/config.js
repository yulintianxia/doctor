//# OAUTH2 密码模式客户端信息
export const VITE_OAUTH2_PASSWORD_CLIENT = "pig:pig";

// # OAUTH2 短信客户端信息
export const VITE_OAUTH2_MOBILE_CLIENT = "app:app";

// # 前端加密密钥
export const VITE_PWD_ENC_KEY = "thanks,pig4cloud";

export const FORM_CONTENT_TYPE = "application/x-www-form-urlencoded";

// @ts-ignore
import * as CryptoJS from "crypto-js";
/**
 *加密处理
 */
export function encryption(src, keyWord) {
  const key = CryptoJS.enc.Utf8.parse(keyWord);
  // 加密
  let encrypted = CryptoJS.AES.encrypt(src, key, {
    iv: key,
    mode: CryptoJS.mode.CFB,
    padding: CryptoJS.pad.NoPadding,
  });
  return encrypted.toString();
}

// GY("管理员", ROLE_1),
// ZG("主管", ROLE_1800057592408461314),
// ZR("主任", ROLE_1800049477449437185),
// YS("医生", ROLE_1800049588564938754);
// HZ("患者", 1800793521747951618L);
// 硬编码,后端不好处理
export const userTypeEnum = {
  'ROLE_1': "GY", // 管理员
  'ROLE_1800057592408461314': "ZG", //
  'ROLE_1800049477449437185': "ZR", //
  'ROLE_1800049588564938754': "YS",
  'ROLE_1800793521747951618':'HZ',
};

export const userTypeArray = [ 
'ROLE_1', 
'ROLE_1800057592408461314',
'ROLE_1800049477449437185',
'ROLE_1800049588564938754',
'ROLE_1800793521747951618'
]
