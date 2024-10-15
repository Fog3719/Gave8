const workExperiences = {
 chipu: {
    title: "Shanghai Chipuller Chip Technology Co., Ltd.",
    description: "2023.05-2024.07 上海奇普乐芯片科技有限公司 交互设计师 内容: 1.担任UX用户体验设计师，负责EDA软件产品的整体交互/产品设计。2.负责产品的需求沟通调研、竞品研究、需求方案落地及评审。3.主导并设计多个关键产品模块，涵盖3D布局、2D布线、原理图和网表等。4.负责产品需求的设计和制定，确保设计解决方案符合技术和商业要求。5.主导并完成产品design system的建立与维护6.编写详尽的测试用例，覆盖不同场景和功能点。业绩:1. 成功完成EDA产品的信息架构分析，并提出围绕3D封装布局的交互产品方案，获得团队与管理层的认可。2. 向公司专利技术部门提交4份技术交底书，并参与相关产品的技术讨论，推动技术创新。"
  },
  ew: {
    title: "Shanghai Ewaresoft Co., Ltd.",
    description: "2019.01-2023.03 上海易软信息技术有限公司 前端开发工程师 内容: 1.负责公司网站的前端开发和维护。2.使用HTML、CSS、JavaScript等技术实现页面的交互效果。3.与后端开发人员协作，完成数据接口的对接。4.优化网站性能，提升用户体验。"
  },
  zw: {
    title: "Shanghai Zhanwan Co., Ltd.",
    description: "2018.04-2019.01 上海展湾科技有限公司 软件工程师 内容: 1.参与公司内部管理系统的开发。2.使用Java和Spring框架进行后端开发。3.负责数据库设计和优化。4.与团队成员协作，完成项目开发任务。"
  },
  yqh: {
    title: "Beijing Yiqihi Co., Ltd.",
    description: "2016.02-2018.03 北京一起嗨科技有限公司 产品经理 内容: 1.负责公司产品的需求分析和产品设计。2.制定产品开发计划，协调开发团队完成产品开发。3.进行市场调研，分析竞争对手产品。4.与销售团队协作，推动产品销售。"
  }
};


function showDialog(id) {
    const dialog = document.querySelector('.dialog-overlay');
    const dialogTitle = dialog.querySelector('h2');
    const dialogDescription = dialog.querySelector('p');
    
    const workExperience = workExperiences[id];
    if (workExperience) {
      dialogTitle.textContent = workExperience.title;
      dialogDescription.textContent = workExperience.description;
      dialog.style.display = 'flex';
      
      // 禁用页面滚动
      document.body.style.overflow = 'hidden';
    }
  }
  
function closeDialog() {
    const dialog = document.querySelector('.dialog-overlay');
    dialog.style.display = 'none';
    
    // 恢复页面滚动
    document.body.style.overflow = '';
  }