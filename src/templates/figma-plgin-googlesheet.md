# Google Sheets Sync

[[Figma]] plugin：[Google Sheets Syncfigma](https://www.figma.com/community/plugin/735770583268406934/Google-Sheets-Sync)

![插件的图片|600](https://photo.237484.xyz/2024/12/b810dea53a2003bd3593dc92a80cab32.webp)

# 插件的作用

可以将 Google sheet 中的数据按照命名规则自动同步填充到对应的文本图层中。在一些需要填充数据的场景中（例如表格、卡片），能大幅提升工作效率。

# 使用准备

- 一张 Google sheet 的数据表（可以去 [这里](https://www.briandunning.com/sample-data/) 下载一个测试数据表用 Google sheet 打开即可）
![示例表格的图片|600](https://photo.237484.xyz/2024/12/1b0e710671cba0cff9159187791df9e5.webp)
- figma 文件，按照数据表的结构对应设置需要同步的文本图层。如下图所示👇
![figmaUI组件示例图片|600](https://photo.237484.xyz/2024/12/7ec7fbddfea5f0dcf7b65dd82b30e1ed.webp)
- 获取 google sheet 同步链接
![Googlesheet分享链接的截图示例|600](https://photo.237484.xyz/2024/12/7173c2d2d9d6ae5ac4617c0390c9c2e2.webp)
这里需要注意的是，同步链接需要是任何人都可以访问的权限设置。
- 填入 Google sheet sync 插件填入同步链接，选择同步范围即可。
![Googlesheet插件同步到figma的选项截图示例|600](https://photo.237484.xyz/2024/12/bee02e7e9daa3856b79714432b28d0dc.webp)

![Googlesheet同步前的figma设计图|600](https://photo.237484.xyz/2024/12/7bbe789f8777aa9f949f1b0f72ed02a0.webp)

未同步前👆

![Googlesheet同步后的figma设计图|600](https://photo.237484.xyz/2024/12/5f64a8564957b2dafc4a8447cf8f4173.webp)

同步完成后👆

# 其它功能

其实这个插件不只是同步文本信息，还可以填入一个图片链接，会自动填充到设定的图层中。更详细的使用文档，可以查看他们的 [官方示例文档](https://www.figma.com/proto/VtXf9HikcehWB7FJrJmApl/Google-Sheets-Sync-%E2%80%93-Documentation)。
