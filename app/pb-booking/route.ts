const PB_ORIGIN = "https://neurointegrativecareoflosgatos6882.practicebetter.io";

const FETCH_PATCH = `<script>
(function(){
  var P="/pb-proxy";
  var wf=window.fetch;
  window.fetch=function(input,init){
    if(typeof input==="string"&&input.startsWith("/")&&!input.startsWith(P)) input=P+input;
    return wf.call(this,input,init);
  };
  var xo=XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open=function(method,url){
    if(typeof url==="string"&&url.startsWith("/")&&url.indexOf(P)!==0) arguments[1]=P+url;
    return xo.apply(this,arguments);
  };
})();
</script>`;

const HEIGHT_PATCH = `<script>
(function(){
  var TALL=/select a time|available times|first name|i'm booking|su\s+mo\s+tu|there are available times/i;
  function report(){
    try{
      var text=(document.body&&document.body.innerText)||"";
      var height=800;
      if(!TALL.test(text)){
        var el=document.querySelector("fl-booking-request");
        if(!el) return;
        var bottom=el.getBoundingClientRect().bottom;
        if(bottom<80) return;
        height=Math.ceil(bottom+16);
      }
      parent.postMessage({source:"nic-pb-booking",height:height},"*");
    }catch(e){}
  }
  setInterval(report,300);
  window.addEventListener("load",report);
  document.addEventListener("click",function(){setTimeout(report,50);},true);
})();
</script>`;

export const dynamic = "force-dynamic";

/** Same-origin stand-in for the Practice Better booking SPA.
 *  Lets the thank-you page measure each step and shrink slides 1–2.
 *  Also bypasses their `frame-ancestors https:` CSP on http://localhost. */
export async function GET(request: Request) {
  const incoming = new URL(request.url);
  const target = new URL(PB_ORIGIN);
  target.search = incoming.search;

  const upstream = await fetch(target, {
    headers: { accept: "text/html", "user-agent": request.headers.get("user-agent") ?? "Mozilla/5.0" },
    redirect: "follow",
  });

  let html = await upstream.text();
  html = html.replace('<base href="/"/>', `<base href="/pb-proxy/"/>${FETCH_PATCH}${HEIGHT_PATCH}`);

  return new Response(html, {
    status: upstream.status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
