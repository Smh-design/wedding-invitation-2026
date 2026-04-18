# GitHub HTML文件更新指南

## 问题概述
您的婚礼邀请函H5长页的微信分享配置已经更新，但GitHub上的HTML文件还是旧版本（包含占位符`[username]`）。需要将更新后的HTML文件上传到GitHub。

## 已完成的更新
本地 `index.html` 文件已修复以下内容：

### 微信分享配置修复
**原内容（占位符）：**
```html
<meta property="og:image" content="https://raw.githubusercontent.com/[username]/wedding-invitation-2026/main/assets/photos/AL5I5922.png">
<meta property="og:url" content="https://[username].github.io/wedding-invitation-2026/">
```

**更新后内容（实际用户名）：**
```html
<meta property="og:image" content="https://raw.githubusercontent.com/Smh-design/wedding-invitation-2026/main/assets/photos/AL5I5922.png">
<meta property="og:url" content="https://smh-design.github.io/wedding-invitation-2026/">
```

## 更新方法

### 方法一：GitHub网页端更新（推荐）

#### 步骤1：访问GitHub仓库
1. 打开浏览器，访问：`https://github.com/Smh-design/wedding-invitation-2026`
2. 登录您的GitHub账户

#### 步骤2：找到并编辑index.html文件
1. 在仓库文件列表中点击 `index.html` 文件
2. 点击右上角的铅笔图标（编辑按钮）
3. 系统会打开在线编辑器

#### 步骤3：更新微信分享配置
找到以下两行（大约第11-12行）：
```html
<meta property="og:image" content="https://raw.githubusercontent.com/[username]/wedding-invitation-2026/main/assets/photos/AL5I5922.png">
<meta property="og:url" content="https://[username].github.io/wedding-invitation-2026/">
```
替换为：
```html
<meta property="og:image" content="https://raw.githubusercontent.com/Smh-design/wedding-invitation-2026/main/assets/photos/AL5I5922.png">
<meta property="og:url" content="https://smh-design.github.io/wedding-invitation-2026/">
```

#### 步骤4：提交更改
1. 滚动到页面底部
2. 在"Commit changes"部分：
   - **标题**：输入 "更新微信分享配置"
   - **描述**：可选，输入 "修复微信分享卡片显示问题"
3. 选择 "Commit directly to the main branch"
4. 点击 "Commit changes" 按钮

#### 步骤5：验证更新
1. 等待约1-2分钟让GitHub Pages重新部署
2. 访问：`https://smh-design.github.io/wedding-invitation-2026/`
3. 在微信中测试分享功能

### 方法二：使用Git命令行（技术用户）

#### 步骤1：克隆仓库到本地
```bash
git clone https://github.com/Smh-design/wedding-invitation-2026.git
cd wedding-invitation-2026
```

#### 步骤2：替换HTML文件
将本地已修复的 `index.html` 文件复制到仓库目录，覆盖原有文件。

#### 步骤3：提交并推送
```bash
git add index.html
git commit -m "更新微信分享配置"
git push origin main
```

#### 步骤4：等待部署
等待GitHub Pages自动重新部署。

### 方法三：直接上传文件

#### 步骤1：下载已修复的HTML文件
从以下链接下载修复后的HTML文件：
或者使用本地的 `C:\Users\17584\Desktop\wedding-invitation\index.html`

#### 步骤2：上传到GitHub
1. 访问：`https://github.com/Smh-design/wedding-invitation-2026`
2. 点击 "Add file" → "Upload files"
3. 拖拽修复后的 `index.html` 文件
4. 选择 "Commit directly to the main branch"
5. 点击 "Commit changes"

## 验证更新

### 验证1：检查GitHub文件
访问：`https://github.com/Smh-design/wedding-invitation-2026/blob/main/index.html`
确认第11-12行已更新为正确用户名。

### 验证2：测试微信分享
1. 访问：`https://smh-design.github.io/wedding-invitation-2026/`
2. 复制链接
3. 在微信中发送给朋友或文件传输助手
4. 检查分享卡片：
   - 标题：孙鸣航 & 顾紫薇 | 婚礼邀请函
   - 描述：诚挚邀请您参加孙鸣航与顾紫薇的婚礼，2026年5月4日，阜阳宝龙温德姆至尊豪庭酒店
   - 图片：应显示封面照片
   - 链接：正确的GitHub Pages地址

### 验证3：功能测试清单
- [ ] 页面能正常打开
- [ ] 8张照片全部正常显示
- [ ] 倒计时功能正常（显示到2026年5月4日）
- [ ] 点击"导航前往"按钮打开高德地图
- [ ] 宾客回执表单可以提交
- [ ] 移动端显示正常
- [ ] 微信分享卡片显示正确

## 问题排查

### 如果更新后仍显示旧内容
1. **浏览器缓存**：按Ctrl+F5强制刷新
2. **GitHub Pages缓存**：等待2-5分钟
3. **CDN缓存**：最多可能需要1小时

### 如果照片仍无法显示
1. 确认GitHub仓库中有 `assets/photos/` 文件夹
2. 确认文件夹中有8个PNG文件
3. 测试直接访问照片URL：
   ```
   https://smh-design.github.io/wedding-invitation-2026/assets/photos/AL5I5922.png
   ```

### 如果微信分享仍不显示图片
1. 确认微信分享链接使用的是GitHub Pages地址
2. 微信可能需要时间缓存，可以尝试使用微信开发者工具清除缓存

## 最终检查清单
- [ ] HTML文件已更新正确用户名
- [ ] GitHub Pages已重新部署
- [ ] 所有照片正常显示
- [ ] 所有功能正常
- [ ] 微信分享卡片显示正确

完成以上步骤后，您的婚礼邀请函H5长页就完全准备就绪了！