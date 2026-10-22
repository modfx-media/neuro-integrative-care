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

export const dynamic = "force-dynamic";

/** Same-origin stand-in for the Practice Better booking SPA so the widget
 *  can render on http://localhost. Their CSP is `frame-ancestors https:`,
 *  which blocks HTTP parents. Production HTTPS embeds them directly. */
export async function GET(request: Request) {
  const incoming = new URL(request.url);
  const target = new URL(PB_ORIGIN);
  target.search = incoming.search;

  const upstream = await fetch(target, {
    headers: { accept: "text/html", "user-agent": request.headers.get("user-agent") ?? "Mozilla/5.0" },
    redirect: "follow",
  });

  let html = await upstream.text();
  html = html.replace('<base href="/"/>', `<base href="/pb-proxy/"/>${FETCH_PATCH}`);

  return new Response(html, {
    status: upstream.status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
