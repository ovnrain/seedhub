## seedhub

seedhub 是一个用于 seedhub.cc 详情页的用户脚本，主要把磁力链接列表整理成更清晰的表格，并做了页面间距的轻量优化。

### 功能

- 将磁力列表转为表格展示，包含标题、大小、质量标签和日期
- 多标签展示更紧凑，便于快速筛选信息
- 轻量页面排版优化，减少左右留白

### 适用页面

- https://www.seedhub.cc/movies/*

### 安装

1. 安装浏览器用户脚本插件：
   - Chrome / Edge / Brave: Tampermonkey 或 Violentmonkey
   - Firefox: Tampermonkey 或 Violentmonkey
2. 打开脚本安装地址并确认安装：
   - https://raw.githubusercontent.com/ovnrain/seedhub/main/seedhub.user.js

### 使用方法

1. 确保浏览器已启用用户脚本插件。
2. 打开任意 seedhub 电影详情页（例如 https://www.seedhub.cc/movies/xxxx）。
3. 页面中的磁力链接区域会自动变为表格样式，无需额外操作。

### 更新

脚本通过 `@updateURL` 自动检查更新。你也可以在脚本管理面板中手动更新。

### 常见问题

- 没有效果：确认插件已启用脚本，且页面地址匹配 https://www.seedhub.cc/movies/*。
- 表格为空：当页面没有磁力数据时会显示“暂无数据”。

### 许可

MIT License
