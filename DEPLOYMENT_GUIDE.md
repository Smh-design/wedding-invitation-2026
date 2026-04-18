# GitHub Pages 部署指南

## 📋 项目概述
这是一个专为孙鸣航和顾紫薇设计的婚礼邀请函H5长页，现已优化完善，支持微信分享和高德地图精准导航。

## 🚀 部署步骤（Git CLI版本）

### 前提条件：照片压缩已完成
您已成功完成照片压缩，文件格式从JPG转换为PNG，文件大小显著减小：

**实际压缩效果**：
- **原始大小**：约86.57MB（8张核心照片）
- **压缩后大小**：约12.15MB
- **压缩比例**：86.0%，节省74.42MB
- **格式变化**：所有JPG照片已转换为PNG格式

**重要注意事项**：
1. HTML文件中的图片路径已更新为`.png`扩展名
2. 压缩后的PNG文件位于 `D:\Desktop\新建文件夹` 目录
3. 需要将这些PNG文件复制到项目的 `assets/photos/` 目录

**验证步骤**：
1. 打开 `index.html` 检查所有8张照片显示正常
2. 确认照片加载速度快，人物居中显示
3. 测试所有交互功能（倒计时、地图导航、表单提交）

### 步骤1：创建GitHub仓库
1. 访问 [GitHub](https://github.com)
2. 点击右上角 "+" → "New repository"
3. 填写仓库信息：
   - **Repository name**: `wedding-invitation-2026`
   - **Description**: 孙鸣航 & 顾紫薇婚礼邀请函H5长页
   - **Visibility**: Public (推荐)
   - 勾选 "Add a README file"
4. 点击 "Create repository"

### 步骤2：安装和配置Git（如未安装）
1. 下载安装Git for Windows：https://git-scm.com/download/win
2. 安装时使用默认设置，确保勾选以下选项：
   - "Git from the command line and also from 3rd-party software"
   - "Use the OpenSSL library"
   - "Checkout Windows-style, commit Unix-style line endings"
   - "Use Windows' default console window"
3. 配置用户信息（打开Git Bash或命令提示符）：
   ```bash
   git config --global user.name "您的GitHub用户名"
   git config --global user.email "您的GitHub邮箱"
   ```

### 步骤3：使用Git CLI上传项目
1. **克隆仓库到本地**：
   ```bash
   git clone https://github.com/[用户名]/wedding-invitation-2026.git
   cd wedding-invitation-2026
   ```

2. **复制项目文件到仓库目录**：
   - 复制以下文件到仓库目录：
     - `index.html`
     - `style.css`
     - `script.js`
     - `README.md`
     - `DEPLOYMENT_GUIDE.md`
     - `TEST_NAVIGATION.md`
     - `COMPRESS_PHOTOS.md`
   - 复制 `assets/` 文件夹（包含压缩后的照片）

3. **分批提交文件**（避免单次提交过大）：
   ```bash
   # 第一批：核心代码文件
   git add index.html style.css script.js README.md
   git commit -m "添加婚礼邀请函核心代码文件"
   
   # 第二批：文档文件
   git add DEPLOYMENT_GUIDE.md TEST_NAVIGATION.md COMPRESS_PHOTOS.md
   git commit -m "添加部署和测试文档"
   
   # 第三批：照片文件（分批提交）- 注意：所有照片现在都是PNG格式
   git add assets/photos/AL5I5922.png assets/photos/AL5I5974.png
   git commit -m "添加封面和故事主照片"
   
   git add assets/photos/AL5I2237-1.png assets/photos/AL5I2302.png
   git commit -m "添加时间空间模块照片"
   
   git add assets/photos/AL5I5618.png assets/photos/AL5I5790.png assets/photos/AL5I5812.png assets/photos/AL5I5884.png
   git commit -m "添加画廊照片"
   ```

4. **推送到GitHub**：
   ```bash
   git push origin main
   ```

### 步骤4：配置GitHub Pages
1. 进入GitHub仓库页面：Settings → Pages
2. 配置 GitHub Pages：
   - **Source**: 选择 "Deploy from a branch"
   - **Branch**: 选择 "main" 分支，文件夹为 "/(root)"
   - 点击 "Save"
3. 等待部署完成（约1-2分钟）
4. 获取在线地址：`https://[你的GitHub用户名].github.io/wedding-invitation-2026/`

### 步骤5：更新微信分享配置
1. 编辑 `index.html` 文件
2. 更新以下meta标签中的URL：
   ```html
   <!-- 第12行：更新为您的实际GitHub用户名 -->
   <meta property="og:image" content="https://raw.githubusercontent.com/[你的用户名]/wedding-invitation-2026/main/assets/photos/AL5I5922.jpg">
   
   <!-- 第13行：更新为您的GitHub Pages地址 -->
   <meta property="og:url" content="https://[你的用户名].github.io/wedding-invitation-2026/">
   ```
3. 提交更改：
   ```bash
   git add index.html
   git commit -m "更新微信分享配置"
   git push origin main
   ```
4. 推荐使用 `AL5I5922.jpg` 作为分享缩略图

## 📱 微信分享优化

### 分享卡片配置
- **标题**：孙鸣航 & 顾紫薇 | 婚礼邀请函
- **描述**：诚挚邀请您参加孙鸣航与顾紫薇的婚礼，2026年5月4日，阜阳宝龙温德姆至尊豪庭酒店
- **缩略图**：使用封面照片 `AL5I5922.jpg`

### 微信测试步骤
1. 复制GitHub Pages链接
2. 在微信中发送链接
3. 等待链接生成分享卡片
4. 测试导航功能是否正常

## 🗺️ 地图导航验证

### 高德地图短链接
```
https://surl.amap.com/EgMA0Cj88f
```

### 验证步骤
1. 点击页面中的"导航前往"按钮
2. 确认跳转到正确的高德地图位置
3. 验证地址：阜阳市颍州区淮河路1000号 宝龙温德姆至尊豪庭酒店
4. 确认能够正常发起导航路线规划

### 高德地图优势
- **国内用户广泛使用**：高德地图在中国市场占有率较高
- **微信兼容性好**：在微信中可直接唤起高德地图App
- **短链接稳定**：surl.amap.com是高德地图官方短链接服务

## 🔧 技术要点

### 已解决的兼容性问题
1. **微信分享**：添加Open Graph meta标签
2. **移动端适配**：优化viewport设置
3. **地图导航**：使用高德地图短链接，确保准确定位
4. **照片居中**：所有照片添加 `object-position: center center`

### 响应式设计
- 桌面端：完整4列照片画廊
- 平板端：2列照片布局
- 手机端：1列垂直布局

## 📞 故障排除

### 常见问题
1. **微信分享不显示图片**
   - 确保GitHub Pages部署完成
   - 检查图片URL是否正确
   - 等待微信缓存更新（可能需要几分钟）

2. **地图导航不准**
   - 验证地址是否完整：阜阳市颍州区淮河路1000号宝龙温德姆至尊豪庭酒店
   - 测试高德地图直接搜索：https://surl.amap.com/EgMA0Cj88f
   - 确保高德地图App已安装或在微信中可正常打开

3. **页面加载缓慢**
   - 照片已优化，但仍有10张高质量图片
   - GitHub Pages自带CDN加速

### 联系支持
如遇问题，请检查：
- GitHub Pages部署状态
- 微信开发者工具（可选）
- 浏览器控制台错误信息

## 🎉 部署成功标志
1. ✅ GitHub Pages显示绿色"已部署"
2. ✅ 在线地址可正常访问
3. ✅ 微信分享显示完整卡片
4. ✅ 所有功能正常工作
5. ✅ 地图导航准确定位

---

**最后一步**：将GitHub Pages链接分享给亲朋好友，邀请他们参加孙鸣航和顾紫薇的婚礼！

**在线地址示例**：`https://yourusername.github.io/wedding-invitation-2026/`

*祝新人新婚快乐，永结同心！* 💝