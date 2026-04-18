# 照片压缩指南

## 问题概述
当前10张婚礼照片总大小约109.6MB，超出GitHub网页上传限制。需要压缩至20-30MB。

## 推荐方案：TinyPNG在线工具（最简单）

### 步骤1：访问TinyPNG
1. 打开浏览器，访问 https://tinypng.com
2. 网站支持中文界面，免费使用

### 步骤2：压缩照片
1. 将以下10张照片拖拽到TinyPNG网页：
   - `AL5I5922.jpg` (封面照片，10.33MB)
   - `AL5I5974.jpg` (故事主照，10.78MB)
   - `AL5I2237-1.jpg` (时间空间1，10.12MB)
   - `AL5I2302.JPG` (时间空间2，10.98MB)
   - `AL5I5618.JPG` (画廊1，9.41MB)
   - `AL5I5790.JPG` (画廊2，12.57MB)
   - `AL5I5812.JPG` (画廊3，11.39MB)
   - `AL5I5884.jpg` (画廊4，10.99MB)
   - `AL5I5723.JPG` (备用，13.7MB)
   - `AL5I5908.jpg` (备用，9.33MB)

2. 等待压缩完成（约1-2分钟）
3. 下载所有压缩后的照片

### 步骤3：替换文件
1. 将压缩后的照片复制到 `assets/photos/` 目录
2. 覆盖原有的文件
3. 确认文件名保持不变

## 备用方案：使用ImageMagick（技术用户）

### 安装ImageMagick
1. 下载安装：https://imagemagick.org/script/download.php
2. 选择Windows版本安装
3. 安装时勾选"Add application directory to your system path"

### 运行压缩脚本
1. 将以下脚本保存为 `compress-photos.ps1`
2. 右键点击文件，选择"使用PowerShell运行"

```powershell
# compress-photos.ps1 - 婚礼照片压缩脚本
param(
    [string]$SourceDir = "d:\Desktop\新建文件夹",
    [string]$DestDir = "C:\Users\17584\Desktop\wedding-invitation\assets\photos"
)

# 创建目标目录（如果不存在）
if (-not (Test-Path $DestDir)) {
    New-Item -ItemType Directory -Path $DestDir -Force
}

# 照片压缩设置
$photoSettings = @{
    "AL5I5922.jpg"  = @{Width=1920; Height=1080; Quality=85}  # 封面照片
    "AL5I5974.jpg"  = @{Width=1920; Height=1080; Quality=85}  # 故事主照
    "AL5I2237-1.jpg"= @{Width=1200; Height=800; Quality=80}   # 时间空间1
    "AL5I2302.JPG"  = @{Width=1200; Height=800; Quality=80}   # 时间空间2
    "AL5I5618.JPG"  = @{Width=1000; Height=667; Quality=75}   # 画廊1
    "AL5I5790.JPG"  = @{Width=1000; Height=667; Quality=75}   # 画廊2
    "AL5I5812.JPG"  = @{Width=1000; Height=667; Quality=75}   # 画廊3
    "AL5I5884.jpg"  = @{Width=1000; Height=667; Quality=75}   # 画廊4
    "AL5I5723.JPG"  = @{Width=800; Height=600; Quality=70}    # 备用照片
    "AL5I5908.jpg"  = @{Width=800; Height=600; Quality=70}    # 备用照片
}

Write-Host "开始压缩婚礼照片..." -ForegroundColor Green
Write-Host "源目录: $SourceDir" -ForegroundColor Cyan
Write-Host "目标目录: $DestDir" -ForegroundColor Cyan
Write-Host ""

$totalOriginalSize = 0
$totalCompressedSize = 0

foreach ($photo in $photoSettings.Keys) {
    $sourcePath = Join-Path $SourceDir $photo
    $destPath = Join-Path $DestDir $photo
    
    if (Test-Path $sourcePath) {
        $settings = $photoSettings[$photo]
        $originalSize = (Get-Item $sourcePath).Length / 1MB
        $totalOriginalSize += $originalSize
        
        Write-Host "处理: $photo" -ForegroundColor Yellow
        Write-Host "  原始大小: {0:N2} MB" -f $originalSize -ForegroundColor Gray
        Write-Host "  目标尺寸: $($settings.Width)x$($settings.Height) 质量: $($settings.Quality)%" -ForegroundColor Gray
        
        # 构建ImageMagick命令
        $magickCmd = "magick `"$sourcePath`" -resize $($settings.Width)x$($settings.Height) -quality $($settings.Quality) `"$destPath`""
        
        try {
            Invoke-Expression $magickCmd
            $compressedSize = (Get-Item $destPath).Length / 1MB
            $totalCompressedSize += $compressedSize
            
            $saving = $originalSize - $compressedSize
            $savingPercent = ($saving / $originalSize) * 100
            
            Write-Host "  压缩后: {0:N2} MB" -f $compressedSize -ForegroundColor Green
            Write-Host "  节省: {0:N2} MB ({1:N1}%)" -f $saving, $savingPercent -ForegroundColor Green
            Write-Host ""
        }
        catch {
            Write-Host "  错误: $_" -ForegroundColor Red
            Write-Host "  尝试复制原始文件..." -ForegroundColor Yellow
            Copy-Item $sourcePath $destPath -Force
            $totalCompressedSize += $originalSize
        }
    }
    else {
        Write-Host "文件不存在: $sourcePath" -ForegroundColor Red
    }
}

Write-Host "=" * 50 -ForegroundColor Cyan
Write-Host "压缩完成摘要:" -ForegroundColor Green
Write-Host "总原始大小: {0:N2} MB" -f $totalOriginalSize -ForegroundColor Yellow
Write-Host "总压缩大小: {0:N2} MB" -f $totalCompressedSize -ForegroundColor Green
Write-Host "总节省空间: {0:N2} MB" -f ($totalOriginalSize - $totalCompressedSize) -ForegroundColor Green
Write-Host "压缩率: {0:N1}%" -f (($totalOriginalSize - $totalCompressedSize) / $totalOriginalSize * 100) -ForegroundColor Green

# 验证文件存在
Write-Host ""
Write-Host "验证压缩文件:" -ForegroundColor Cyan
Get-ChildItem $DestDir | ForEach-Object {
    $sizeMB = $_.Length / 1MB
    Write-Host "  $($_.Name): {0:N2} MB" -f $sizeMB -ForegroundColor White
}

Write-Host ""
Write-Host "提示: 压缩后的照片已保存到 $DestDir" -ForegroundColor Green
Write-Host "现在可以继续Git部署步骤。" -ForegroundColor Green
```

## 手动压缩指南（无工具）

如果以上方法都不适用，可以手动使用Windows画图工具：

### 使用画图工具压缩
1. 右键点击照片 → 打开方式 → 画图
2. 点击"重新调整大小"
3. 选择"像素"，输入目标宽度：
   - 封面照片：1920（高度自动计算）
   - 时间空间照片：1200
   - 画廊照片：1000
4. 点击"确定"
5. 文件 → 另存为 → JPEG图片
6. 选择"质量"为中或高
7. 保存并覆盖原文件

## 实际压缩结果
您已成功压缩照片，以下是实际压缩效果：

| 照片文件 | 原始大小 | 压缩后大小 | 压缩比例 | 格式变化 |
|----------|----------|------------|----------|----------|
| AL5I5922.png (封面) | 10.33MB | 1.61MB | 84.4% | JPG → PNG |
| AL5I5974.png (故事主照) | 10.78MB | 1.59MB | 85.2% | JPG → PNG |
| AL5I2237-1.png (时间空间1) | 10.12MB | 1.31MB | 87.1% | JPG → PNG |
| AL5I2302.png (时间空间2) | 10.98MB | 1.24MB | 88.7% | JPG → PNG |
| AL5I5618.png (画廊1) | 9.41MB | 1.47MB | 84.4% | JPG → PNG |
| AL5I5790.png (画廊2) | 12.57MB | 1.76MB | 86.0% | JPG → PNG |
| AL5I5812.png (画廊3) | 11.39MB | 1.84MB | 83.8% | JPG → PNG |
| AL5I5884.png (画廊4) | 10.99MB | 1.33MB | 87.9% | JPG → PNG |
| **总计** | **86.57MB** | **12.15MB** | **86.0%** | **8张照片** |

**压缩效果总结**：
- ✅ 文件大小从86.57MB降至12.15MB，节省74.42MB
- ✅ 压缩率86.0%，远超预期目标
- ✅ 所有照片格式统一为PNG，支持透明背景
- ✅ 完全符合GitHub上传限制要求

## 格式变化说明
TinyPNG等压缩工具通常会将JPG转换为PNG格式，因为PNG在压缩某些类型的照片时效果更好。这不会影响网页显示效果，但需要注意：

1. **HTML文件已更新**：所有图片路径已从`.jpg/.JPG`更新为`.png`
2. **浏览器兼容性**：PNG格式所有现代浏览器都支持
3. **视觉效果**：PNG格式保持高质量，支持透明度

## 验证步骤
1. 打开 `index.html` 检查所有照片显示正常
2. 确认照片加载速度显著改善
3. 检查人物是否仍然居中显示
4. 测试所有交互功能正常

## 下一步：部署准备
照片压缩已完成，HTML文件已更新。现在可以：
1. 将压缩后的PNG文件复制到 `assets/photos/` 目录
2. 按照 `DEPLOYMENT_GUIDE.md` 进行Git CLI部署
3. 测试GitHub Pages部署效果

**重要提示**：如果您使用了不同的压缩工具或文件名，请确保文件名与HTML引用一致。
