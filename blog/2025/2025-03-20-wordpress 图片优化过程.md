---
slug: wordpress-tu-pain-you-hua-guo-cheng
title: 建站｜WordPress图片优化过程
tags: [site]
---

WordPress站点访问速度和很多因素有关，其中影响较大的就是图片加载。WordPress默认的图片上传是存在WordPress目录下，在上传的时候，会对图像进行压缩（可以关闭），还会生成一堆缩略图，占用服务器硬盘空间。在访问时读取服务器中的图片还会占用大量的带宽，从而影响网站访问速度。尽可能的压缩图片，并保持图片质量，并在WordPress中以外链的形式访问图片，从而达到优化网站访问的目的。
<!-- truncate -->


## 确认好图像尺寸

如果是个人博客网站，图像尺寸更具自己的喜好来就行。  
如果是用于电商，产品图就需要规范好图像的尺寸，这里给出一份GPT推荐的尺寸。 

| 图片类型 | 推荐尺寸 | 推荐格式 | 文件大小 |
|------|------|------|------|
| **产品主图** | 800×800px ~ 2000×2000px | JPEG / WebP | ≤ 200KB |
| **缩略图** | 300×300px ~ 600×600px | JPEG / WebP | ≤ 100KB |
| **详情页图** | 1200×1200px ~ 2000×2000px | JPEG / WebP | ≤ 300KB |
| **横幅 / Banner** | 1920×600px / 1200×500px | JPEG / WebP | ≤ 300KB |
| **LOGO** | 250×100px / 500×200px | PNG / SVG | ≤ 50KB |
| **社交分享图** | 1200×630px (FB), 1080×1080px (IG) | JPEG / PNG | ≤ 200KB |

调整图像尺寸的方法有很多，就不过多介绍。

## 背景透明
根据自己的需要看需不需要将背景处理成透明的。  
背景透明可以使用本地工具PS、GIMP、ImageMagisk，也可以使用remove.bg等在线工具。  
我测试了GIMP和ImageMagisk，两者的处理效果相差不大，边缘处理的不够顺滑，有很严重的锯齿。  
remove.bg处理效果很好，但是需要收费。  

经过一番测试后，我发现Mac上自带的预览处理透明效果还不错。
![](https://media.wuguipeng.com/image/2025/03/17b61a445e17e50dd33638971707c8a255b786ce.png)

**使用预览打开图片 -> 点击“显示标记工具栏” -> 点击“即使Alpha” -> 拖动图像选择 -> 鼠标松开后就会自动框选 -> 按Delete键删除背景。**

![](https://media.wuguipeng.com/image/2025/03/5a1123b67ab5f034090c873449b939959ee75840.png)

比传统的PS、GIMP处理起来更简单，比ImageMagisk命令行工具，可视化处理会更加友好。在线工具需要上传下载麻烦不说，处理还需要收费。当然**即时Alpha**也不是万能的，在处理背景色和物体本身的颜色相近的时候，**即时Alpha**无法准确的识别到物体边缘，还是会出现有锯齿的情况。


## 图像压缩
图像压缩的目的是尽可能在保持质量的情况下，减少图像尺寸。 

在Mac上的预览App就能处理大部份的图像压缩，预览App无法做到的是将PNG图像压缩成PNG图像，如果将PNG图像压缩成JPEG图像，那么图像会丢失Alpha，导致图像没有透明背景。

目前我压缩PNG的方法是使用在线工具[tinypeng](https://tinypng.com/)，也可以使用一款本地工具[PNGOUT](https://advsys.net/ken/utils.htm)，PNGOUT我试用了一下，感觉压缩很慢，tinypng虽然不能设置压缩率，但是压缩率也还行，也不怎么影响画质。


## WordPress 外链插件
图像处理完成之后，将图像上传到图床。

在WordPress中下载一款名为[EXMAGE - WordPress Image Links](https://wordpress.org/plugins/exmage-wp-image-links/)的插件。
![](https://media.wuguipeng.com/image/2025/03/1385d50083b5ea4cf490bc4ca20d55acf7c98c28.png)

安装激活后在上传媒体时就会出现填写URL的地方，将图片添加进去后就会出现在Media里，和自己上传的图片使用方式相同。






