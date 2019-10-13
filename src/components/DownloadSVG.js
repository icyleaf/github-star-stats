import React from 'react';
import { Button } from 'antd';

function triggerDownload(imgURI, imgName = 'awesome') {
  var evt = new MouseEvent('click', {
    view: window,
    bubbles: false,
    cancelable: true
  });

  var a = document.createElement('a');
  a.setAttribute('download', `${imgName}.star.chart.png`);
  a.setAttribute('href', imgURI);
  a.setAttribute('target', '_blank');

  a.dispatchEvent(evt);
}

export default function DownloadSVG({ title = 'wtf title', svg }) {
  console.log({ svg, title });

  const handleClick = () => {
    const scaleRatio = 1;
    console.log({ svg });

    if (svg) {
      // let svg = svg.current.container.querySelector('svg');
      let canvas = document.createElement('canvas');
      console.log({ svg });
      svg.currentScale = scaleRatio;
      canvas.width = svg.scrollWidth * scaleRatio + 80;
      canvas.height = svg.scrollHeight * scaleRatio + 160;
      canvas.style.background = 'white';
      let ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'black';
      ctx.lineWidth = 3;
      ctx.font = '30px verdana';
      ctx.fillText(title, 40, 40);
      ctx.font = '12px verdana';
      ctx.fillText(`Generated from: fdsaf.com?repo=${title}`, 40, canvas.height - 40);
      ctx.fillText(`Twitter: @wsygc`, 40, canvas.height - 20);
      let data = new XMLSerializer().serializeToString(svg);
      let DOMURL = window.URL || window.webkitURL || window;

      let img = new Image();
      let svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
      let url = DOMURL.createObjectURL(svgBlob);

      img.onload = function() {
        ctx.drawImage(img, 20, 80);
        DOMURL.revokeObjectURL(url);

        let imgURI = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');

        triggerDownload(imgURI, title.split('/').join('.'));
        // svg.currentScale = 1;
      };

      img.src = url;
    }
  };
  return <Button shape="circle" icon="download" size={'small'} onClick={handleClick}></Button>;
}