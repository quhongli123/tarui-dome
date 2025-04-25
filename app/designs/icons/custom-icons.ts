/*
 * @Author: 曲洪利 quhongli999@163.com
 * @Date: 2025-01-25 01:51:46
 * @LastEditors: 曲洪利 quhongli999@163.com
 * @LastEditTime: 2025-04-25 13:28:38
 * @FilePath: /V2rayX-main/app/designs/icons/custom-icons.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
const customIconsDefinition: Record<string, string> = {
  h1: '<g fill="currentColor"><path d="M5 17V7h2.144v4.126h4.352V7h2.139v10h-2.139v-4.13H7.144V17H5ZM19.615 7v10h-2.143V9.007h-.06l-2.322 1.435V8.567L17.6 7h2.015Z"/></g>',
  'v2ray-logo':
    '<svg t="1723569426410" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1467"><path d="M832 64 192 64C121.344 64 64 121.344 64 192l0 640c0 70.656 57.344 128 128 128l640 0c70.656 0 128-57.344 128-128L960 192C960 121.344 902.656 64 832 64zM896 672c0 17.664-14.336 32-32 32L768 704l0 64 96 0c17.664 0 32 14.336 32 32S881.664 832 864 832l-128 0c-17.664 0-32-14.336-32-32l0-128c0-17.664 14.336-32 32-32L832 640 832 576l-96 0C718.336 576 704 561.664 704 544S718.336 512 736 512l128 0C881.664 512 896 526.336 896 544L896 672zM864 320l-82.752 0L398.08 797.504C380.48 819.328 354.048 832 326.08 832 287.36 832 256 800.64 256 761.92L256 192 160 192C142.336 192 128 177.664 128 160S142.336 128 160 128l192 0C369.664 128 384 142.336 384 160l0 498.88L654.464 320 608 320C590.336 320 576 305.664 576 288S590.336 256 608 256l256 0C881.664 256 896 270.336 896 288S881.664 320 864 320z" p-id="1468" fill="#1296db"></path></svg>',
};

export const customIcons = Object.fromEntries(
  Object.entries(customIconsDefinition).map(([key, value]) => [key, { body: value }]),
);
// sda
