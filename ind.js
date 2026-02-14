const family = {
  Oyeniyi:["Oyeniyi I","Oyeniyi II","Oyeniyi III"],
  Oyedele:["Oyedele I","Oyedele II","Oyedele III"],
  Ibitoye:["Ibitoye I","Ibitoye II","Ibitoye III"],
  Ebeloku:["Ebeloku I","Ebeloku II","Ebeloku III"],
  Bolarinwa:["Bolarinwa I","Bolarinwa II","Bolarinwa III"],
  Akinsanmi:["Akinsanmi I","Akinsanmi II","Akinsanmi III"],
  Oderinde:["Oderinde I","Oderinde II","Oderinde III"],
  Akinbiyi:["Akinbiyi I","Akinbiyi II","Akinbiyi III"],
  Eruola:["Eruola I","Eruola II","Eruola III"]
};
// const grandChildren = {
//     OyeniyiI:["Oyeniyi I A","Oyeniyi I B"],
//     OyeniyiII:["Oyeniyi II A","Oyeniyi II B"],
//     OyeniyiIII:["Oyeniyi III A","Oyeniyi III B"],
//     OyedeleI:["Oyedele I A","Oyedele I B"],
//     OyedeleII:["Oyedele II A","Oyedele II B"],
//     OyedeleIII:["Oyedele III A","Oyedele III B"],
//     IbitoyeI:["Ibitoye I A","Ibitoye I B"],
//     IbitoyeII:["Ibitoye II A","Ibitoye II B"],
//     IbitoyeIII:["Ibitoye III A","Ibitoye III B"],
//     EbelokuI:["Ebeloku I A","Ebeloku I B"],
//     EbelokuII:["Ebeloku II A","Ebeloku II B"],
//     EbelokuIII:["Ebeloku III A","Ebeloku III B"],
//     BolarinwaI:["Bolarinwa I A","Bolarinwa I B"],
//     BolarinwaII:["Bolarinwa II A","Bolarinwa II B"],
//     BolarinwaIII:["Bolarinwa III A","Bolarinwa III B"],
//     AkinsanmiI:["Akinsanmi I A","Akinsanmi I B"],
//     AkinsanmiII:["Akinsanmi II A","Akinsanmi II B"],
//     AkinsanmiIII:["Akinsanmi III A","Akinsanmi III B"],
//     OderindeI:["Oderinde I A","Oderinde I B"],
//     OderindeII:["Oderinde II A","Oderinde II B"],
//     OderindeIII:["Oderinde III A","Oderinde III B"],
//     AkinbiyiI:["Akinbiyi I A","Akinbiyi I B"],
//     AkinbiyiII:["Akinbiyi II A","Akinbiyi II B"],
//     AkinbiyiIII:["Akinbiyi III A","Akinbiyi III B"],
//     EruolaI:["Eruola I A","Eruola I B"],
//     EruolaII:["Eruola II A","Eruola II B"],
//     EruolaIII:["Eruola III A","Eruola III B"]
// };


const stage = document.getElementById("stage");
const svg = document.getElementById("svg");
const root = document.getElementById("ogundepo");
const childrenCol = document.getElementById("childrenCol");
const grandCol = document.getElementById("grandCol");
const greatCol = document.getElementById("greatCol");

function greatKids(name){ return [`${name} A`,`${name} B`]; }

//
function line(from,to){
  const a=from.getBoundingClientRect(); 
  const b=to.getBoundingClientRect();
  const s=stage.getBoundingClientRect();

  const l=document.createElementNS("http://www.w3.org/2000/svg","line");
  l.setAttribute("x1",a.right-s.left);
  l.setAttribute("y1",a.top+a.height/2-s.top);
  l.setAttribute("x2",b.left-s.left);
  l.setAttribute("y2",b.top+b.height/2-s.top);
  l.setAttribute("stroke", "#9ca3af");
  l.setAttribute("stroke-width","2");
  svg.appendChild(l);
}

function redraw(){
  svg.innerHTML="";
  svg.setAttribute("width",stage.scrollWidth);
  svg.setAttribute("height",stage.scrollHeight);

  document.querySelectorAll(".node.child").forEach(n=>line(root,n));
  document.querySelectorAll(".node.grand").forEach(n=>line(n.dataset.parent,n));
  document.querySelectorAll(".node.great").forEach(n=>line(n.dataset.parent,n));
}

let bolarinwaNode=null;

Object.keys(family).forEach(name=>{
  const n=document.createElement("div");
  n.className="node child";
  n.textContent=name;
  childrenCol.appendChild(n);

  if(name==="Bolarinwa") bolarinwaNode=n;

  n.onclick=()=>{
    grandCol.innerHTML="";
    greatCol.innerHTML="";

    family[name].forEach(gc=>{
      const g=document.createElement("div");
      g.className="node desc grand fade";
      g.textContent=gc;
      g.dataset.parent=n;
      grandCol.appendChild(g);

      greatKids(gc).forEach(gg=>{
        const ggN=document.createElement("div");
        ggN.className="node desc great fade";
        ggN.textContent=gg;
        ggN.dataset.parent=g;
        greatCol.appendChild(ggN);
      });
    });

    setTimeout(redraw,20);
  };
});

window.onload=()=>{
  // Align Ogundepo vertically with Bolarinwa
  const r=bolarinwaNode.getBoundingClientRect();
  const rootCol=document.getElementById("rootCol");
  const stageRect=stage.getBoundingClientRect();
  rootCol.style.marginTop=(r.top-stageRect.top)+"px";
  redraw();
};

window.onresize=redraw;