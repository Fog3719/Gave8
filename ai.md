首先，让我们来谈一下 Midjourney。总的来说，V5 版本的效果还是不错的。但是，我不是很喜欢在 Discord 上使用它。总感觉它就像一个玩具，用来做生产力工具还是有些麻烦。
![Midjourney网站示例图|600](https://photo.237484.xyz/2024/12/1f711d10b511e9126abe8bd98b53a862.webp)

最近，我比较常使用 niji 模型来生成插图，同时配合最新推出的 describes image 功能，真的很方便。将 Midjourney 生成的插图再放到 illustrator 里转换为矢量图像，就可以任意修改了。

但是，Midjourney 也有一些缺点。如对生成结果无法继续精细调整。而且，在 Discord 的交互体验也很糟糕。我需要在其他工具里管理 prompt，再将生成的内容黏贴到 Discord 中。

这里强烈推荐一个推友的 [prompt](https://github.com/jesselau76/GPT-Prompts/tree/main/midjourney-prompt-generator)，配合 GPT 可以非常轻松的生成各种真实图片，此外这个 prompt 也可以仔细学习一下，如何使用自然语言编程。😄

我特别希望有一个类似于 SD 的 webui 操作页面，这样会更有效率一些。还有就是它的价格相对于开源的 SD 来说是太贵了。
![comfyUI的UI页面示例|600](https://photo.237484.xyz/2024/12/136b78e55f3afb5e4dc9bacac1857479.webp)
接下来说说 Stable Diffusion。我最先使用的是它，第一印象就是它比 Midjourney 更像是一个真正的生产力工具。因为它有多个 webUI 界面 [AUTOMATIC1111](https://github.com/AUTOMATIC1111/stable-diffusion-webui) 和 [ComfyUI](https://github.com/comfyanonymous/ComfyUI)。其中 ComfyUI 非常酷，可以实现很多在 webUI 中搞不定的效果，绝对值得研究一下。Stable Diffusion 有灵活的部署方式（本地部署、云端部署）。此外，社区开源的模型也非常多不过 NSFW 的模型很泛滥，在 Negative prompt 中需要增加的关键词很多。不过 SD 有 embeddings 这种训练好的数据集直接下载一个引用一下就好了，还有很多社区插件，最有名的就是 ControlNet，这个插件大幅度降低了生成图片的随机性，也可以让 prompt 不需要在关注人物的姿势和构图了。最新版已经可以用来控制人物表情了。😄 
![automatic1111的UI页面示例|600](https://photo.237484.xyz/2024/12/af7f78f73f67285b354d1cc2c1f17257.webp)
顺便说一句，一直觉得这种文本生成图片的方式非常愚蠢，我的工作流一般是先在 Pinterest 上搜索合适的图片，之后再放到 Midjourney 中生成 prompt，选一个差不多的让它生成一张看看效果，之后再调整 prompt，增加一些想要的元素或需要强调的。直到满意为止。如果还需要继续调整，可以直接放到 illustrator

我主要是根据社区提供的 colab 脚本把 Stable Diffusion 安装在 Google driven 上，用起来也很方便。我试着使用两个人像的 lora 模型训练后，感觉非常神奇。用 Stable Diffusion 训练 lora 模型不需要太多的图片，只需要 20 多张就可以了，训练时间也很快。加上设定好的关键词，最后生成的图片效果已经很接近原始素材了。
![Stable Diffusion模型社区页面示例图|600](https://photo.237484.xyz/2024/12/75d6df6872a8c40c3e4343b25ea4061a.webp)
Stable Diffusion 非常适合在某一领域内集中训练一个模型来使用。所以，想用好 Stable Diffusion，第一步应该去社区选一个适合的模型。现在，Stable Diffusion 里还有一个非常棒的脚本功能，可以根据设定的参数批量生成效果图。非常适合需要反复调整参数来研究模型的人。
![Stable Diffusion批量训练图片的示例图|600](https://photo.237484.xyz/2024/12/a4423c3bcf586d8cbde0f03d19095885.webp)
但是，Stable Diffusion 现在的问题主要是门槛很高，使用起来也比 Midjourney 要麻烦得多。听说新版的 Stable Diffusion 已经没办法在消费级显卡上部署了，这对开源社区来说 really bad news。

我一直相信，这种 AIGC 的软件最好能支持个人用户本地部署。因为完全的在线服务实在有点不让人放心，特别是在我们所处的这个网络环境下。

总之，如果你不想花太多钱买显卡或者没有特别的需求，可以直接选择 Midjourney。而如果你是专业设计师并且需要更高稳定的生成结果，则推荐使用 Stable Diffusion。