let svgContainer = document.querySelector('.scrolldown');
    let animItem = bodymovin.loadAnimation({
      wrapper: svgContainer,
      animType: 'svg',
      loop: true,
      path: "resourses/icon-svg/scrollDown.json"
    });