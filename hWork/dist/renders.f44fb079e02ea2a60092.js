window.onload=function(){({query:function(e,t){return(t||document).querySelectorAll(e)},create:function(e){return document.createElement(e)},addEvent:function(e){for(var t=this.query(e.selector),n=0;n<t.length;n++)t[n]["on"+e.eventType]=e.fn},remove:function(e,t){for(var n=this.query(e)[0],o=this.query(t,n),r=0;r<o.length;r++)n.removeChild(o[r])},createOptions:function(e,t){var n=this.query(t)[0];for(var o in e){var r=this.create("option");r.value=o,r.textContent=e[o],r.className="opt",n.appendChild(r)}},init:function(){var e=this;this.createOptions(area.province_list,"#province"),this.addEvent({selector:"#province",eventType:"change",fn:function(){e.remove("#city",".opt"),e.remove("#area",".opt");var t=this.value.slice(0,2),n=area.city_list,o={};for(var r in n)r.slice(0,2)==t&&(o[r]=n[r]);console.log("data ==> ",o),e.createOptions(o,"#city")}}),this.addEvent({selector:"#city",eventType:"change",fn:function(){e.remove("#area",".opt");var t=this.value.slice(0,4);console.log("code ==> ",t);var n=area.county_list,o={};for(var r in n)r.slice(0,4)==t&&(o[r]=n[r]);console.log("data ==> ",o),e.createOptions(o,"#area")}})}}).init()};