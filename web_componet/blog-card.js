class CardComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const cardsData = [
            {
                tag: 'Figma',
                imageSrc: '/resourses/cad2.png',
                title: '在 figma 中实现多语言UI设计稿一键切换',
                description: '可以将Google sheet中的数据按照命名规则自动同步填充到对应的文本图层中。在一些需要填充数据的场景中（例如表格、卡片），能大幅提升工作效率。',
                date: '2023-09-04'
            },
            {
                tag: 'AIGC',
                imageSrc: 'https://photo.237484.xyz/2024/md_102313123.png',
                title: 'Stable Diffusion 与 Midjourney',
                description: '首先，让我们来谈一下 Midjourney。总的来说，V5 版本的效果还是不错的。但是，我不是很喜欢在 Discord 上使用它。总感觉它就像一个玩具，用来做生产力工具还是有些麻烦。',
                date: '2023-09-04'
            },
            {
                tag: 'AIGC',
                imageSrc: 'https://photo.237484.xyz/2024/md_102313123.png',
                title: '超好用的 Midjourney 提示词',
                description: '首先，让我们来谈一下 Midjourney。总的来说，V5 版本的效果还是不错的。但是，我不是很喜欢在 Discord 上使用它。总感觉它就像一个玩具，用来做生产力工具还是有些麻烦。',
                date: '2023-09-04'
            }
        ];

        this.shadowRoot.innerHTML = `
            <style>
                /* Tailwind CSS classes are directly used here */
                .card {
                    @apply flex flex-col gap-2 m-4 lg:grid lg:grid-cols-2 lg:grid-rows-4 lg:gap-6 lg:mx-auto lg:max-w-custom-1200;
                }
                .scroll-animation {
                    @apply scroll-animation;
                }
                .tag {
                    @apply tag;
                }
                .object-cover {
                    @apply object-cover object-center rounded-lg w-full h-42;
                }
                .text-xl {
                    @apply text-xl;
                }
                .text-sm {
                    @apply text-sm text-white text-opacity-50 overflow-clip;
                }
                .flex-row {
                    @apply flex flex-row items-center justify-between w-full;
                }
                .readmore {
                    @apply readmore;
                }
            </style>
            <div class="flex flex-col gap-2 m-4 lg:grid lg:grid-cols-2 lg:grid-rows-4 lg:gap-6 lg:mx-auto lg:max-w-custom-1200">
                ${cardsData.map(card => `
                    <div class="card scroll-animation">
                        <span class="tag">${card.tag}</span>
                        <img src="${card.imageSrc}" alt="" class="object-cover" loading="lazy">
                        <h2 class="text-xl">${card.title}</h2>
                        <p class="text-sm">${card.description}</p>
                        <div class="flex-row">
                            <span>${card.date}</span>
                            <button class="readmore">Read More</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

customElements.define('card-component', CardComponent);
