var cur = 0; 
var API_KEY = "OaNRyFG5NrQsfclZKMq";
var FD_ENDPOINT = "newaccount1615365322867";
var PATH = "/api/v2/tickets";
var URL =  "https://" + FD_ENDPOINT + ".freshdesk.com"+ PATH;
let password = 'X';
let headers = new Headers();
headers.set('Authorization', 'Basic ' + btoa(API_KEY+":"+password));

var result = fetch(URL,{method: 'GET', headers: headers})
.then((response)=>
  {
  return response.json()})
.then((data)=>
{ 
  console.log(data);
  for(let i =0;i<5&&i<data.length;i++)  
  {  
     display(i,data[i].subject,data[i].priority,data[i].status);
     
  }

 /* let cre = document.querySelector("#create");
  cre.addEventListener("click",()=>{
   var des = document.querySelector("#desc").value;
  // des.innertext="";
   var sub = document.querySelector("#sub").value;
   //sub.innerHTML="";
   var email = document.querySelector("#email").value;
   //email.innerHTML="";
   var pro  = document.querySelector("#p").value;
   //pro.value="1";
   var status = document.querySelector("#st").value;
   //st.value="1";
   var cc = document.querySelector("#cc").value;
   //cc.innerHTML="";
   console.log(des,sub,email,pro,status,cc)
   create(des,sub,email,pro,status,cc);
*/
  

  let nex = document.querySelector("#next")
  nex.addEventListener("click",()=>{
        next(data)
  });
  let pre = document.querySelector("#prev")
  pre.addEventListener("click",()=>{
       prev(data)
  });
  
  let pr1 = document.querySelector("#prior1");
  pr1.addEventListener("change",()=>
  {  
      let c = checkcur(cur);
     change(data[c].id,data[c],pr1.value,"priority");

  });
  let pr2 = document.querySelector("#prior2");
  pr2.addEventListener("change",()=>
  {  
    let c = checkcur(cur);
    //console.log(pr2.value);
     change(data[c+1].id,data[c+1],pr2.value,"priority");

  });
  let pr3 = document.querySelector("#prior3");
  pr3.addEventListener("change",()=>
  {  
    let c = checkcur(cur);
     console.log(pr3.value);
     change(data[(c+2)].id,data[(c+2)],pr3.value,"priority");

  });
  let pr4 = document.querySelector("#prior4");
  pr4.addEventListener("change",()=>
  {  
    let c = checkcur(cur);
    //console.log(pr1.value);
     change(data[(c+3)].id,data[(c+3)],pr4.value,"priority");

  });
  let pr5 = document.querySelector("#prior5");
  pr5.addEventListener("change",()=>
  {  
    let c = checkcur(cur);
    //console.log(pr1.value);
     change(data[(c+4)].id,data[(c+4)],pr5.value,"priority");

  });
  let but1 = document.querySelector("#r1");
  but1.addEventListener("click",()=>{
    let c = checkcur(cur);
    console.log(data[c].id);
    del(data[c].id);
  })
  let but2 = document.querySelector("#r1");
  but2.addEventListener("click",()=>{
    let c = checkcur(cur);
    del(data[c+1].id);
  })
  let but3 = document.querySelector("#r1");
  but3.addEventListener("click",()=>{
    let c = checkcur(cur);
    del(data[c+2].id);
  })
  let but4 = document.querySelector("#r1");
  but4.addEventListener("click",()=>{
    let c = checkcur(cur);
    del(data[c+3].id);
  })
  let but5 = document.querySelector("#r1");
  but5.addEventListener("click",()=>{
    let c = checkcur(cur);
    del(data[c+4].id);
  })
     
})
function checkcur(cur)
{
  if(cur==0||cur%5==0)
  {
    return cur;
  }
  else
  {
    if(cur%5!=0)
    {
      if(cur<5)
      {
        return cur;
      }
      else
      {
      return cur - cur%5;}
    }
  }
}

function display(i,subject,pri,st)
{ 
  //console.log("display "+cur,i);
  if(cur!=0){
    
    i = i - cur ; 

  } 
  //console.log(""+st+(i+1));
  let row = "row"+(+i+1);
  let div = document.querySelector("#"+row);
  div.setAttribute("style","visibility:visible;height:100px;width:1000px")
  let span = document.querySelector("#s"+(i+1))
  span.innerHTML = subject;
  let priority = document.querySelector("#row"+pri+(+i+1));
   priority.selected = true;
  // console.log(priority.value);
  let status = document.querySelector("#srow"+st+(i+1));
 // console.log(status);
  status.selected = true;
}

function next(d)
{
  if(cur<d.length)
  {
    if(cur==0)
    {
      cur+=5;
    }
  console.log(cur)
  let count =0;
  let len =0 ;
 for(i=cur;(i<(cur+5)&&(i<d.length));i++)
 {
  count++;
 }  
 len = cur+count;
 for(let i = cur;i<len;i++)
{ 
 
  console.log("i="+i);
  display(i,d[i].subject,d[i].priority,d[i].status); 
}
if(count!=5)
{
  reset(count,5);
}

cur = cur +count;
console.log("lasst cur "+cur);

}}

function prev(d)
{
  console.log("prev"+cur);
  c=cur;
  if(c!=0)
  {
  let div = Math.floor(c/5);
  console.log(div);
   cur = (div-1)*5;
  let end = div*5;
  console.log(div,cur,end);
  for(let i = cur; i<end ;i++ ){
    console.log("prev"+cur,i);
    display(i ,d[i].subject,d[i].priority,d[i].status); 
} 
  }
  }
  
function reset(cur,len)
{
  for(let i =cur;i<len;i++)
  {
    let row = "row"+(+i+1);
    let div = document.querySelector("#"+row);
   div.setAttribute("style","visibility:hidden;height:100px;width:1000px")
  }
}


function change(ic,data,nv,type)
{
   var New = newautoticket(data,nv,type);
   console.log(New);

       
   fetch(URL,{
    method:'POST',
  
    headers: {
      'Authorization': 'Basic ' + btoa(API_KEY+":"+password),
       "Content-type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body : JSON.stringify(New)
    })
    
     fetch(URL+"/"+ic,{
        method:"DELETE" ,
        headers: {
          'Authorization': 'Basic ' + btoa(API_KEY+":"+password),
           "Content-type": "application/json"
      }
        })    
      fetch(URL,{
        method:"GET" ,
        headers: {
          'Authorization': 'Basic ' + btoa(API_KEY+":"+password),
           "Content-type": "application/json"
      }
        }).then(response=>response.json())
        .then((data)=>{
         console.log(data);
         location.reload();
        })
        fetch(URL,{
          method:"GET" ,
          headers: {
            'Authorization': 'Basic ' + btoa(API_KEY+":"+password),
             "Content-type": "application/json"
        }
          }).then(response=>response.json())
          .then((data)=>{
            console.log(data.length);
            redisplay(data);
          })

   
}


function redisplay(d)
{    
     cur = 0;
     for(let i =0 ; (i<5)&&(i<d.length);i++)
     {
      display(i,d[i].subject,d[i].priority,d[i].status); 
     }
}

function newautoticket(d,nv,type)
{
  var k = {description:d.description, subject:d.subject, email:d.email, priority: d.priority, status: d.status, cc_emails: d.cc_emails}
      k[type] = +nv;
      if(k.description==undefined)
      {
        k.description = "Please resolve me issue";
      }
      if(k.email==undefined)
      {
        k.email = "ggg@gmail.com"
      }
    return k ;
}

function del(id)
{ 
  
  fetch(URL+"/"+id,{
    method:"DELETE" ,
    headers: {
      'Authorization': 'Basic ' + btoa(API_KEY+":"+password),
       "Content-type": "application/json"
  }
    })
    location.reload(); 
}

function create(d,s,e,p,st,cc)
{ console.log(d,s,e,p,st,cc);
  var k = {description:d, subject:s, email:e, priority:+p, status:+st, cc_emails:cc}
  console.log(k);
  fetch(URL,{
    method:'POST',
  
    headers: {
      'Authorization': 'Basic ' + btoa(API_KEY+":"+password),
       "Content-type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body : JSON.stringify(k)
    }) 
      
    location.reload();
}
