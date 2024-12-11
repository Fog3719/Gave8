const workExperiences = {
  chipu: {
    title: "上海奇普乐芯片科技有限公司 高级交互设计师",
    sections: [
      {
        title: "工作内容",
        content: [
          {
            date: "2023.05-2024.07",
            items: [
              "担任 UX 用户体验设计师，负责 EDA 软件产品的整体交互/产品设计。",
              "负责产品的需求沟通调研、竞品研究、需求方案落地及评审。  ",
              "主导并设计多个关键产品模块，涵盖 3D 布局、2D 布线、原理图和网表等。",
              "制定并执行产品交互设计规范和文案管理流程，保证产品设计风格和语言风格的统一性和规范性; ",
              "负责产品需求的设计和制定，确保设计解决方案符合技术和商业要求。",
              "编写详尽的测试用例，覆盖不同场景和功能点。"
            ]
          }
        ]
      },
      {
        title: "工作业绩",
        content: [
          {
            date: null, // 业绩没有时间信息
            items: [
              "1. 成功完成 EDA 产品的信息架构分析，并提出围绕 3D 封装布局的交互产品方案，获得团队与管理层的认可。",
              " 2. 向公司专利技术部门提交 4 份技术交底书，并参与相关产品的技术讨论，推动技术创新。"
            ]
          }
        ]
      }
    ]
  },
  ew: {
    title: "上海绎维软件系统有限公司 高级交互设计师",
    sections: [
      {
        title: "内容",
        content: [
          {
            date: "2023.05-2024.07",
            items: [
              "在多维预算产品 FONE_Planning 、合并报表、大数据平台 Reddata、SPM 绩效返利平台产品的设计与用户体验方面担任管理角色; ",
              "引入敏捷开发模式和结对设计流程，提升设计团队内部的工作效率与产出质量。定期组织设计评审和产品分享会; ",
              "建立公司内统一的产品设计系统，采用原子化设计方法和 figma+Storybook 工具，制定了一套完整的视觉规范和交互规范，并将其应用到所有产品线上。组织设计、前端团队完成预算产品前端组件库转换，采用模块开发方式，分批完成组件库建立; ",
              "制定并执行产品交互设计规范和文案管理流程，保证产品设计风格和语言风格的统一性和规范性; ",
              "从用户体验角度出发，优化改进产品功能，并提出完整且可行的解决方案。参与多个项目的需求分析、原型设计、视觉设计等环节，并与研发团队协作，确保设计方案的实现; ",
              "定期组织项目调研活动，通过访谈、问卷、观察等方式收集用户反馈，并根据数据分析结果进行产品迭代。并与客户沟通协调，及时解决使用过程中遇到的问题和困难。"
            ]
          }
        ]
      },
      {
        title: "业绩",
        content: [
          {
            date: null,
            items: [
              "1. 主导设计的多维预算产品 FONE_Planning 获得 2023 年最佳预算管理产品奖",
              "2. 通过引入敏捷开发模式和结对设计流程，设计团队的工作效率提升了 30%",
              "3. 建立的产品设计系统被公司评为 2023 年度最佳实践案例，并在全公司推广应用"
            ]
          }
        ]
      }
    ]
  },
  zw: {
    title: "上海展湾信息科技有限公司 交互设计师",
    sections:[
      {
        title:"工作内容",
        content:[
          {
            date:"",
            items:[
              "官网改版项目的上线更新。",
              "负责小程序「智慧通 smart」产品设计。",
              "负责物联网「智慧通」后台系统交互设计",
              "更新制定平台项目设计规范。"
            ]
          }
        ]
      },
      {
        title:"业绩",
        content:[
          {
            date:"",
            items:[
              "官网改版项目上线后，用户访问量提升了 20%。",
              "小程序「智慧通 smart」用户量突破 10K。",
              "物联网「智慧通」后台系统交互设计获得客户一致好评。",
              "平台项目设计规范的制定，提升了团队工作效率 30%。"
            ]
          }
        ]
      }
    ]
  },
  yqh:{
    title: "北京一起嗨网络科技有限公司 UI 设计/交互设计",
    sections: [
      {
        title:"工作内容",
        content:[
          {
            date:"",
            items:[
              "负责公司各项目产品的 web 端和移动端 UI 设计、用户体验、交互设计等工作。",
              "根据产品需求文档，独立完成产品原型设计及视觉界面设计，并配合开发人员实现最终效果。",
              "参与项目前期的用户调研、需求分析、逻辑与结构，根据调研分析结果对现有产品的品牌体验、使用体验进行优化迭代。",
              "负责构建公司各个项目的 UI 设计规范，以保持统一的设计风格。"
            ]
          }
        ]
      },
      {
        title:"业绩",
        content:[
          {
            date:"",
            items:[
              "公司官网改版后，用户访问量提升了 15%。",
              "APP 用户量突破 50K，用户活跃度提升了 20%。",
              "构建了公司各个项目的 UI 设计规范，提升了设计效率 25%。",
              "通过用户调研，优化了产品设计，用户满意度提升了 15%。"
            ]
          }
        ]
      }
    ]
  }
};

function showDialog(id) {
  const dialog = document.querySelector('.dialog-overlay');
  const dialogTitle = dialog.querySelector('h2');
  const dialogDescription = dialog.querySelector('p');

  const workExperience = workExperiences[id];
  if (workExperience) {
    dialogTitle.textContent = workExperience.title;
    let descriptionHTML = '';
    workExperience.sections.forEach(section => {
      descriptionHTML += `
        <div class="section">
          <h3 class="text-sm font-medium py-2 opacity-75 text-white ">${section.title}</h3>
          ${section.content.map(item => `
            <div class="item text-base  ">
              ${item.date ? `<span class="date text-sm font-medium  opacity-75 ">${item.date}</span>` : ''}
              <ul>
                ${item.items.map(content => `<li class="py-2">${content}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      `;
    });
    dialogDescription.innerHTML = descriptionHTML;
    dialog.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeDialog() {
  const dialog = document.querySelector('.dialog-overlay');
  dialog.style.display = 'none';
  document.body.style.overflow = '';
}


